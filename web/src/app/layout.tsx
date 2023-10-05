import { Providers } from '@/utils/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StoreAdmin',
  description: 'Sistema de controle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-auto max-w-lg `}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
