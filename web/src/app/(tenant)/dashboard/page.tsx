import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { CashflowChart } from '@/components/dashboard/CashFlowChart'
import { DashboardComponent } from '@/components/dashboard/Dashboard'
import { getServerSession } from 'next-auth'
import { Card, CardContent } from '@/components/ui/card'

export default async function Dashboard() {
  const token = await getServerSession(authOptions)
  const result = await fetch(`${process.env.API_URL}/reports/cashflow`, {
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `authToken=${token?.user.token}`,
    },
  })

  const data = await result.json()

  return (
    <div className="p-5">
      <div className="flex flex-col items-center justify-center gap-2 text-sm">
        <Card className="w-full flex-1">
          <CardContent className="m-2 p-0">
            <CashflowChart data={data.cashflow} />
          </CardContent>
        </Card>
      </div>
      <DashboardComponent />
    </div>
  )
}
