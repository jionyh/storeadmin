import { Loader } from '@/components/Loader'
import { CashflowChart } from '@/components/dashboard/CashFlowChart'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { cashflowReport } from '@/utils/api/reports'

export default async function Home() {
  const data = await cashflowReport()

  return (
    <div>
      <Dashboard>
        {data.cashflow ? (
          <CashflowChart data={data.cashflow} />
        ) : (
          <Loader visible spin />
        )}
      </Dashboard>
    </div>
  )
}
