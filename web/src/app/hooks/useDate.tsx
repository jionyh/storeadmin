import { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'

// Custom hook for managing date and week generation
const useDate = () => {
  dayjs.locale('pt-br')
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [weekDates, setWeekDates] = useState<Dayjs[]>([])

  const daysBeforeAndAfter = 3

  const generateWeekDates = (date: Dayjs): Array<Dayjs> => {
    const week = []
    for (let i = -daysBeforeAndAfter; i <= daysBeforeAndAfter; i++) {
      const day = date.add(i, 'day')
      week.push(day)
    }
    return week
  }

  const handleLeftArrow = () => {
    const newDate = selectedDate.subtract(7, 'day')
    setSelectedDate(newDate)
  }

  const handleRightArrow = () => {
    const newDate = selectedDate.add(7, 'day')
    setSelectedDate(newDate)
  }

  useEffect(() => {
    const generatedWeek = generateWeekDates(selectedDate)
    setWeekDates(generatedWeek)
  }, [selectedDate])

  return { selectedDate, weekDates, handleLeftArrow, handleRightArrow }
}

export default useDate
