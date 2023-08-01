import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { Options } from '../types/ServiceOptionsType'
import { SaleResponse, SaleType } from '../types/SalesType'

type SaleRecord = {
  totalRecords: number
  sales:SaleResponse[]
}

export const getAllPurchase = async (tenant_id: number, Options:Options):Promise<SaleRecord> => {
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

    const totalRecords = await prisma.sale.count({where:searchOptions})

    const sales = await prisma.sale.findMany({
      where: searchOptions,
      orderBy: { createAt: 'asc' },
      skip,
      take: resultsPerPage,
    })
    //if(totalRecords === 0 ) return false

    

    return {totalRecords,sales}

  }catch(e){
    console.log(e)
    throw new Error('An error occurred while fetching sales data.');
  }

}

export const getPurchaseById = async (tenant_id: number,id: number) => {
  return prisma.sale.findFirst({ where: { 
    id,
    tenant_id
   } })
}

export const createPurchase = async (data: SaleType[]) => {
  return prisma.sale.createMany({
    data,
  })
}

export const deletePurchaseById = async (id: number) => {
  return prisma.sale.delete({ where: { id } })
}