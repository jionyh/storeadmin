import dayjs from "dayjs";
import { prisma } from "../lib/prisma";

export const inflow = async (tenant_id: number, date: string) => {
  try {
    const inflow = await prisma.sale.findMany({
      where: {
        tenant_id,
        createAt: {
          gte: dayjs(date as string)
            .startOf("month")
            .toDate(),
          lte: dayjs(date as string)
            .add(5, "months")
            .endOf("month")
            .toDate(),
        },
      },
      select: {
        createAt: true,
        value: true,
      },
      orderBy: {
        createAt: "asc",
      },
    });
    if (!inflow) return false;
    return inflow;
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while fetching user data.");
  }
};

export const outflow = async (tenant_id: number, date: string) => {
  const queryOption = {
    where: {
      tenant_id,
      createAt: {
        gte: dayjs(date as string)
          .startOf("month")
          .toDate(),
        lte: dayjs(date as string)
          .add(5, "months")
          .endOf("month")
          .toDate(),
      },
    },
    select: {
      createAt: true,
      value: true,
    },
    orderBy: {
      createAt: "asc" as const,
    },
  };
  try {
    const purchaseOutflow = await prisma.purchase.findMany(queryOption);
    const costOutflow = await prisma.cost.findMany(queryOption);

    if (!purchaseOutflow || !costOutflow) return false;
    return { purchaseOutflow, costOutflow };
  } catch (e) {
    console.error(e);
    throw new Error("An error occurred while fetching user data.");
  }
};
