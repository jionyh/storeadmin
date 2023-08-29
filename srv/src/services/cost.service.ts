import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { CostRecurrentResponse, CostRecurrentType, CostResponse, CostType } from '../types/CostsType'
import { Options } from '../types/ServiceOptionsType'

interface CostRecord {
  totalRecords: number
  costs:CostResponse[]
}

export const getAllCosts = async (tenant_id: number, Options:Options):Promise<CostRecord> => {
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
    console.log(e)
    throw new Error('An error occurred while fetching costs data.');
  }

}

export const getAllActiveRecurrentCost = async():Promise<CostRecurrentResponse[]>=>{
  return await prisma.costRecurrent.findMany({
    where:{
      recurrent: true
    }
  })
}

export const getCostById = async (tenant_id: number,id: number) => {
  return prisma.cost.findFirst({ where: { 
    id,
    tenant_id
   } })
}

export const createCost = async (data: CostType) => {
  return prisma.cost.create({
    data:{
      name: data.name,
      value: data.value,
      createAt: data.createAt,
      tenant_id: data.tenant_id
    }
  })
}

export const createCostRecurrent = async(data:CostRecurrentType)=>{
  return prisma.costRecurrent.create({
    data:{
      name: data.name,
      value: data.value,
      createAt: data.createAt,
      recurrent: data.recurrent,
      tenant_id: data.tenant_id
    }
  })
}

export const deleteCostById = async (id: number) => {
  return prisma.cost.delete({ where: { id } })
}
