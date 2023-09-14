'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  srvFn: (e: string) => void
}

export const ButtonsHeader = ({ srvFn }: Props) => {
  const ActiveButtonStyle =
    'border-red-500 font-bold text-red-500 hover:text-red-400'
  const InactiveButtonStyle = ''
  const [activeButton, setActiveButton] = useState('week')
  const buttonsNames = [
    { id: 'day', name: 'Diário' },
    { id: 'week', name: 'Semanal' },
    { id: 'month', name: 'Mensal' },
  ]

  const handleButton = (id: string) => {
    setActiveButton(id)
    srvFn(id)
  }
  return (
    <>
      {buttonsNames.map((buttonName) => (
        <Button
          key={buttonName.id}
          onClick={() => handleButton(buttonName.id)}
          className={`${
            activeButton === buttonName.id
              ? ActiveButtonStyle
              : InactiveButtonStyle
          } rounded-sm`}
          variant={'outline'}
          size={'rounded'}
        >
          {buttonName.name}
        </Button>
      ))}
    </>
  )
}
