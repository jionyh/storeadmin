import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'

export const getTenantIdBySlug = async(slug:string)=>{
  try{
    const dbResponse = await prisma.tenant.findUnique({where: {slug}})
    if(dbResponse){
      return dbResponse.id
    }else return null
    
  }catch(e){
    console.log('Error fetching tenant by slug:', e)
    throw new Error('Failed to get tenant by slug')
  }
}

export const getUserByTenant = async(tenant_id: number, email: string)=>{
  try{
    const user = await prisma.user.findFirst({
      where:{
        email,
        tenant_id
      }
    })

    if(user){
      return user
    }else return null

  }catch(e){
    console.log('Error fetching user by tenant and email:', e)
    throw new Error('Failed to get user by tenant and email')
  }

}