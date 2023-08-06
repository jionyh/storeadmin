import dayjs from "dayjs";
import { prisma } from "../lib/prisma";
import { Options } from "../types/ServiceOptionsType";
import {
  PurchaseResponse,
  PurchaseResponseComplete,
  PurchaseType,
} from "../types/PurchaseType";

type PurchaseRecord = {
  totalRecords: number;
  purchase: PurchaseResponseComplete[];
};

export const getAllPurchase = async (
  tenant_id: number,
  Options: Options
): Promise<PurchaseRecord> => {
  const {
    date = dayjs(),
    pageNumber,
    resultsPerPage,
    period = "month",
  } = Options;

  const skip = (pageNumber - 1) * resultsPerPage;

  const searchOptions = {
    tenant_id,
    createAt: {
      gte: date
        ? dayjs(date as string)
            .startOf(period)
            .toDate()
        : undefined,
      lte: date
        ? dayjs(date as string)
            .endOf(period)
            .toDate()
        : undefined,
    },
  };
  try {
    const totalRecords = await prisma.purchase.count({ where: searchOptions });

    const purchase = await prisma.purchase.findMany({
      where: searchOptions,
      include: { product: { include: { cat: true } }, unit: true },
      orderBy: { createAt: "asc" },
      skip,
      take: resultsPerPage,
    });
    return { totalRecords, purchase };
  } catch (e) {
    console.log(e);
    throw new Error("An error occurred while fetching purchase data.");
  }
};

export const getPurchaseById = async (
  tenant_id: number,
  id: number
): Promise<PurchaseResponseComplete | null> => {
  try {
    return await prisma.purchase.findFirst({
      where: {
        id,
        tenant_id,
      },
      include: { product: { include: { cat: true } }, unit: true },
    });
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while fetching purchase.");
  }
};

export const createPurchase = async (data: PurchaseType[]) => {
  try {
    return prisma.purchase.createMany({
      data,
    });
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while creating purchase.");
  }
};

export const deletePurchaseById = async (id: number) => {
  try {
    return prisma.purchase.delete({ where: { id } });
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while deleting purchase.");
  }
};
