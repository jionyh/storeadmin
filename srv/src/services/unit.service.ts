import { prisma } from '../lib/prisma'
import { UnitType } from '../types/UnitType'

export const getAllUnits = async (tenant_id: number):Promise<any> => {
  
  try{
    const units = await prisma.unit.findMany({
      where: {tenant_id, is_deleted: false},
      orderBy: { name: 'asc' }
    })
    return units

  }catch(e){
    console.log(e)
    throw new Error('An error occurred while fetching units data.');
  }

}

export const getUnit = async (data: {name:string,tenant_id:number}):Promise<any> => {

  try{
    return await prisma.unit.findFirst({
      where:{
        name: data.name,
        tenant_id: data.tenant_id
      }
    })
  }catch(e){
  console.error(e)
  throw new Error('An error occurred while editing unit data.');
}

}

export const createUnit = async (data: UnitType):Promise<UnitType> => {
  try{
    return await prisma.unit.create({data})
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while creating unit.');
  }
}

export const editUnit = async(id:number, data:{name?:string}) =>{

  try{
    const editUnit = await prisma.unit.update({
      where: {id},
      data
    })
    return editUnit
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while editing unit data.');
  }

}

export const toggleUnit = async(id:number, toggle:boolean) => {

  try{
    const toggleUnit = await prisma.unit.update({
      where: {id},
      data:{
        is_deleted : toggle === false ? true : false
      }
    })
    return toggleUnit
  }catch(e){
    console.error(e)
    throw new Error('An error occurred while creating unit data.');
  }
}

export const deleteUnitById = async (id: number) => {
  return prisma.unit.delete({ where: { id } })
}
