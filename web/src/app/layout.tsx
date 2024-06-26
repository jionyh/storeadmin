import { Providers } from '@/utils/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Storeadmin',
  description: 'Storeadmin',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'storeadmin', 'saas'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  authors: [
    { name: 'Jiony Santos' },
    {
      name: 'Jiony Santos',
      url: 'https://github.com/jionyh/',
    },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-muted-foreground`}>
        <div className="m-auto w-full sm:max-w-md">
          <Providers>
            <Suspense>{children}</Suspense>
          </Providers>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
