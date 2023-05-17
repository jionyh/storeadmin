import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

type Props = {
  clickFn: (e: string) => void
}

export const DatePicker = ({ clickFn }: Props) => {
  const [dia, setDia] = useState(dayjs())
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

  useEffect(() => {
    addDayToArray()
  }, [dia])

  return (
    <div className="flex items-center justify-center">
      <button className="" onClick={handleLeftArrow}>
        <ChevronLeftIcon h={7} w={7} />
      </button>
      {semana.map((item) => (
        <button
          key={item + Math.random()}
          className={`p-1.5 ${
            active === item + '/' + mes ? 'scale-105 bg-red-700' : ' bg-red-500'
          } font-bold text-white hover:bg-red-300`}
          onClick={() => handleButton(item, mes)}
        >
          {item}/{mes}
        </button>
      ))}
      <button onClick={handleRightArrow} className=" ">
        <ChevronRightIcon h={7} w={7} />
      </button>
    </div>
  )
}
