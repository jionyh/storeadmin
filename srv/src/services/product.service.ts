import dayjs from 'dayjs'
import { Options } from '../types/ServiceOptionsType'
import { prisma } from '../lib/prisma'
import { ProductResponse, ProductType } from '../types/ProductType'

type ProductRecord = {
  totalRecords: number,
  products: ProductResponse[]
}

export const getAllProducts = async (tenant_id: number,options:Options):Promise<ProductRecord> => {

  const {cat,pageNumber,resultsPerPage} = options

  const skip = (pageNumber - 1) * resultsPerPage;

  const searchOptions = {
      tenant_id,
      is_deleted: false,
      category_id: cat ? parseInt(cat) : undefined
  }
  
  try{

    const totalRecords = await prisma.product.count({where:searchOptions})

    const products =  await prisma.product.findMany({
      where: searchOptions,
      select:{
        id: true,
        name: true,
        category_id: true,
        tenant_id: true,
        is_deleted: true,
        cat:{
          select:{
            name: true
          }
        }
      },
      orderBy: { name: 'asc' },
      skip,
      take: resultsPerPage,
    })
    return {totalRecords,products}
  }catch(e){
    console.log(e)
    throw new Error('An error occurred while fetching products data.');
  }

}

export const checkExistingProduct = async (tenant_id: number,data:{name: string}[]):Promise<any> => {
  try{

    return await prisma.product.findMany({
      where: {
        tenant_id,
        name: data ? { in: data.map(d=>d.name)} : undefined,
      },    
      orderBy: { name: 'asc' }
    })
  
  }catch(e){
    console.log(e)
    throw new Error('An error occurred while fetching products data.');
  }

}

export const getProduct = async (name:string,tenant_id:number):Promise<any> => {

  try{
    return await prisma.category.findFirst({
      where:{
        name,
        tenant_id
      }
    })
  }catch(e){
  console.error(e)
  throw new Error('An error occurred while editing product data.');
}

}

export const createProducts = async (data: ProductType[]) => {

  try{
    return await prisma.product.createMany({data})
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while creating products.');
  }
}

export const editProduct = async(id:number, data:{name?:string,category_id?: number}) =>{

  try{
    const editCategory = await prisma.product.update({
      where: {id},
      data
    })
    return editCategory
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while editing product data.');
  }

}
export const toggleProduct = async(id:number, toggle:boolean) => {
  try{
    const toggleCategory = await prisma.product.update({
      where: {id},
      data:{
        is_deleted : toggle === false ? true : false
      }
    })
    return toggleCategory
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while creating category data.');
  }
}

export const deleteProductById = async (id: number) => {
  return prisma.product.delete({ where: { id } })
}
