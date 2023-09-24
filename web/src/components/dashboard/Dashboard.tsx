'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { ButtonsHeader } from './ButtonHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { DashboardCard } from './Card'
import { getPurchases } from '@/utils/api'
import { Purchases } from '@/types/purchaseTypes'

type Props = {
  initialData: any
}
export const Dashboard = ({ initialData }: Props) => {
  const [cardData, setCardData] = useState<Purchases>(initialData)
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week')

  const dataFetchFunction = useCallback(async (id: string) => {
    setSelectedPeriod(id)
    const request = await getPurchases({ period: id })

    if (request.success) {
      setCardData(request.purchases)
    }
  }, [])

   const valuePeriod =
    cardData && selectedPeriod
      ? selectedPeriod === 'day'
        ? cardData['day totals']?.toFixed(2) ?? '0'
        : selectedPeriod === 'week'
        ? cardData['week totals']?.toFixed(2) ?? '0'
        : selectedPeriod === 'month'
        ? cardData['month totals']?.toFixed(2) ?? '0'
        : ''
      : ''

  return (
    <div className="p-5">
      <div className="flex flex-col items-center justify-center gap-2 text-sm">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
          </CardHeader>
          <CardContent>
            <img alt="" src="/chart.png"></img>
          </CardContent>
        </Card>
        <div className="my-4 flex w-full items-center justify-center gap-2 border-t-2 pt-4">
          <ButtonsHeader srvFn={dataFetchFunction} />
        </div>
        <div className="flex w-full flex-1 items-center justify-center gap-1">
          <DashboardCard
            type="purchase"
            title="Compras"
            period={selectedPeriod}
            value={valuePeriod}
          />
          <DashboardCard
            type="sell"
            title="Vendas"
            period={selectedPeriod}
            value={valuePeriod}
          />
        </div>
      </div>
    </div>
  )
}
