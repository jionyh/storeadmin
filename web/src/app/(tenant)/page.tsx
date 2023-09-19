import { Dashboard } from '@/components/dashboard/Dashboard'
import { getPurchases } from '@/utils/api'

export default async function Home() {
  let purchases = null
  const initialData = await getPurchases({ period: 'week' })
  if (initialData.success) {
    purchases = initialData.purchases
  }

  return (
    <div>
      <Dashboard initialData={purchases} />
    </div>
  )
}
