'use client'
import { DatePicker } from '@/components/DatePicker'
import { Empty } from '@/components/Empty'
import { Loader } from '@/components/Loader'
import { PageHeader } from '@/components/PageHeader'
import { Alert } from '@/components/alertDialog/Alert'
import { PurchasesFormMain } from '@/components/forms/purchases/PurchasesFormMain'
import { ModalForm } from '@/components/modalForm/ModalForm'
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
import { Purchase } from '@/types/purchaseTypes'
import { usePurchases } from '@/utils/queries/purchases'
import dayjs from 'dayjs'
import { PenSquare, XSquare } from 'lucide-react'
import React, { useState } from 'react'

type ActivePurchaseType = {
  purchase_id?: number
  quantity: string
  value: string
  category?: string
  product_id: string
  unit_id: string
  supplier: string
}

const defaultPurchase = [{
  quantity: '',
  value: '0',
  product_id: '',
  unit_id: ' ',
  supplier: '',
}]

export default function Purchases() {
  const [activePurchaseId, setActivePurchaseId] = useState(0)
  const [activePurchase, setActivePurchase] =
    useState<ActivePurchaseType[]>(defaultPurchase)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [open, setOpen] = useState(false)

  const { data, isLoading, isError } = usePurchases({
    date,
    period: 'day',
  })
  const { isDialogOpen, setIsDialogOpen, deleteAction } = useDelete({
    endpoint: 'purchases',
    activeId: activePurchaseId,
    date,
    period: 'day',
  })

  const handleShowAction = async (id: number) => {
    setActivePurchase(defaultPurchase)
    if (isLoading) return
    const activePurchase = []
    const allPurchases = data.purchases.allPurchases
    for (const purchase of allPurchases) {
      for (const dailyPurchase of purchase.dailyPurchases) {
        const foundPurchase = dailyPurchase.purchases.find(
          (purchase) => purchase.id === id,
        )

        if (foundPurchase) {
          setActivePurchase([{
            category: dailyPurchase.category,
            purchase_id: foundPurchase.id,
            quantity: foundPurchase.quantity.toString(),
            value: foundPurchase.value,
            product_id: foundPurchase.product,
            unit_id: foundPurchase.unit,
            supplier: foundPurchase.supplier,
          }])
        }
      }
    }
    setOpen(true)
  }

  const handleButtonAddClick = () => {
    setActivePurchase(defaultPurchase)
    setOpen(true)
  }

  return (
    <>
      <Loader visible={isLoading} />

      <main className="flex-1 space-y-3">
        {/* Main Header - Title bar */}
        <PageHeader name="compras" />

        <DatePicker setDate={setDate} />

        <div className="w-full px-5">
          <div className="my-5 flex w-full items-center justify-end">
            <Button onClick={handleButtonAddClick} size="sm">
              Nova Compra
            </Button>
          </div>
          {isError && <Empty title="compras" />}
          {data && (
            <Table className="mt-2 w-full select-none">
              {data.purchases.allPurchases.map((purchases, i) => (
                <React.Fragment key={i}>
                  {purchases.dailyPurchases.map((daily) => (
                    <React.Fragment key={daily.category}>
                      <TableHeader className="pointer-events-none ">
                        <TableRow className="h-5 border bg-primary">
                          <TableHead
                            colSpan={4}
                            className="text-primary-foreground"
                          >
                            <span>{daily.category}</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="border">
                        {daily.purchases.map((itemPurchases) => (
                          <TableRow
                            key={itemPurchases.id}
                            onClick={() =>
                              setActivePurchaseId(itemPurchases.id)
                            }
                            className="w-full odd:bg-primary/5 even:bg-primary/10"
                          >
                            <TableCell className="w-1/2">
                              {itemPurchases.product}
                            </TableCell>
                            <TableCell className="w-1/4">
                              {itemPurchases.quantity} {itemPurchases.unit}
                            </TableCell>
                            <TableCell className="w-1/4 text-right">
                              <span>€ {itemPurchases.value}</span>
                            </TableCell>
                            <TableCell className="flex w-fit items-center justify-end gap-1">
                              <div title="Visualizar">
                                <PenSquare
                                  onClick={() =>
                                    handleShowAction(itemPurchases.id)
                                  }
                                  className="h-5 w-5 cursor-pointer text-primary"
                                />
                              </div>
                              <div title="Deletar">
                                <XSquare
                                  onClick={() => setIsDialogOpen(true)}
                                  className="h-5 w-5 cursor-pointer text-destructive"
                                />
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
                      <TableCell className="text-right text-xs">
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
      <ModalForm open={open} setOpen={setOpen}>
        <PurchasesFormMain initialData={activePurchase} />
      </ModalForm>
    </>
  )
}
