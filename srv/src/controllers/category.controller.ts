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

    const parse = createCategorySchema.safeParse(req.body)

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)

    const checkIfExistCategory = await categoryService.getCategory({name: parse.data.name, tenant_id: req.tenant_id})
    
    /* Verifica se já existe alguma categoria ativa para o tenant com o mesmo nome */
    if (checkIfExistCategory && !checkIfExistCategory.is_deleted) return sendErrorResponse(res, 400, 'categoryAlreadyExist')

    /* Verifica se existe a categoria e ela está desativada(deletada), se verdadeiro, faz o toggle na categoria */
    if(checkIfExistCategory && checkIfExistCategory.is_deleted){
      const {id, is_deleted} = checkIfExistCategory
      await categoryService.toggleCategory(id, is_deleted)
      return sendSuccessResponse(res,200)
    }
  
    await categoryService.createCategory({name: parse.data.name,tenant_id: req.tenant_id})
    sendSuccessResponse(res, 200)

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
