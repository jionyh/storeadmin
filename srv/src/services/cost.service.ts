import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { CostType } from '../types/CostsType'

export const getAllCosts = async (date: string) => {
  return prisma.cost.findMany({
    where: {
      createAt: {
        gte: date
          ? dayjs(date as string)
              .startOf('week')
              .toDate()
          : undefined,
        lte: date
          ? dayjs(date as string)
              .endOf('week')
              .toDate()
          : undefined,
      },
    },
    orderBy: { createAt: 'desc' },
  })
}

export const getCostById = async (id: number) => {
  return prisma.cost.findUnique({ where: { id } })
}

export const createCost = async (data: CostType[]) => {
  return prisma.cost.createMany({
    data,
  })
}

export const deleteCostById = async (id: number) => {
  return prisma.cost.delete({ where: { id } })
}
