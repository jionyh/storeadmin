import { CategoriesResponse } from '@/types/productTypes'
import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/utils/api/categories'

export const useCategory = () => {
  const category = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAllCategories(),
    staleTime: Infinity,
  })

  const returnData = {
    data: category.data as CategoriesResponse,
    isLoading: category.isLoading,
    isError: category.isError,
  }

  return returnData
}
