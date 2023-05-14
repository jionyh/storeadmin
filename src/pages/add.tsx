import { ComprasInput } from '@/components/ComprasInput'
import Header from '@/components/Header'

import { Box, Input, Stack, Select, NumberInput, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CategoryData } from '@/utils/data'

import { Layout } from '@/layout/Layout'

const Add = () => {
  const [valor, setValor] = useState<any>({
    peixes: '10',
    legumes: '20',
  })
  const [val, setVal] = useState('')
  const [quantidade, setQuantidade] = useState('')

  const handleSetValor = (chave: string, e: string) => {
    let novoValor = { ...valor, [chave]: e }
    setValor(novoValor)
  }

  return (
    <Layout title='Compras'>
      <>
        {CategoryData.map((item) => (
          <ComprasInput
            key={`${Math.random() * Math.random()}`}
            select={item.sub}
            selectType={item.name}
            qtd={quantidade}
            setQtd={setQuantidade}
            valor={valor[item.name]}
            setValor={handleSetValor}
          />
        ))}
      </>
    </Layout>
  )
}

export default Add
