/* eslint-disable no-useless-catch */
import { api } from '@/lib/axios'
import { ErrorResponse } from '@/types/errorTypes'
import { PaymentResponseSuccess } from '@/types/paymentTypes'
import { Sale, SingleSaleResponse } from '@/types/saleTypes'
import axios from 'axios'

export const paymentMethodsApi = {
  getAllPaymentsMethods: async (): Promise<
    PaymentResponseSuccess | ErrorConstructor
  > => {
    try {
      const response = await api.get('/paymentsmethods')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If there's a response from the backend, return its data
        console.log(error)
        throw new Error(error.response.data.error)
        // return error.response.data
      } else {
        throw new Error('Failed to fetch login')
      }
    }
  },

  createPaymentsMethods: async (
    saleData: Sale,
  ): Promise<SingleSaleResponse> => {
    try {
      const response = await api.post('/sales', saleData)
      return response.data
    } catch (error) {
      throw error
    }
  },
  deletePaymentsMethod: async (saleId: number): Promise<ErrorResponse> => {
    try {
      const response = await api.delete(`/sales/${saleId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}
