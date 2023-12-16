import dayjs from "dayjs";
import { prisma } from "../lib/prisma";
import { CostRecurrentResponse, CostRecurrentType, CostResponse, CostType } from "../types/CostsType";
import { Options } from "../types/ServiceOptionsType";
import { boolean } from "zod";

interface CostRecord {
  totalRecords: number;
  costs: CostResponse[];
}

export const getAllCosts = async (tenant_id: number, Options: Options): Promise<CostRecord> => {
  const { date = dayjs(), pageNumber, resultsPerPage, period = "month" } = Options;

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
    const totalRecords = await prisma.cost.count({ where: searchOptions });

    const recurrentCosts = await prisma.costRecurrent.findMany({
      where: {
        tenant_id,
      },
      orderBy: { createAt: "asc" },
    });

    const monthlyCosts = await prisma.cost.findMany({
      where: searchOptions,
      orderBy: { createAt: "asc" },
      skip,
      take: resultsPerPage,
    });

    const costs: Array<CostResponse> = monthlyCosts.map((cost) => ({
      ...cost,
      recurrent: recurrentCosts.some((recurrent) => recurrent.name === cost.name && recurrent.value === cost.value && recurrent.tenant_id === cost.tenant_id),
    }));

    //if(totalRecords === 0 ) return false

    return { totalRecords, costs };
  } catch (e) {
    console.log(e);
    throw new Error("An error occurred while fetching costs data.");
  }
};

export const getAllActiveRecurrentCost = async (): Promise<CostRecurrentResponse[]> => {
  return await prisma.costRecurrent.findMany({
    where: {
      recurrent: true,
    },
  });
};

export const getCostById = async (tenant_id: number, id: number) => {
  const cost = await prisma.cost.findFirst({ where: { id, tenant_id } });

  if (!cost) return null;

  const isRecurrent = await prisma.costRecurrent.findFirst({ where: { name: cost.name, value: cost.value, tenant_id } });

  return {
    ...cost,
    recurrent: Boolean(isRecurrent),
  };
};

export const createCost = async (data: CostType) => {
  return prisma.cost.create({
    data: {
      name: data.name,
      value: data.value,
      createAt: data.createAt,
      tenant_id: data.tenant_id,
    },
  });
};

export const createCostRecurrent = async (data: CostRecurrentType) => {
  return prisma.costRecurrent.create({
    data: {
      name: data.name,
      value: data.value,
      createAt: data.createAt,
      recurrent: data.recurrent,
      tenant_id: data.tenant_id,
    },
  });
};

export const deleteCostById = async (id: number) => {
  return prisma.cost.delete({ where: { id } });
};
