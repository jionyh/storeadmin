'use client'
import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useState } from 'react'
import { RiArrowLeftDoubleLine } from 'react-icons/ri'

export default function Purchases() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))

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

        <Link
          className="flex w-full items-center justify-end"
          href="/compras/add"
        >
          <Button>Nova Compra</Button>
        </Link>
        <DatePicker setDate={setDate} />
        <div className="grid grid-cols-3 font-bold text-slate-600">
          <div className="h-fit w-fit bg-background ">background</div>
          <div className="h-fit w-fit bg-foreground">foreground</div>
          <div className="h-fit w-fit bg-primary">primary</div>
          <div className="h-fit w-fit bg-primary-foreground">primary-Fore</div>
          <div className="h-fit w-fit bg-secondary">secondary</div>
          <div className="h-fit w-fit bg-secondary-foreground">
            secondary-fore
          </div>
          <div className="h-fit w-fit bg-muted-foreground">muted</div>
          <div className="h-fit w-fit bg-muted">muted-fore</div>
          <div className="h-fit w-fit bg-accent">accent</div>
          <div className="h-fit w-fit bg-accent-foreground">accent-fore</div>
          <div className="h-fit w-fit bg-destructive">destructive</div>
          <div className="h-fit w-fit bg-destructive-foreground">
            destructive-fore
          </div>
        </div>
      </main>
    </>
  )
}
