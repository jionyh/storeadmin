import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { CategoryType } from '../types/CategoryType'

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

export const createCategory = async (data: CategoryType[]) => {
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

export const editCategory = async(id:number, data:{name?:string}) =>{

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

export const deleteCategoryById = async (id: number) => {
  return prisma.category.delete({ where: { id } })
}
