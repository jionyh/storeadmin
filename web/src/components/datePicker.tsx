'use client'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { useState } from 'react'
import useDate from '@/app/hooks/useDate'

export const DatePicker = () => {
  const { handleLeftArrow, handleRightArrow, selectedDate, weekDates } =
    useDate()

  const [activeDay, setActiveDay] = useState(dayjs(selectedDate))

  const handleButton = (item: Dayjs) => {
    setActiveDay(item)
    // clickFn(dayjs(`${dia.format('YYYY')}-${mes}-${item}`).format())
  }

  const getWeekDay = (day: Dayjs) => {
    dayjs.locale('pt-br')
    return dayjs(day).format('ddd')
  }

  const getDayAndMonth = (item: Dayjs) => {
    dayjs.locale('pt-br')
    const formatedDay = dayjs(item).format('DD/MM')
    return formatedDay
  }

  return (
    <>
      <div className="flex w-full items-center justify-center px-1">
        <button className="" onClick={handleLeftArrow}>
          <AiOutlineCaretLeft size={30} />
        </button>
        <div className=" grid h-10 w-full grid-cols-7 gap-0.5">
          {weekDates.map((item, i) => (
            <div
              key={i}
              className={`${
                activeDay.isSame(item, 'day') ? 'bg-red-500 text-white' : ''
              } flex h-full w-full cursor-pointer flex-col items-center justify-center border p-0.5 text-xs leading-tight text-black`}
              onClick={() => handleButton(item)}
            >
              <div className="">{getWeekDay(item).toUpperCase()}</div>
              <button>{getDayAndMonth(item)}</button>
            </div>
          ))}
        </div>
        <button onClick={handleRightArrow}>
          <AiOutlineCaretRight size={30} />
        </button>
      </div>
    </>
  )
}
