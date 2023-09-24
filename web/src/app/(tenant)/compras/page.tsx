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

        <div className="px-5 w-full">
          <Link
            className="my-5 flex w-full items-center justify-end"
            href="/compras/add"
          >
            <Button size='sm'>Nova Compra</Button>
          </Link>
          {isError && <Empty title="compras" />}
          {data && (
              <Table className="pointer-events-none mt-2 w-full">
                {data.purchases.allPurchases.map((purchases, i) => (
                  <React.Fragment key={i}>
                    {purchases.dailyPurchases.map(daily=>(
                      <React.Fragment key={daily.category}>
                      <TableHeader>
                      <TableRow className="h-5 bg-primary border">
                        <TableHead className="">
                          <span className="font-semibold text-primary-foreground text-left tracking-tight">
                            {daily.category}
                          </span>
                        </TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="border">
                    {daily.purchases.map(itemPurchases =>(
                      <TableRow
                          key={itemPurchases.id}
                          className="odd:bg-primary/5 even:bg-primary/10"
                        >
                          <TableCell>{itemPurchases.product}</TableCell>
                          <TableCell className='text-right'>{itemPurchases.quantity} {itemPurchases.unit}</TableCell>
                          <TableCell className="text-end">
                            € {itemPurchases.value}
                          </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                      </React.Fragment>
                    ))}
                    <TableFooter>
                      <TableRow className="bg-muted-foreground">
                        <TableCell></TableCell>
                        <TableCell className="text-right">Total</TableCell>
                        <TableCell className="text-end">
                          € {purchases.total}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </React.Fragment>
                ))}
              </Table>
          )}
        </div>
      </main>
    </>
  )
}
