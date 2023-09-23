import { api } from '@/lib/axios'
import {  ProductsResponse } from '@/types/productTypes'
import axios from 'axios'

export const productsApi = {
  getAllProducts: async (id:string): Promise<
    ProductsResponse | ErrorConstructor
  > => {
    if(!id) throw new Error('Failed to fetch products')

    
    try {
      const response = await api.get(`/products?cat=${id}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If there's a response from the backend, return its data
        console.log(error)
        throw new Error(error.response.data.error)
        // return error.response.data
      } else {
        throw new Error('Failed to fetch products')
      }
    }
  }
}