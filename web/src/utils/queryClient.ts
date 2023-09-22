import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity
    },
  },
})
