import { Request, Response } from 'express'
import { z } from 'zod'
import * as costService from '../services/cost.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'

export const cost = {
  getAllCosts: async (req: Request, res: Response) => {
    const { date } = req.query
    
    if(!req.tenant_id) return sendErrorResponse(res,404,'Tenant not found')

    const response = await costService.getAllCosts(req.tenant_id, date as string)
    sendSuccessResponse(res, 200, 'costs', response)
  },

  getCost: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
      sendErrorResponse(res, 400, 'id não enviado')
      return
    }

    try {
      const cost = await costService.getCostById(parseInt(id as string))

      if (!cost) {
        sendErrorResponse(res, 404, 'Despesa não localizada!')
        return
      }

      sendSuccessResponse(res, 200, 'cost', cost)
    } catch (e) {
      console.log(e)
      sendErrorResponse(res, 500, 'Despesa não localizada!')
    }
  },

  createCost: async (req: Request, res: Response) => {
    const parse = z
      .object({
        name: z
          .string({ required_error: 'o campo nome é obrigatório' })
          .nonempty('preencha o nome da despesa')
          .toLowerCase(),
        value: z
          .string({ required_error: 'o campo nome é obrigatório' })
          .nonempty('preencha o valor da despesa')
          .transform((number) => parseFloat(number.replace(',', '.'))),
        tenant_id: z.coerce.number(),
      })
      .array()
      .safeParse(req.body)

    if (!parse.success) {
      sendErrorResponse(res, 400, parse.error.issues)
      return
    }

    try {
      await costService.createCost(parse.data)
      sendSuccessResponse(res, 200, 'Despesas criadas!')
    } catch (e) {
      console.log(e)
      sendErrorResponse(res, 400, 'erro ao criar despesas')
    }
  },

  deleteCost: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
      sendErrorResponse(res, 400, 'id não enviado')
      return
    }

    try {
      await costService.deleteCostById(parseInt(id as string))
      sendSuccessResponse(res, 200)
    } catch (e) {
      sendErrorResponse(res, 400, 'Despesa não localizada!')
    }
  },
}
