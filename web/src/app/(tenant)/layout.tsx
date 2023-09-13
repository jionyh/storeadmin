import Header from '@/components/header/Header'
import { ReactNode } from 'react'

export default function TenantLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex min-h-screen w-full min-w-[375px] flex-col">
      <Header />
      {children}
    </div>
  )
}
