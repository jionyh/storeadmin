import { NavConfigButtons } from '@/components/NavConfigButtons'
import { ReactNode } from 'react'

const navConfigItems = [
  { title: 'Categorias', href: '/configuracoes/categorias' },
  { title: 'Produtos', href: '/configuracoes/produtos' },
  { title: 'Unidades', href: '/configuracoes/unidades' },
  { title: 'Formas de Pagamentos', href: '/configuracoes/formas_pagamento' },
]

export default function ConfigLayout({ children }: { children: ReactNode }) {
  return (
    <div className="m-auto flex h-screen w-full min-w-[375px] flex-col">
      <NavConfigButtons items={navConfigItems} />
      {children}
    </div>
  )
}
