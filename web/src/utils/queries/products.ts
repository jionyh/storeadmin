import { ProductsResponse } from '@/types/productTypes'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products'

export const useProducts = (id:string) => {
  const products = useQuery({
    queryKey: ['products',{cat: id}],
    queryFn: () => productsApi.getAllProducts(id),
    staleTime: Infinity,
  })

  

  const returnData = {
    data: products.data as ProductsResponse,
    isLoading: products.isLoading,
    isError: products.isError,
  }

  return returnData
}
