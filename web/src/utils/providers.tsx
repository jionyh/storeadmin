'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'
import { queryClient } from './queryClient.ts'
import { ErrorBoundary } from 'react-error-boundary'

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} panelPosition="right" />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
