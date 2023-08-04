import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'
import { CategoryResponse, CategoryType } from '../types/CategoryType'

export const getAllCategories = async (tenant_id: number):Promise<CategoryResponse[]> => {
  
  try{
    const categories = await prisma.category.findMany({
      where: {
        tenant_id,
        is_deleted: false
      },
      orderBy: { name: 'asc' }
    })
    return categories

  }catch(e){
    console.log(e)
    throw new Error('An error occurred while fetching category data.');
  }

}

export const getCategory = async (data: CategoryType):Promise<any> => {

  try{
    return await prisma.category.findFirst({
      where:{
        name: data.name,
        tenant_id: data.tenant_id
      }
    })
  }catch(e){
  console.error(e)
  throw new Error('An error occurred while editing category data.');
}

}

export const createCategory = async (data: CategoryType) => {

  try{
    return await prisma.category.create({data})
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
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while editing category data.');
  }

}
export const toggleCategory = async(id:number, toggle:boolean) => {
  console.log(id, toggle)

  try{
    const toggleCategory = await prisma.category.update({
      where: {id},
      data:{
        is_deleted : toggle === false ? true : false
      }
    })
    return editCategory
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while creating category data.');
  }
}

export const deleteCategoryById = async (id: number) => {
  return prisma.category.delete({ where: { id } })
}
