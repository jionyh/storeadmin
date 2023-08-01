import { Request, Response } from 'express'
import * as categoryService from '../services/category.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'
import { createCategorySchema } from '../utils/validationSchema'
import { formatCategoryResponse } from '../utils/formatResponse/formatCategory'

export const category = {
  getAllCategories: async (req: Request, res: Response) => {   


    const categories = await categoryService.getAllCategories(req.tenant_id)
    
    if(categories.length < 1) return sendErrorResponse(res,404,'categoryNotFound')  

     sendSuccessResponse(res, 200, 'categories', formatCategoryResponse(categories))
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

  editCategory: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id)return sendErrorResponse(res, 400,'idNotSent')
    
    const parse = createCategorySchema.safeParse(req.body)
    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)  

    const editCategory = await categoryService.editCategory(parseInt(id), parse.data)


    if(!editCategory) return sendErrorResponse(res,400,'categoryNotFound')

    sendSuccessResponse(res,200,'category',formatCategoryResponse(editCategory))


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
