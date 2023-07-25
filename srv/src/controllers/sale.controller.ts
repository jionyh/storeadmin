import { Request, Response } from 'express'
import { z } from 'zod'
import * as saleService from '../services/sale.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'

export const sale = {
  getAllSales: async (req: Request, res: Response) => {
    const response = await saleService.getAllSales()

    sendSuccessResponse(res, 200, response)
  },
  getSale: async (req: Request, res: Response) => {},
  createSale: async (req: Request, res: Response) => {},
  deleteSale: async (req: Request, res: Response) => {},
}
