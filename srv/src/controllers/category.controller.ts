import { Request, Response } from 'express'
import * as categoryService from '../services/category.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'
import { createCategorySchema, createCostSchema } from '../utils/validationSchema'
import { Options } from '../types/ServiceOptionsType'
import { sumValues } from '../utils/sumValuesFromArray'
import { formatCostResponse } from '../utils/formatCostResponse'

export const category = {
  getAllCategories: async (req: Request, res: Response) => {   


    const categories = await categoryService.getAllCategories(req.tenant_id)
    
    if(categories.length < 1) return sendErrorResponse(res,404,'categoryNotFound')  

    const response = {
      categories
    }

    sendSuccessResponse(res, 200, 'categories', response)
  },

  getCategory: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return sendErrorResponse(res, 400, 'idNotSent' )

    try {
      const category = await categoryService.getCategoryById(req.tenant_id, parseInt(id as string))

      if (!category) return sendErrorResponse(res, 404, 'categoryNotFound')

      //sendSuccessResponse(res, 200, 'cost', formatCostResponse(category))
      sendSuccessResponse(res, 200, 'category', category)
    } catch (e) {
      sendErrorResponse(res, 500, 'categoryNotFound')
    }
  },

  createCategory: async (req: Request, res: Response) => {

    const parse = createCategorySchema.array().safeParse(req.body)

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)  

    let categoryData:{name:string,tenant_id:number}[] = []

    parse.data.map(i=>{
      categoryData.push({
      name: i.name,
      tenant_id: req.tenant_id
     })
    })    
  
    try {
      await categoryService.createCategory(categoryData)
      sendSuccessResponse(res, 200)
    } catch (e) {
      console.log(e)
      sendErrorResponse(res, 400, 'createCategoryError')
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id)return sendErrorResponse(res, 400,'idNotSent')

    try {
      await categoryService.deleteCategoryById(parseInt(id as string))
      sendSuccessResponse(res, 200)
    } catch (e) {
      sendErrorResponse(res, 400, 'categoryNotFound')
    }
  },
}
