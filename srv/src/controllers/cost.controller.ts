import { Request, Response } from 'express'
import { z } from 'zod'
import * as costService from '../services/cost.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'
import { createCostSchema } from '../utils/validationSchema'

export const cost = {
  getAllCosts: async (req: Request, res: Response) => {
    const { date, page, perPage } = req.query
    
    if(!req.tenant_id) return sendErrorResponse(res,404,'tenantNotFound')

    const options = {
      date:date as string,
      pageNumber: parseInt(page as string) || 1,
      resultsPerPage : parseInt(perPage as string) || 10

    }

    const response = await costService.getAllCosts(req.tenant_id, options)
    sendSuccessResponse(res, 200, 'costs', response)
  },

  getCost: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return sendErrorResponse(res, 400, 'idNotSent' )
    if(!req.tenant_id) return sendErrorResponse(res,404,'tenantNotFound')

    try {
      const cost = await costService.getCostById(req.tenant_id, parseInt(id as string))

      if (!cost) return sendErrorResponse(res, 404, 'costNotFound')

      sendSuccessResponse(res, 200, 'cost', cost)
    } catch (e) {
      sendErrorResponse(res, 500, 'costNotFound')
    }
  },

  createCost: async (req: Request, res: Response) => {
    const parse = createCostSchema.array().safeParse(req.body)

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)      

    try {
      await costService.createCost(parse.data)
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
