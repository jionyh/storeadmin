'use client'
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../ui/card'
import { Separator } from '../ui/separator'
import { ReactElement, ReactNode } from 'react'

type Props = {
  type: 'sell' | 'purchase'
  title: string
  value: string
  period: string
}
export const DashboardCard = ({type,title,value,period}:Props)=>{
  return(
    <Card className="flex-1">
    <CardHeader className='pb-2'>
      <CardTitle className={`flex items-center justify-between ${type === 'sell' ? 'text-green-500' : 'text-red-500'}`}>
        <span className='text-lg'>{title}</span>
        {type === 'sell' ? <TrendingUp/> : <TrendingDown/>}
      </CardTitle>
    </CardHeader>
    <Separator className='w-4/5 ml-2' />
    <CardContent className='pt-4'>
      <p className='font-bold text-base leading-relaxed text-slate-700'>€ {value}</p>
      <p className='text-xs mt-2 text-center cursor-pointer hover:underline'>+ Detalhes</p>
    </CardContent>
  </Card>
  )
}