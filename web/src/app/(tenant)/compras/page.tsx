'use client'
import { DatePicker } from '@/components/DatePicker'
import { Empty } from '@/components/Empty'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from '@/components/ui/table'
import { usePurchases } from '@/utils/queries/purchases'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Purchases() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

  const { data, isLoading, isError } = usePurchases({
    date,
    period: 'day',
  })

  return (
    <>
      <Loader visible={isLoading} />

      <main className="flex-1 space-y-3">
        {/* Main Header - Title bar */}
        <PageHeader name="compras" />

        <DatePicker setDate={setDate} />

        <div className="px-5">
          <Link
            className="flex w-full items-center justify-end"
            href="/compras/add"
          >
            <Button>Nova Compra</Button>
          </Link>
          {isError && <Empty title="compras" />}
          {data && (
            <div className="">
              <Table className="pointer-events-none mt-2 w-full">
                {data.purchases.allPurchases.map((sales, i) => (
                  <React.Fragment key={i}>
                    <TableHeader>
                      <TableRow className="">
                        <TableHead className="">
                          <h3 className="font-semibold leading-none tracking-tight">
                            {dayjs(sales.date).format('D [de] MMMM')}
                          </h3>
                        </TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="border">
                      {sales.dailySales.map((dailySales) => (
                        <TableRow
                          key={dailySales.id}
                          className="odd:bg-primary/5 even:bg-primary/10"
                        >
                          <TableCell>{dailySales.payment_id}</TableCell>
                          <TableCell></TableCell>
                          <TableCell className="text-end">
                            € {dailySales.value.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow className="">
                        <TableCell></TableCell>
                        <TableCell className="text-right">Total</TableCell>
                        <TableCell className="text-end">
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
