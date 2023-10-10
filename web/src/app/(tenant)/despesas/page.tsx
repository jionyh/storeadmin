'use client'
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
import { toast, useToast } from '@/components/ui/use-toast'
import useDelete from '@/hooks/useDelete'
import { costApi } from '@/utils/api/costs'
import { dataUtils } from '@/utils/dataUtils'
import { useCosts, useGetSingleCosts } from '@/utils/queries/costs'
import { queryClient } from '@/utils/queryClient'
import { PenSquare, XSquare } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Costs() {
  const [activeCostId, setActiveCostId] = useState(0)
  const date = dataUtils.getCurrentDay()

  const { data, isLoading, isError } = useCosts({
    date,
    period: 'month',
  })
  const { data: costData, isLoading: costLoading } =
    useGetSingleCosts(activeCostId)

  const { isDialogOpen, setIsDialogOpen, deleteAction } = useDelete({
    endpoint: 'costs',
    activeId: activeCostId,
    date,
    period: 'month',
  })

  const handleShowAction = async (id: number) => {
    console.log(id)
  }

  return (
    <>
      <Loader visible={isLoading && costLoading} />
      <main className="flex-1 space-y-3">
        {/* Main Header - Title bar */}
        <PageHeader name="despesas" />
        <div className="w-full px-5">
          <Link
            className="my-5 flex w-full items-center justify-end"
            href="/despesas/add"
          >
            <Button size="sm">Nova Despesa</Button>
          </Link>
          {isError && <Empty title="compras" />}
          {data && (
            <Table className="mt-2 w-full select-none">
              <TableHeader className="pointer-events-none ">
                <TableRow className="h-5 border bg-primary">
                  <TableHead colSpan={4} className="text-primary-foreground">
                    <span>{dataUtils.getCurrentMonth()}</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border">
                {data.costs.costs.map((costs) => (
                  <TableRow
                    key={costs.id}
                    onClick={() => setActiveCostId(costs.id)}
                    className="odd:bg-primary/5 even:bg-primary/10"
                  >
                    <TableCell className="w-12">
                      {dataUtils.getDayAndMonth(costs.createAt)}
                    </TableCell>
                    <TableCell>{costs.name}</TableCell>
                    <TableCell className="w-full text-right">
                      € {costs.value.toFixed(2)}
                    </TableCell>
                    <TableCell className="flex w-fit items-center justify-end gap-1">
                      <div title="Visualizar">
                        <PenSquare
                          onClick={() => handleShowAction(costs.id)}
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
              <TableFooter>
                <TableRow className="bg-muted-foreground">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">
                    € {data.costs.month_totals?.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
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
