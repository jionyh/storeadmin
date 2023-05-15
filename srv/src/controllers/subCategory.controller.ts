import {Request, Response, NextFunction} from 'express'
import {number, z} from 'zod'

import { prisma } from '../lib/prisma'

const subCategorySchema = z.object({
    id: z.number().optional(),
    categoryId: z.string().transform(i=>parseInt(i)),
    name: z.string().toLowerCase(),
    unit: z.string()
})

export const subCategory = {

    addSubCategory: async(req:Request, res:Response)=>{
        const {categoryId, name, unit} = subCategorySchema.parse(req.body)

        const data = {
            categoryId,name,unit
        }
        const addSubCat = await prisma.subCategory.create({data})

        if(!addSubCat){
            res.json({sucess: false})
            return
        }

        res.json({sucess: true,data: addSubCat})
    },

    getAllSubCategories: async(req:Request, res: Response)=>{
        const data = await prisma.subCategory.findMany({
            select:{
                id: true,
                name: true,
                unit: true,
                cat:{
                    select:{
                        name: true
                    }
                }
            },
            
        })

        if(!data){
            res.json({error:true})
            return
        }
        res.json({sucess: true, data: data})
    }

}