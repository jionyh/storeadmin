import { AllSalesParams, AllSalesResponse } from './../../types/saleTypes';
// import { useQuery } from '@tanstack/react-query'
// import { getLogin, getSale } from "../api";
// import { getPosts, getPost } from "./api";

import { useQuery } from "@tanstack/react-query";
import { salesApi } from "../api/sales";

export const useSales = (params?:AllSalesParams) =>{
const sales = useQuery({
  queryKey: ['sale'],
  queryFn: ()=> salesApi.getAllSales(params)
})

const error = sales.error as Error

const returnData = {
  data: sales.data as AllSalesResponse,
  isLoading: sales.isLoading,
  isError: sales.isError,
  error: sales.error as Error,
  refetch: sales.refetch
}
return returnData
  }
