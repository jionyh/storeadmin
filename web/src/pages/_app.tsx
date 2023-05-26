import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '../utils/CheckRoutesIsPublic'
import { CheckAuth } from '@/components/CheckAuth'
import { ContextProvider } from '@/contexts/UserContext'

export default function App({ Component, pageProps }: AppProps) {
  const path = usePathname()
  const isPublic = checkIsPublicRoute(path)

  return (
    <ContextProvider>
      <ChakraProvider>
        {isPublic && <Component {...pageProps} />}
        {!isPublic && (
          <CheckAuth>
            <Component {...pageProps} />
          </CheckAuth>
        )}
      </ChakraProvider>
    </ContextProvider>
  )
}
