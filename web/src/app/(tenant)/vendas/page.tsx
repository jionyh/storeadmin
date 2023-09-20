'use client'
import { DatePicker } from '@/components/DatePicker'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '@/components/ui/table'
import { useSales } from '@/utils/queries/sales'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Vendas() {

  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

  const {data, isLoading, isError, error, refetch} = useSales({date})

  const handleSetDate = (dateTime:string)=>{
    setDate(dateTime)
  }

  useEffect(()=>{
    refetch()
  },[date, refetch])

  return (
    <>
      <Loader visible={isLoading}/>
      
        <main className="flex-1">
        {/* Main Header - Title bar */}
        <PageHeader name="vendas" />

        <Link className='' href="/vendas/add">
          <button className="my-4 rounded bg-red-500  px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600">
            Nova Venda
          </button>
        </Link>
        <DatePicker setDate={handleSetDate} />
        <div className='p-5'>
        {isError && (<p>{error.message}</p>)}
        {data && (
          <Table className='w-full rounded-sm'>
          {data.sales.allSales.map((sales,i)=>(
            <React.Fragment key={i}>
            <TableHeader>
            <TableRow className='bg-sky-200 text-slate-700 font-bold leading-snug pointer-events-none'>
              <TableHead className="w-2/3">{dayjs(sales.date).format('D [de] MMMM')}</TableHead>
              <TableHead className=''></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {sales.dailySales.map(dailySales=>(
            <TableRow key={dailySales.id} className="odd:bg-white even:bg-slate-50">
              <TableCell className="">{dailySales.payment_id}</TableCell>
              <TableCell className="font-medium text-center">€ {dailySales.value.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          </TableBody>
          <TableFooter className='bg-red-300 text-slate-700 font-bold leading-snug'>
            <TableCell>Total</TableCell>
            <TableCell className='font-medium text-center'>€ {sales.total}</TableCell>
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
