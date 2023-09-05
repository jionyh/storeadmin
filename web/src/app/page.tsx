import Link from 'next/link'

export default function Home() {
  return (
    <main className="m-auto h-screen w-[425px] min-w-[375px] border-2 border-red-500">
      <h1 className="w-full border-2 border-green-700">oi</h1>
      <Link href={'/juju'}>
        <button className="m-2 w-4/12 border bg-blue-500 p-2 text-white">
          Clique aqui
        </button>
      </Link>
    </main>
  )
}
