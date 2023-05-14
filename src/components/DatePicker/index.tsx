import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Fade } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const DatePicker = () => {
  const [dia, setDia] = useState(dayjs())
  const [semana, setSemana] = useState<string[]>([])
  const [active, setActive] = useState(dayjs().format('DD/MM'))

  let mes = dia.format('MM')

  // função para adicionar e subtrair conforme navega pelas datas
  const handleLeftArrow = () => {
    let day = dia.subtract(7, 'day').toDate()
    setDia(dayjs(day))
  }
  const handleRightArrow = () => {
    let day = dia.add(7, 'day').toDate()
    setDia(dayjs(day))
  }

  //função para adicionar as datas da Semana no array que é exibido na tela
  const addDayToArray = () => {
    let week = []
    //loop para adicionar os 3 dias anteriores ao atual
    for (let j = 3; j >= 1; j--) {
      let day = dia.subtract(j, 'day').format('DD')
      week.push(day)
    }
    //adicionando o dia atual ao array
    week.push(dia.format('DD'))
    //loop para adicionar os 3 proximos dias ao array
    for (let i = 1; i <= 3; i++) {
      let day = dia.add(i, 'day').format('DD')
      week.push(day)
    }
    setSemana(week)
  }

  useEffect(() => {
    addDayToArray()
  }, [dia])

  return (
    <div className='flex items-center justify-center'>
      <button
        className=''
        onClick={handleLeftArrow}>
        <ChevronLeftIcon
          h={7}
          w={7}
        />
      </button>
      {semana.map((item) => (
        <button
          key={item + Math.random()}
          className={`p-1.5 ${active == item + '/' + mes ? 'bg-red-700 scale-105' : ' bg-red-500'} hover:bg-red-300 text-white font-bold`}
          onClick={() => setActive(`${item}/${mes}`)}>
          {item}/{mes}
        </button>
      ))}
      <button
        onClick={handleRightArrow}
        className=' '>
        <ChevronRightIcon
          h={7}
          w={7}
        />
      </button>
    </div>
  )
}
