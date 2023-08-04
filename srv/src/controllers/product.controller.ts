import { ProductResponse } from './../types/ProductType';
import { Request, Response } from 'express'
import * as productService from '../services/product.service'
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../utils/sendResponse'
import { createCategorySchema, createProductSchema } from '../utils/validationSchema'
import { formatCategoryResponse } from '../utils/formatResponse/formatCategory'
import { formatProductResponse } from '../utils/formatResponse/formatProduct'
import { paginationFn } from '../utils/pagination'

export const products = {
  getAllProducts: async (req: Request, res: Response) => {  
    const { cat, page, perpage } = req.query

    const options = {
      cat:cat as string,
      pageNumber: parseInt(page as string) || 1,
      resultsPerPage : parseInt(perpage as string) || 20

    }

    const {totalRecords,products} = await productService.getAllProducts(req.tenant_id,options)
    
    if(products.length < 1 && totalRecords < 1) return sendErrorResponse(res,404,'productNotFound')

    const response = {
      pagination: paginationFn(totalRecords,options),
      products: formatProductResponse(products)
    }

     sendSuccessResponse(res, 200, 'products', response )
  },

  createProduct: async (req: Request, res: Response) => {

    const parse = createProductSchema.array().safeParse(req.body)

    if (!parse.success) return sendErrorResponse(res, 400, parse.error.issues)

    let productsData:{name:string,category_id:number,tenant_id:number}[] = []

    const existingProducts:ProductResponse[] = await productService.checkExistingProduct(req.tenant_id,parse.data)

    const existingProductsError:string[] = []

    for (let i of parse.data){
      const exists = existingProducts.find(prod=>prod.name === i.name && prod.tenant_id === req.tenant_id && prod.category_id === i.category_id)
      if(exists){
       if(exists.is_deleted === true){
        await productService.toggleProduct(exists.id, exists.is_deleted)
       }else{
        existingProductsError.push(exists.name)
       }
      }else{
          productsData.push({
           name: i.name,
           category_id: i.category_id,
           tenant_id: req.tenant_id
          }) 
      }
     } 

    await productService.createProducts(productsData)

    existingProductsError.length > 0 ? sendSuccessResponse(res, 200,'products', `Produtos ${existingProductsError.join(', ')}, já existem.`) : sendSuccessResponse(res,200)

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

  deleteProduct: async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id)return sendErrorResponse(res, 400,'idNotSent')

    try {
      await productService.deleteProductById(parseInt(id as string))
      sendSuccessResponse(res, 200)
    } catch (e) {
      sendErrorResponse(res, 400, 'productNotFound')
    }
  },
}
