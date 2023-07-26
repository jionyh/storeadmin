import { Request, Response } from 'express'
import { z } from 'zod'
import * as costService from '../services/cost.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'
import {errorMessages,successMessages} from '../utils/ResponseMessages'
import { createCostSchema } from '../utils/validationSchema'

export const cost = {
  getAllCosts: async (req: Request, res: Response) => {
    const { date, page, perPage } = req.query
    
    if(!req.tenant_id) return sendErrorResponse(res,404,errorMessages.tenantNotFound)

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

    if (!id) return sendErrorResponse(res, 400, 'id não enviado')
    if(!req.tenant_id) return sendErrorResponse(res,404,'Tenant não localizado')

    try {
      const cost = await costService.getCostById(req.tenant_id, parseInt(id as string))

      if (!cost) return sendErrorResponse(res, 404, 'Despesa não localizada!')

      sendSuccessResponse(res, 200, 'cost', cost)
    } catch (e) {
      console.log(e)
      sendErrorResponse(res, 500, 'Despesa não localizada!')
    }
  },

  createCost: async (req: Request, res: Response) => {
    const parse = createCostSchema
      .array()
      .safeParse(req.body)

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)
      

    try {
      await costService.createCost(parse.data)
      sendSuccessResponse(res, 200, successMessages.createCost)
    } catch (e) {
      console.log(e)
      sendErrorResponse(res, 400, errorMessages.createCostError)
    }
  },

  deleteCost: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id)return sendErrorResponse(res, 400, errorMessages.idNotSent)

    try {
      await costService.deleteCostById(parseInt(id as string))
      sendSuccessResponse(res, 200)
    } catch (e) {
      sendErrorResponse(res, 400, errorMessages.costNotFound)
    }
  },
}
