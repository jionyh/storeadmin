'use client'
import { DatePicker } from '@/components/DatePicker'
import { Empty } from '@/components/Empty'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from '@/components/ui/table'
import { useSales } from '@/utils/queries/sales'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Vendas() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

  const { data, isLoading, isError, error, refetch } = useSales({
    date,
    period: 'day',
  })

  const handleSetDate = (dateTime: string) => {
    setDate(dateTime)
  }

  useEffect(() => {
    refetch()
  }, [date, refetch])

  return (
    <>
      <Loader visible={isLoading} />

      <main className="flex-1 space-y-3">
        {/* Main Header - Title bar */}
        <PageHeader name="vendas" />

        <DatePicker setDate={handleSetDate} />

        <div className="px-5">
          <Link
            className="flex w-full items-center justify-end"
            href="/vendas/add"
          >
            <button className="mb-3 rounded bg-red-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600">
              Nova Venda
            </button>
          </Link>
          {isError && <Empty title="vendas" />}
          {data && (
            <div className="">
              <Table className="w-full rounded shadow-lg">
                {data.sales.allSales.map((sales, i) => (
                  <React.Fragment key={i}>
                    <TableHeader className="">
                      <TableRow className="pointer-events-none rounded-lg bg-indigo-400 leading-snug text-white">
                        <TableHead className="w-2/3 text-white">
                          {dayjs(sales.date).format('D [de] MMMM')}
                        </TableHead>
                        <TableHead className=""></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.dailySales.map((dailySales) => (
                        <TableRow
                          key={dailySales.id}
                          className="odd:bg-indigo-50 even:bg-indigo-200"
                        >
                          <TableCell className="">
                            {dailySales.payment_id}
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            € {dailySales.value.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter className="mt-1 bg-indigo-500 font-bold leading-snug text-white">
                      <TableRow className="">
                        <TableCell>Total</TableCell>
                        <TableCell className="text-center font-medium">
                          € {sales.total}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </React.Fragment>
                ))}
              </Table>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
