import { DatePicker } from '@/components/DatePicker'
import { getPaymentMethods } from '@/utils/api'
import { RiArrowLeftDoubleLine } from 'react-icons/ri'

export default async function Purchases() {
  const payments = await getPaymentMethods()
  console.log(payments)
  return (
    <>
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
              Compras
            </h2>
          </div>
          <hr className=" divide-slate-400" />
        </div>

        <button className="my-4 rounded bg-red-500  px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600">
          Nova Compra
        </button>
        <DatePicker />
      </main>
    </>
  )
}