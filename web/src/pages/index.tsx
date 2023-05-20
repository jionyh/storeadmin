import { Alert } from '@/components/Alert'
import { Loader } from '@/components/Loader'
import { Layout } from '@/layout/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      <h1>
        <Loader />
        <Alert />
      </h1>
    </Layout>
  )
}
