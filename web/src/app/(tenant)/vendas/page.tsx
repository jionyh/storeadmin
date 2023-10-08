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
import { dataUtils } from '@/utils/dataUtils'
import { useSales } from '@/utils/queries/sales'
import dayjs from 'dayjs'
import { PenSquare, XSquare } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Sales() {
  const [activeSaleId, setActiveSaleId] = useState(0)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

  const { data, isLoading, isError } = useSales({
    date,
    period: 'day',
  })

  const {isDialogOpen, setIsDialogOpen,deleteAction} = useDelete({
    endpoint:'sales',
    activeId:activeSaleId,
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
        <PageHeader name="vendas" />
        <DatePicker setDate={setDate} />

        <div className="mb-3 w-full px-5">
          <Link
            className="my-5 flex items-center justify-end"
            href="/vendas/add"
          >
            <Button size="sm">Nova Venda</Button>
          </Link>

          {isError && <Empty title="vendas" />}
          {data && (
            <Table className="mt-2 w-full select-none">
              {data.sales.allSales.map((sales, i) => (
                <React.Fragment key={i}>
                  <TableHeader className='pointer-events-none '>
                    <TableRow className="h-5 border bg-primary">
                    <TableHead colSpan={4} className="text-primary-foreground">
                        <span>
                          {dataUtils.getDayAndMonth(sales.date,'long')}
                        </span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border">
                    {sales.dailySales.map((dailySales) => (
                      <TableRow
                        key={dailySales.id}
                        onClick={() => setActiveSaleId(dailySales.id)}
                        className="odd:bg-primary/5 even:bg-primary/10"
                      >
                        <TableCell colSpan={2}>{dailySales.payment}</TableCell>
                        <TableCell className="text-right w-full">
                          € {dailySales.value.toFixed(2)}
                        </TableCell>
                        <TableCell className='w-fit flex items-center justify-end gap-1'>
                          <div title='Visualizar'>
                          <PenSquare onClick={()=>handleShowAction(dailySales.id)} className='w-5 h-5 text-primary cursor-pointer' />
                          </div>
                          <div title='Deletar'>
                          <XSquare onClick={()=>setIsDialogOpen(true)} className='w-5 h-5 text-destructive cursor-pointer' />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="bg-muted-foreground">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">
                        € {sales.total}
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
