'use client'
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
import { dataUtils } from '@/utils/dataUtils'
import { useCosts, useGetSingleCosts } from '@/utils/queries/costs'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Costs() {
  const [activeCostId, setActiveCostId] = useState(1)
  const date = dataUtils.getCurrentDay()

  const { data, isLoading, isError } = useCosts({
    date,
    period: 'month',
  })

  const { data: costData } = useGetSingleCosts(activeCostId)

  return (
    <>
      <Loader visible={isLoading} />

      {costData && <p>{costData.cost.id}</p>}

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
            <Table className="mt-2 w-full">
              <TableHeader className="pointer-events-none ">
                <TableRow className="h-5 border bg-primary">
                  <TableHead colSpan={3} className="text-primary-foreground">
                    <span>{dataUtils.getCurrentMonth()}</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border">
                {data.costs.costs.map((costs) => (
                  <TableRow
                    key={costs.id}
                    onClick={() => setActiveCostId(costs.id)}
                    className="cursor-pointer odd:bg-primary/5 even:bg-primary/10"
                  >
                    <TableCell className="w-12">
                      {dataUtils.getDayAndMonth(costs.createAt)}
                    </TableCell>
                    <TableCell>{costs.name}</TableCell>
                    <TableCell className="w-1/3">
                      € {costs.value.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-muted-foreground">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell>€ {data.costs.month_totals?.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </div>
      </main>
    </>
  )
}
