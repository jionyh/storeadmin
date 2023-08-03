import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { UnitType } from '../types/UnitType'

export const getAllUnits = async (tenant_id: number):Promise<any> => {
  
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

export const createUnit = async (data: UnitType[]) => {
  try{
    const cat = await prisma.category.createMany({
      data,
    })
    return cat
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while creating category.');
  }
}

export const editUnit = async(id:number, data:{name?:string}) =>{

  try{
    const editCategory = await prisma.category.update({
      where: {id},
      data
    })
    return editCategory

    console.log(editCategory)
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while editing category data.');
  }

}

export const deleteUnitById = async (id: number) => {
  return prisma.category.delete({ where: { id } })
}
