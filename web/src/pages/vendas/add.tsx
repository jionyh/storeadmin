/* eslint-disable no-prototype-builtins */
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Layout } from '@/layout/Layout'
import { api } from '@/libs/axios'
import { Payments, SaleListPost } from '@/types/SaleType'
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { VendasInput } from '@/components/VendasInput'
import { Loader } from '@/components/Loader'
import { Alert } from '@/components/Alert'

const AdicionarVendas = () => {
  const toast = useToast()
  const router = useRouter()
  const loader = useDisclosure()
  const alert = useDisclosure()
  const listInitialState = {
    value: '',
    paymentId: '',
  }

  const [paymentOptions, setPaymentOptions] = useState<Payments[]>()

  /* State para guardar o array que vai para o backend */
  const [list, setList] = useState<SaleListPost[]>([listInitialState])

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(undefined)
  const [disabled, setdisabled] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/payments`)
      setPaymentOptions(res.data.data)
      setLoading(false)
      return
    } catch (e) {
      setError('Falha ao carregar!')
      setLoading(false)
    }
  }

  const handleAdd = () => {
    alert.onOpen()
  }

  const fetchPostCreateSale = async () => {
    alert.onClose()
    loader.onOpen()
    setdisabled(true)

    try {
      const res = await api.post(`/vendas`, list)

      if (res.data.success) {
        router.replace('/vendas')
        setdisabled(false)
        toast({
          title: 'Venda Adiciona com sucesso!',
          status: 'success',
          isClosable: true,
        })
        loader.onClose()
        return
      }
    } catch (e) {
      toast({
        title: 'Erro ao adicionar a venda. Tenta novamente!',
        status: 'error',
        isClosable: true,
      })
      loader.onClose()
      setdisabled(false)
    }
  }

  /* Função para lidar com a adição no array de dados que vai para o backend */
  const handleSaleListAdd = (e: any, index: number) => {
    const { name, value } = e.target
    const plist: any = [...list]
    plist[index][name] = value.replace(',', '.')
    setList(plist)
  }

  /* Função para adicionar novos campos ao form */
  const handleAddInputs = () => {
    setList([...list, listInitialState])
  }

  const handleRemoveInputs = (i: any) => {
    if (i !== 0) {
      const newFormValues = [...list]
      newFormValues.splice(i, 1)
      setList(newFormValues)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout title="Adicionar Vendas">
      <>
        {error && <div>Não foi possível atender a sua solicitação</div>}
        {loading && <LoadingSpinner />}
        {!loading && !error && (
          <>
            {!loading && paymentOptions !== undefined && (
              <>
                {list.map((list, i) => (
                  <React.Fragment key={i}>
                    {i !== 0 && (
                      <div className="flex justify-end pr-4">
                        <CloseIcon
                          cursor="pointer"
                          color="red.500"
                          boxSize={3}
                          onClick={() => handleRemoveInputs(i)}
                        />
                      </div>
                    )}
                    <VendasInput
                      key={i}
                      index={i}
                      state={list}
                      handleAdd={handleSaleListAdd}
                      paymentOptions={paymentOptions}
                      disabled={disabled}
                    />
                  </React.Fragment>
                ))}

                <Flex mr="12px" justify="end" gap="8px">
                  <Button
                    size={'sm'}
                    isDisabled={disabled}
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={handleAddInputs}
                  >
                    Novo Campo
                  </Button>
                  <Button
                    size={'sm'}
                    isLoading={disabled}
                    loadingText="Salvando dados!"
                    leftIcon={<CheckIcon />}
                    colorScheme="green"
                    onClick={handleAdd}
                  >
                    Salvar
                  </Button>
                </Flex>
              </>
            )}
          </>
        )}
        <Alert
          obj={alert}
          title="Adicionar nova venda?"
          fn={fetchPostCreateSale}
        />
        <Loader obj={loader} />
      </>
    </Layout>
  )
}

export default AdicionarVendas
