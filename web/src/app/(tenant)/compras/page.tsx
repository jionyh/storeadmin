'use client'
import { DatePicker } from '@/components/DatePicker'
import { Empty } from '@/components/Empty'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Alert } from '@/components/alertDialog/Alert'
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
import useDelete from '@/hooks/useDelete'
import { usePurchases } from '@/utils/queries/purchases'
import dayjs from 'dayjs'
import { PenSquare, XSquare } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Purchases() {
  const [activePurchaseId, setActivePurchaseId] = useState(0)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

  const { data, isLoading, isError } = usePurchases({
    date,
    period: 'day',
  })
  const {isDialogOpen, setIsDialogOpen,deleteAction} = useDelete({
    endpoint:'purchases',
    activeId:activePurchaseId,
    date,
    period:'day'})

    const handleShowAction = async (id:number)=>{
      console.log(id)
    }

  return (
    <>
      <Loader visible={isLoading} />

      <main className="flex-1 space-y-3">
        {/* Main Header - Title bar */}
        <PageHeader name="compras" />

        <DatePicker setDate={setDate} />

        <div className="w-full px-5">
          <Link
            className="my-5 flex w-full items-center justify-end"
            href="/compras/add"
          >
            <Button size="sm">Nova Compra</Button>
          </Link>
          {isError && <Empty title="compras" />}
          {data && (
            <Table className="mt-2 w-full select-none">
              {data.purchases.allPurchases.map((purchases, i) => (
                <React.Fragment key={i}>
                  {purchases.dailyPurchases.map((daily) => (
                    <React.Fragment key={daily.category}>
                      <TableHeader className='pointer-events-none '>
                        <TableRow className="h-5 border bg-primary">
                          <TableHead colSpan={4} className="text-primary-foreground">
                            <span>{daily.category}</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="border">
                        {daily.purchases.map((itemPurchases) => (
                          <TableRow
                            key={itemPurchases.id}
                            onClick={() => setActivePurchaseId(itemPurchases.id)}
                            className="odd:bg-primary/5 even:bg-primary/10 w-full"
                          >
                            <TableCell className='w-1/2'>{itemPurchases.product}</TableCell>
                            <TableCell className="w-1/4">
                              {itemPurchases.quantity} {itemPurchases.unit}
                            </TableCell>
                            <TableCell className="text-right w-1/4">
                              <span>€ {itemPurchases.value}</span>
                            </TableCell>
                            <TableCell className='w-fit flex items-center justify-end gap-1'>
                              <div title='Visualizar'>
                              <PenSquare onClick={()=>handleShowAction(itemPurchases.id)} className='w-5 h-5 text-primary cursor-pointer' />
                              </div>
                              <div title='Deletar'>
                              <XSquare onClick={()=>setIsDialogOpen(true)} className='w-5 h-5 text-destructive cursor-pointer' />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </React.Fragment>
                  ))}
                  <TableFooter>
                    <TableRow className="bg-muted-foreground">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">
                        € {purchases.total}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </React.Fragment>
              ))}
            </Table>
          )}
        </div>
      </main>
      <Alert
        deleteTitle
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        submit={deleteAction}
      />
    </>
  )
}
