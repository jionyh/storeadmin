import { NavConfigButtons } from '@/components/NavConfigButtons'
import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'

const navConfigItems = [
  { title: 'Categorias', href: '/cadastros' },
  { title: 'Produtos', href: '/cadastros/produtos' },
  { title: 'Unidades', href: '/cadastros/unidades' },
  { title: 'Formas de Pagamentos', href: '/cadastros/formas_pagamento' },
]

export default function ConfigLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex h-screen w-full min-w-[375px] flex-col">
      <NavConfigButtons items={navConfigItems} />
      <Separator/>
      {children}
    </div>
  )
}
