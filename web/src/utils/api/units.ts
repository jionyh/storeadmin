import { api } from '@/lib/axios'
import {  UnitsResponse } from '@/types/productTypes'
import axios from 'axios'

export const unitApi = {
  getAllUnits: async (): Promise<
    UnitsResponse | ErrorConstructor
  > => {

    try {
      const response = await api.get(`/units`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If there's a response from the backend, return its data
        console.log(error)
        throw new Error(error.response.data.error)
        // return error.response.data
      } else {
        throw new Error('Failed to fetch units')
      }
    }
  }
}