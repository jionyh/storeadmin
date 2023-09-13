import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex min-h-screen w-full min-w-[375px] flex-col">
      {children}
    </div>
  )
}
