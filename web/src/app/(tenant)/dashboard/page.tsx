import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { CashflowChart } from '@/components/dashboard/CashFlowChart'
import { DashboardComponent } from '@/components/dashboard/Dashboard'
import { baseUrl } from '@/utils/fetchOptions'
import { getServerSession } from 'next-auth'

export default async function Dashboard() {
  const token = await getServerSession(authOptions)
  const result = await fetch(`${baseUrl}/cashflow`, {
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `authToken=${token?.user.token}`,
    },
  })

  const data = await result.json()

  return (
    <div>
      <DashboardComponent>
        <CashflowChart data={data.cashflow} />
      </DashboardComponent>
    </div>
  )
}
