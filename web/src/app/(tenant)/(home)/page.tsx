import { Dashboard } from '@/components/dashboard/Dashboard'
import { getPurchases } from '@/utils/api'

export default async function Home() {
  let purchases = null

  return (
    <div>
      <Dashboard initialData={purchases} />
    </div>
  )
}
