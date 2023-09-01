import Header from '@/components/header/header'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiArrowLeftDoubleLine } from 'react-icons/ri'

export default async function Home({ params }: { params: { tenant: string } }) {
  return (
    <div className="m-auto flex min-h-screen w-[425px] min-w-[375px] flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Main Header - Title bar */}
        <div>
          <div className="mt-3 flex h-11 items-center justify-center p-4">
            <span className="">
              <button className="cursor-pointer">
                <RiArrowLeftDoubleLine size={30} className="fill-slate-600" />
              </button>
            </span>
            <h2 className="-ml-4 w-full text-center text-xl font-bold text-slate-600">
              VENDAS
            </h2>
          </div>
          <hr className=" divide-slate-400" />
        </div>

        <button className="rounded bg-red-500  px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600">
          Nova Venda
        </button>
      </main>
    </div>
  )
}
