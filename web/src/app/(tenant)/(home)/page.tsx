import { Dashboard } from '@/components/dashboard/Dashboard'
import { getPurchases } from '@/utils/api'
import { getLogin } from '@/utils/api/auth'
import {cookies} from 'next/headers'

export default async function Home() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}
