import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { CostType } from '../types/CostsType'
import { Options } from '../types/ServiceOptionsType'

export const getAllCosts = async (tenant_id: number, Options:Options) => {
  const {date,pageNumber,resultsPerPage } = Options

  const skip = (pageNumber - 1) * resultsPerPage;
  
  return prisma.cost.findMany({
    where: {
      tenant_id,
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
    skip,
    take: resultsPerPage,
  })
}

export const getCostById = async (tenant_id: number,id: number) => {
  return prisma.cost.findFirst({ where: { 
    id,
    tenant_id
   } })
}

export const createCost = async (data: CostType[]) => {
  return prisma.cost.createMany({
    data,
  })
}

export const deleteCostById = async (id: number) => {
  return prisma.cost.delete({ where: { id } })
}
