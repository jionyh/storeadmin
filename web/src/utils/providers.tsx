'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'
import { queryClient } from './queryClient.ts'
import { ErrorBoundary } from 'react-error-boundary'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from './auth/checkIsPublicRoute.ts'
import { PrivateRoute } from '@/components/auth/privateRoute.tsx'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  const path = usePathname()

  const isPublicPage = checkIsPublicRoute(path)

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        {isPublicPage && children}
        {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
        <ReactQueryDevtools initialIsOpen={false} panelPosition="right" />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
