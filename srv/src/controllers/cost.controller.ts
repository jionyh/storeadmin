import { Request, Response } from 'express'
import * as costService from '../services/cost.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'
import { createCostSchema } from '../utils/validationSchema'
import { Options } from '../types/ServiceOptionsType'
import { sumValues } from '../utils/sumValuesFromArray'
import { CostResponse } from '../types/CostsType'
import { formatCostResponse } from '../utils/formatCostResponse'

export const cost = {
  getAllCosts: async (req: Request, res: Response) => {
    const { date, page, perpage,period = 'month' } = req.query
    
    if(!req.tenant_id) return sendErrorResponse(res,404,'tenantNotFound')

    const options = {
      date:date as string,
      period:period as Options['period'], 
      pageNumber: parseInt(page as string) || 1,
      resultsPerPage : parseInt(perpage as string) || 10

    }

    const {totalRecords,costs}= await costService.getAllCosts(req.tenant_id, options)
    
    if(costs.length < 1 && totalRecords < 1) return sendErrorResponse(res,404,'costNotFound')

    const totalPages = Math.ceil(totalRecords / options.resultsPerPage)

    const pagination = {
      totalRecords,
      totalPages,
      currentPage: options.pageNumber,
      recordsPerPage: options.resultsPerPage
    }

    const {total,periodName} = sumValues(costs,period as string)

    

    const response = {
      pagination,
      [periodName]: total,
      costs: formatCostResponse(costs)
    }

    sendSuccessResponse(res, 200, 'costs', response)
  },

  getCost: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return sendErrorResponse(res, 400, 'idNotSent' )
    if(!req.tenant_id) return sendErrorResponse(res,404,'tenantNotFound')

    try {
      const cost = await costService.getCostById(req.tenant_id, parseInt(id as string))

      if (!cost) return sendErrorResponse(res, 404, 'costNotFound')

      sendSuccessResponse(res, 200, 'cost', formatCostResponse(cost))
    } catch (e) {
      sendErrorResponse(res, 500, 'costNotFound')
    }
  },

  createCost: async (req: Request, res: Response) => {

    const parse = createCostSchema.array().safeParse(req.body)

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)  

    let costData:{name:string,value:number,tenant_id:number}[] = []

    parse.data.map(i=>{
     costData.push({
      name: i.name,
      value: i.value,
      tenant_id: req.tenant_id
     })
    })    
  
    try {
      await costService.createCost(costData)
      sendSuccessResponse(res, 200)
    } catch (e) {
      console.log(e)
      sendErrorResponse(res, 400, 'createCostError')
    }
  },

  deleteCost: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id)return sendErrorResponse(res, 400,'idNotSent')

    try {
      await costService.deleteCostById(parseInt(id as string))
      sendSuccessResponse(res, 200)
    } catch (e) {
      sendErrorResponse(res, 400, 'costNotFound')
    }
  },
}
