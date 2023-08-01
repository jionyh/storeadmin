import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { CostResponse, CostType } from '../types/CostsType'
import { CategoryType } from '../types/CategoryType'

interface CostRecord {
  totalRecords: number
  costs:CostResponse[]
}

export const getAllCategories = async (tenant_id: number):Promise<any> => {
  
  try{
    const categories = await prisma.category.findMany({
      where: {tenant_id},
      orderBy: { id: 'asc' }
    })
    return categories

  }catch(e){
    console.log(e)
    throw new Error('An error occurred while fetching category data.');
  }

}

export const getCategoryById = async (tenant_id: number,id: number) => {
  return prisma.category.findFirst({ where: { 
    id,
    tenant_id
   } })
}

export const createCategory = async (data: CategoryType[]) => {
  return prisma.category.createMany({
    data,
  })
}

export const deleteCategoryById = async (id: number) => {
  return prisma.category.delete({ where: { id } })
}
