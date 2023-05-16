import {Request, Response, NextFunction} from 'express'
import {number, z} from 'zod'

import { prisma } from '../lib/prisma'

export const unit = {

    getAllUnit: async(req:Request, res:Response)=>{
        let units = await prisma.unit.findMany()

        if(!units){
            res.json({status: false})
            return
        }

        res.json({status:true, data: units})
    }

}