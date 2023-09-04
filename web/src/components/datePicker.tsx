'use client'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useEffect, useState } from 'react'

type Props = {
  clickFn: (e: string) => void
  day: any
  data: any
}

export const DatePicker = ({ clickFn, day, data }: Props) => {
  const [dia, setDia] = useState(dayjs(day))
  const [semana, setSemana] = useState<string[]>([])
  const [active, setActive] = useState(dayjs().format('DD/MM'))

  const mes = dia.format('MM')

  // função para adicionar e subtrair conforme navega pelas datas
  const handleLeftArrow = () => {
    const day = dia.subtract(7, 'day').toDate()
    setDia(dayjs(day))
  }
  const handleRightArrow = () => {
    const day = dia.add(7, 'day').toDate()
    setDia(dayjs(day))
  }

  // função para adicionar as datas da Semana no array que é exibido na tela
  const addDayToArray = () => {
    const week = []
    // loop para adicionar os 3 dias anteriores ao atual
    for (let j = 3; j >= 1; j--) {
      const day = dia.subtract(j, 'day').format('DD')
      week.push(day)
    }
    // adicionando o dia atual ao array
    week.push(dia.format('DD'))
    // loop para adicionar os 3 proximos dias ao array
    for (let i = 1; i <= 3; i++) {
      const day = dia.add(i, 'day').format('DD')
      week.push(day)
    }
    setSemana(week)
  }

  const handleButton = (item: string, mes: string) => {
    setActive(`${item}/${mes}`)
    clickFn(dayjs(`${dia.format('YYYY')}-${mes}-${item}`).format())
  }

  const getWeekDay = (day: string, month: string) => {
    dayjs.locale('pt-br')
    const year = dia.format('YYYY')
    return dayjs(`${year}-${month}-${day}`).format('ddd')
  }

  useEffect(() => {
    addDayToArray()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dia])
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <div className="flex w-full items-center justify-center px-1">
        <button className="" onClick={handleLeftArrow}>
          <AiOutlineCaretLeft size={30} />
        </button>
        <div className=" grid h-10 w-full grid-cols-7 gap-0.5">
          {semana.map((item, i) => (
            <div
              key={i}
              className={`${
                active === item + '/' + mes ? 'bg-red-500 text-white' : ''
              } flex h-full w-full cursor-pointer flex-col items-center justify-center border p-0.5 text-xs leading-tight text-black`}
              onClick={() => handleButton(item, mes)}
            >
              <div className="">{getWeekDay(item, mes).toUpperCase()}</div>
              <button>
                {item}/{mes}
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleRightArrow}>
          <AiOutlineCaretRight size={30} />
        </button>
      </div>

      {data && data.map((item) => <div key={item.id}>{item.id}</div>)}
    </>
  )
}
