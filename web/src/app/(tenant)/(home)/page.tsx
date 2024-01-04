import { CashflowChart } from '@/components/dashboard/CashFlowChart'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { cashflowReport } from '@/utils/api/reports'

export default async function Home() {
  const data = await cashflowReport()
  return (
    <div>
      <Dashboard>
        <CashflowChart data={data.cashflow} />
      </Dashboard>
    </div>
  )
}
