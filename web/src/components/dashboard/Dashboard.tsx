import React from 'react'
import { ButtonsHeader } from './ButtonHeader'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'

export const Dashboard = () => {
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
          <ButtonsHeader />
        </div>
        <div className="flex w-full flex-1 items-center justify-center">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <p>€ 274.00</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <p>€ 274.00</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
