import { DatePicker } from '@/components/DatePicker'
import { PageHeader } from '@/components/PageHeader'
import Link from 'next/link'
import React from 'react'

export default function Vendas() {
  return (
    <>
      <main className="flex-1">
        {/* Main Header - Title bar */}
        <PageHeader name="vendas" />

        <Link href="/vendas/add">
          <button className="my-4 rounded bg-red-500  px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600">
            Nova Venda
          </button>
        </Link>
        <DatePicker />
      </main>
    </>
  )
}
