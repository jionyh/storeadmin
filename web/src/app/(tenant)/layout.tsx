import Header from '@/components/header/Header'
import { ReactNode, Suspense } from 'react'
import Loading from './loading'

export default function TenantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex min-h-screen w-full min-w-[375px] flex-col bg-primary/5">
      <Header />
      {children}
    </div>
  )
}
