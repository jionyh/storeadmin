import { prisma } from '../lib/prisma'
import { CostType } from '../types/CostsType'

export const getAllCosts = async () => {
  return prisma.cost.findMany()
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
