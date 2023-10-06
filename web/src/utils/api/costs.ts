/* eslint-disable no-useless-catch */
import { api } from '@/lib/axios'
import {
  AllCostParams,
  AllCostResponse,
  Cost,
  SingleCostResponse,
} from '@/types/costTypes'
import { ErrorResponse } from '@/types/errorTypes'
import axios from 'axios'

export const costApi = {
  getAllCosts: async (
    params?: AllCostParams,
  ): Promise<AllCostResponse | ErrorConstructor> => {
    try {
      const response = await api.get('/costs', {
        params,
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If there's a response from the backend, return its data
        throw new Error(error.response.data.error)
        // return error.response.data
      } else {
        throw new Error('Failed to fetch costs')
      }
    }
  },
  getCost: async (costId: number): Promise<SingleCostResponse> => {
    try {
      const response = await api.get(`/costs/${costId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
  createCosts: async (costData: Cost): Promise<SingleCostResponse> => {
    try {
      const response = await api.post('/costs', costData)
      return response.data
    } catch (error) {
      throw error
    }
  },
  deleteCost: async (costId: number): Promise<ErrorResponse> => {
    try {
      const response = await api.delete(`/costs/${costId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
