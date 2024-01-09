'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { ButtonsHeader } from './ButtonHeader'
import { DashboardCard } from './Card'
import { usePurchases } from '@/utils/queries/purchases'
import { useSales } from '@/utils/queries/sales'

export const DashboardComponent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week')

  const { data: purchasesData, isLoading: purchasesLoading } = usePurchases({
    period: selectedPeriod,
  })
  const { data: salesData, isLoading: salesLoading } = useSales({
    period: selectedPeriod,
  })

  const dataFetchFunction = useCallback(async (id: string) => {
    setSelectedPeriod(id)
  }, [])
  useEffect(() => {
    dataFetchFunction(selectedPeriod)
  })

  const purchasesValue =
    purchasesData && selectedPeriod
      ? selectedPeriod === 'day'
        ? purchasesData.purchases.day_totals?.toFixed(2) ?? '0'
        : selectedPeriod === 'week'
        ? purchasesData.purchases.week_totals?.toFixed(2) ?? '0'
        : selectedPeriod === 'month'
        ? purchasesData.purchases.month_totals?.toFixed(2) ?? '0'
        : '0'
      : '0'

  const salesValue =
    salesData && selectedPeriod
      ? selectedPeriod === 'day'
        ? salesData.sales.day_totals?.toFixed(2) ?? '0'
        : selectedPeriod === 'week'
        ? salesData.sales.week_totals?.toFixed(2) ?? '0'
        : selectedPeriod === 'month'
        ? salesData.sales.month_totals?.toFixed(2) ?? '0'
        : '0'
      : '0'

  return (
    <>
      <div className="my-4 flex w-full items-center justify-center gap-2 border-t-2 pt-4">
        <ButtonsHeader srvFn={dataFetchFunction} />
      </div>
      <div className="flex w-full flex-1 items-center justify-center gap-1">
        <DashboardCard
          type="purchase"
          title="Compras"
          period={selectedPeriod}
          value={purchasesValue}
        />
        <DashboardCard
          type="sell"
          title="Vendas"
          period={selectedPeriod}
          value={salesValue}
        />
      </div>
    </>
  )
}
