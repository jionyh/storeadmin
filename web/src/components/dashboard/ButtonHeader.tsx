'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

type Props = {
  srvFn: (e: string) => void
}

export const ButtonsHeader = ({ srvFn }: Props) => {
  const ActiveButtonStyle =
    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
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
