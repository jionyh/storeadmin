/* eslint-disable no-useless-catch */
import { api } from '@/lib/axios'
import { ErrorResponse } from '@/types/errorTypes'
import {
  AllPurchaseResponse,
  AllPurchasesParams,
  Purchase,
  SinglePurchaseResponse,
} from '@/types/purchaseTypes'
import axios from 'axios'

export const purchaseApi = {
  getAllPurchases: async (
    params?: AllPurchasesParams,
  ): Promise<AllPurchaseResponse | ErrorConstructor> => {
    try {
      const response = await api.get('/purchases', {
        params,
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If there's a response from the backend, return its data
        throw new Error(error.response.data.error)
        // return error.response.data
      } else {
        throw new Error('Failed to fetch purchases')
      }
    }
  },
  getPurchase: async (purchaseId: number): Promise<SinglePurchaseResponse> => {
    try {
      const response = await api.get(`/purchases${purchaseId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  createPurchases: async (
    purchaseData: Purchase,
  ): Promise<SinglePurchaseResponse> => {
    try {
      const response = await api.post('/purchases', purchaseData)
      return response.data
    } catch (error) {
      throw error
    }
  },
  deletePurchase: async (purchaseId: number): Promise<ErrorResponse> => {
    try {
      const response = await api.delete(`/purchases/${purchaseId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
