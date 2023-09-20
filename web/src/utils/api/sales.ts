import { api } from "@/lib/axios";
import { ErrorResponse } from "@/types/errorTypes";
import { AllSalesParams, AllSalesResponse, Sale, SingleSaleResponse } from "@/types/saleTypes";
import axios from "axios";


export const salesApi = {
  getAllSales: async (
    params?:AllSalesParams
  ): Promise<AllSalesResponse | ErrorConstructor> => {
    try {
      const response = await api.get('/sales', {
        params
      });
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If there's a response from the backend, return its data
        throw new Error( error.response.data.error)
        //return error.response.data
      } else {
        throw new Error("Failed to fetch login");
      }
    }
  },
  getSale: async (saleId: number): Promise<SingleSaleResponse> => {
    try {
      const response = await api.get(`/sales${saleId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createSales: async (saleData: Sale): Promise<SingleSaleResponse> => {
    try {
      const response = await api.post('/sales', saleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteSales: async (saleId: number): Promise<ErrorResponse> => {
    try {
      const response = await api.delete(`/sales/${saleId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}