import { DatePicker } from '@/components/DatePicker'
import axios from 'axios'
import dayjs from 'dayjs'
import { revalidatePath } from 'next/cache'
import { RiArrowLeftDoubleLine } from 'react-icons/ri'

export default async function Home({ params }: { params: { tenant: string } }) {
  const data = {
    day: dayjs().format(),
    actualDay: null,
  }

  const fetc = async (date = data.day) => {
    'use server'
    const res = await axios.get(
      `https://api.jiony.dev/compras?date=${dayjs(date).format('YYYY-MM-DD')}`,
    )
    if (res) {
      console.log(res.data.data)
      data.purchase = res.data.data
      revalidatePath(`/${params.tenant}`)
    }
    console.log('não há compras')
  }

  const logFn = async () => {
    'use server'
    console.log('a nova day é' + data.actualDay)
  }

  const clickFn = async (dayReturn: any) => {
    'use server'
    console.log({ newData: dayReturn })
    data.actualDay = dayReturn
    fetc(dayReturn)
  }

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
              VENDAS
            </h2>
          </div>
          <hr className=" divide-slate-400" />
        </div>

        <button className="my-4 rounded bg-red-500  px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600">
          Nova Venda
        </button>

        <DatePicker day={data.day} clickFn={clickFn} data={data.purchase} />
      </main>
    </>
  )
}
