import { CashflowChart } from '@/components/dashboard/CashFlowChart'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { cashflowReport } from '@/utils/api/reports'
import { cookies } from 'next/headers'

export default async function Home() {
  const authToken = cookies().get('authToken')?.value
  const data = await cashflowReport(authToken)
  return (
    <div>
      <Dashboard>
        <CashflowChart data={data.cashflow} />
      </Dashboard>
    </div>
  )
}
