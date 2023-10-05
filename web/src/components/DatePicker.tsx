'use client'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import React, { useEffect, useState } from 'react'
import useDate from '@/hooks/useDate'
import { useSwipeable, SwipeEventData } from 'react-swipeable'

type ParamTypes = {
  setDate: (date: string) => void
}

export const DatePicker = ({ setDate }: ParamTypes) => {
  const {
    handleLeftArrow,
    handleRightArrow,
    getDayAndMonth,
    getWeekDay,
    selectedDate,
    weekDates,
  } = useDate()
  const [activeDay, setActiveDay] = useState(dayjs(selectedDate))
  const [isFading, setIsFading] = useState(false)

  const handlers = useSwipeable({
    onSwiped: (eventData) => handleSwipe(eventData),
    trackMouse: true,
  })

  const handleButton = (item: Dayjs) => {
    setActiveDay(item)
  }

  const handleSwipe = (eventData: SwipeEventData) => {
    setIsFading(true)
    if (eventData.dir === 'Right') {
      handleLeftArrow()
    } else {
      handleRightArrow()
    }
    setTimeout(() => {
      setIsFading(false)
    }, 300)
  }

  useEffect(() => {
    const day = dayjs(activeDay).format('YYYY-MM-DD')
    setDate(day)
  }, [activeDay, setDate])

  return (
    <div className={`flex w-full items-center justify-center px-1`}>
      <button className="" onClick={handleLeftArrow}>
        <AiOutlineCaretLeft size={30} />
      </button>
      <div
        {...handlers}
        className={`grid w-full select-none grid-cols-7 gap-0.5 ${
          isFading ? 'animate-slideLeft' : ''
        }`}
      >
        {weekDates.map((item, i) => (
          <div
            key={i}
            className={`${
              activeDay.isSame(item, 'day')
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/5'
            }  flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border p-0.5 text-xs leading-tight`}
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
  )
}
