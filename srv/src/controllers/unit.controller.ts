import { Request, Response } from 'express'
import * as unitService from '../services/unit.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'
import { createUnitSchema } from '../utils/validationSchema'
import { formatUnitResponse } from '../utils/formatResponse/formatUnit'
import { UnitResponse } from '../types/UnitType'

export const unit = {
  getAllUnits: async (req: Request, res: Response) => {   


    const units = await unitService.getAllUnits(req.tenant_id)
    
    if(units.length < 1) return sendErrorResponse(res,404,'unitNotFound')  

     sendSuccessResponse(res, 200, 'units', formatUnitResponse(units))
  },

  createUnit: async (req: Request, res: Response) => {

    const parse = createUnitSchema.safeParse(req.body)

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)

    const checkIfExistUnit:UnitResponse = await unitService.getUnit({name: parse.data.name, tenant_id: req.tenant_id})
    
    /* Verifica se já existe alguma unidade ativa para o tenant com o mesmo nome */
    if (checkIfExistUnit && !checkIfExistUnit.is_deleted) return sendErrorResponse(res, 400, 'unitAlreadyExist')

    /* Verifica se existe a unidade e ela está desativada(deletada), se verdadeiro, faz o toggle na unidade */
    if(checkIfExistUnit && checkIfExistUnit.is_deleted){
      const {id, is_deleted} = checkIfExistUnit
      await unitService.toggleUnit(id, is_deleted)
      return sendSuccessResponse(res,200)
    }
  
    const createUnit =  unitService.createUnit({name: parse.data.name,abbreviation: parse.data.abbreviation,tenant_id: req.tenant_id})

    if(!createUnit) return sendErrorResponse(res, 404, createUnit)
    sendSuccessResponse(res, 200)

  },

  editUnit: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id)return sendErrorResponse(res, 400,'idNotSent')
    
    const parse = createUnitSchema.safeParse(req.body)
    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)  

    const editUnit = await unitService.editUnit(parseInt(id), parse.data)


    if(!editUnit) return sendErrorResponse(res,400,'unitNotFound')

    sendSuccessResponse(res,200,'unit',formatUnitResponse(editUnit))


  },

  deleteUnit: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id)return sendErrorResponse(res, 400,'idNotSent')

    try {
      await unitService.deleteUnitById(parseInt(id as string))
      sendSuccessResponse(res, 200)
    } catch (e) {
      sendErrorResponse(res, 400, 'unitNotFound')
    }
  },
}
