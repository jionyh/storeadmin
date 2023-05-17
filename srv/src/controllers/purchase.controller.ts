import { subCategory } from './subCategory.controller';
import {Request, Response, NextFunction} from 'express'
import {date, z} from 'zod'
import dayjs from 'dayjs'

import { prisma } from '../lib/prisma'

const purchaseSchema = z.object({
  itemId: z.string().transform(i=>parseInt(i)),
  userId: z.string().transform(i=>parseInt(i)),
  unitId: z.string().transform(i=>parseInt(i)),
  quantity: z.string().transform(i=>parseInt(i)),
  value: z.string().transform(i=>parseInt(i)),
}).array()

export const purchase = {

  createPurchase: async(req:Request, res:Response)=>{
    const data = purchaseSchema.parse(req.body)

    const addPurchases = await prisma.purchase.createMany({data})

    if(!addPurchases){
      res.json({sucess: false})
      return
  }

  res.json({sucess: true,data: addPurchases})
  },

  getPurchases: async(req:Request, res:Response)=>{
    const {date} = req.query  

    let purchaseList = []

    const purchases = await prisma.purchase.findMany({
      where:{
        createAt: {
        lt : date? dayjs(date as string).add(1,'day').format() : undefined,
        gt : date? dayjs(date as string).format() : undefined,
                  }
      },
      include:{
        unit:{
          select:{
            abbreviation: true
          }
        },
        subcategory:{
          select:{
            cat:{
              select:{
                id: true
              }
            },
            name: true
          }
        }
      }
    })

    const category = await prisma.category.findMany()

    if(!purchases){
      res.json({sucess: false})
      return
    }

    for (let i in purchases){
      purchaseList.push({
        category: purchases[i].subcategory.cat.id,
        id: purchases[i].id,
        catId: purchases[i].subcategory.cat.id,
        name: purchases[i].subcategory.name,
        quantity: purchases[i].quantity,
        unit: purchases[i].unit.abbreviation,
        valor: purchases[i].value
      })
    }

    let cat = category

    const soma = purchaseList.reduce((soma, obj)=>{
      return soma + obj.valor
    },0)

    const result = category.map(el=>{
      return{
        ...el,
        produto: purchaseList.filter(({catId})=> el.id === catId),
      }
    })

    console.log(result)

    res.json({sucess: true, data: result, total: soma})

  },

}