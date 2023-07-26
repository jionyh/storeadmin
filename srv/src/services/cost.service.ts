import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import {Prisma} from "@prisma/client"

import { CostType } from '../types/CostsType'
import { Options } from '../types/ServiceOptionsType'

interface CostRecord {
  totalRecords: number
  costs:CostType[]
}

export const getAllCosts = async (tenant_id: number, Options:Options):Promise<CostRecord | any> => {
  const {date = dayjs(),pageNumber,resultsPerPage,period = 'month' } = Options

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
  }
  
  try{

    const totalRecords = await prisma.cost.count({where:searchOptions})

    const costs = await prisma.cost.findMany({
      where: searchOptions,
      orderBy: { createAt: 'asc' },
      skip,
      take: resultsPerPage,
    })
   
    
    //if(totalRecords === 0 ) return false

    return {totalRecords,costs}

  }catch(e){
    return e
  }

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
