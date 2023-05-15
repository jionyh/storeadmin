import { Category } from '@/types/CategoryType'
import { Box, Input, Stack, Select, NumberInput, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
  select: Category[]
  selectType: string
  qtd: string
  setQtd: (e: string) => void
  valor: string
  setValor: (chave: string, e: string) => void
}

export const ComprasInput = ({ select, selectType, qtd, setQtd, valor, setValor }: Props) => {
  const handleQtd = (e: string) => {
    setQtd(e)
  }

  const handleValor = (e: string) => {
    setValor(selectType, e)
  }

  return (
    <>
      <Box className='p-4 grid grid-cols-2 gap-2'>
        <div className='col-span-2'>
          <Select
            className='col-span-2'
            placeholder={`Selecione o ${selectType}`}>
            {select.map((item) => (
              <>
                <option
                  key={item.value}
                  value={item.value}>
                  {item.name}
                </option>
              </>
            ))}
          </Select>
        </div>
        <Input
          placeholder='Quantidade'
          value={qtd}
          onChange={(e) => handleQtd(e.target.value)}
        />
        <Input
          placeholder='Digite o valor'
          value={valor}
          onChange={(e) => handleValor(e.target.value)}
        />
        <hr className='col-span-2 mt-4' />
      </Box>
    </>
  )
}
