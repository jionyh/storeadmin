'use client'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'

type Props = {
  type: 'sell' | 'purchase'
  title: string
  value: string
  period: string
}
export const DashboardCard = ({ type, title, value, period }: Props) => {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardTitle className={`flex items-center justify-between`}>
          <span className="text-lg">{title}</span>
          {type === 'sell' ? (
            <TrendingUp className="text-green-700" />
          ) : (
            <TrendingDown className="text-red-700" />
          )}
        </CardTitle>
      </CardHeader>
      <Separator className="ml-2 w-4/5" />
      <CardContent className="pt-4">
        <p className="text-base font-bold leading-relaxed">€ {value}</p>
        <p className="mt-2 cursor-pointer text-center text-xs text-muted-foreground hover:underline">
          + Detalhes
        </p>
      </CardContent>
    </Card>
  )
}
