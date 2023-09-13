'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

export const ButtonsHeader = () => {
  const ActiveButtonStyle = 'border-red-700 font-bold text-red-700'
  const InactiveButtonStyle = ''
  const [activeButton, setActiveButton] = useState('week')
  const buttonsNames = [
    { id: 'day', name: 'Diário' },
    { id: 'week', name: 'Semanal' },
    { id: 'month', name: 'Mensal' },
  ]
  return (
    <>
      {buttonsNames.map((buttonName) => (
        <Button
          key={buttonName.id}
          onClick={() => setActiveButton(buttonName.id)}
          className={`${
            activeButton === buttonName.id
              ? ActiveButtonStyle
              : InactiveButtonStyle
          }`}
          variant={'outline'}
          size={'rounded'}
        >
          {buttonName.name}
        </Button>
      ))}
    </>
  )
}
