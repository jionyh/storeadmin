import { ErrorResponse } from '@/types/errorTypes'
import { AllSalesResponse } from '@/types/saleTypes'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4001',
})

export const getSale = async (): Promise<AllSalesResponse | ErrorResponse> => {
  try {
    const result = await api.get(`/sales?date=2023-07-17`)
    return result.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If there's a response from the backend, return its data
      return error.response.data
    } else {
      throw new Error('Failed to fetch sales data')
    }
  }
}

// export const getAllSales = async () => {}

// export const createSale = async () => {}

// export const deleteSale = async () => {}
