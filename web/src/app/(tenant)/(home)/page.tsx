import { Dashboard } from '@/components/dashboard/Dashboard'

export default async function Home() {
  const purchases = null

  return (
    <div>
      <Dashboard initialData={purchases} />
    </div>
  )
}
