/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker } from '@/components/DatePicker'
import { Layout } from '@/layout/Layout'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
  Button,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { Empty } from '@/components/EmptyPurchases'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Alert } from '@/components/Alert'
import { Loader } from '@/components/Loader'
import { ModalVendas } from '../../components/VendasModal'
import { api } from '@/libs/axios'
import { SaleInfoModal, SalesList } from '@/types/SaleType'

const Vendas = () => {
  dayjs.locale('pt-br')
  const toast = useToast()
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [list, setList] = useState<SalesList>()
  const [delProduct, setDelProduct] = useState('')
  const [modalInfo, setModalInfo] = useState<SaleInfoModal>({
    id: 0,
    value: '',
    payment: '',
  })
  const alert = useDisclosure()
  const loader = useDisclosure()
  const modal = useDisclosure()
  const [loading, setLoading] = useState(true)

  const fetchDay = async () => {
    setLoading(true)
    const res = await api.get(
      `/vendas?date=${dayjs(date).format('YYYY-MM-DD')}`,
    )
    if (res) {
      setList(res.data)
    }
    setLoading(false)
  }

  const handleDeleteProduct = (id: string) => {
    setDelProduct(id)
    alert.onOpen()
  }

  const deleteProduct = async () => {
    alert.onClose()
    loader.onOpen()
    try {
      await api.delete(`/vendas/${delProduct}`)
      loader.onClose()
      toast({
        title: 'Produto Deletado!',
        status: 'success',
        isClosable: true,
      })
      fetchDay()
      return
    } catch (e) {
      loader.onClose()
      toast({
        title: 'Erro ao deletar o Produto!',
        status: 'error',
        isClosable: true,
      })
    }
  }

  const openModal = (data: any) => {
    console.log(data)
    setModalInfo(data)
    modal.onOpen()
  }

  useEffect(() => {
    fetchDay()
  }, [date])

  useEffect(() => {
    fetchDay()
  }, [])

  return (
    <Layout title="Vendas">
      <>
        <div className="mb-5 mr-5 flex items-center justify-end">
          <Link href="/vendas/add">
            <Button size={'sm'} colorScheme="red">
              Nova Venda
            </Button>
          </Link>
        </div>
        <DatePicker clickFn={setDate} />
        <div className="mt-5 ">
          {loading && <LoadingSpinner />}
          {!loading && list!.data.length === 0 && (
            <div className="mt-20">
              <Empty title="vendas" />
            </div>
          )}

          {!loading && list && list.data.length > 0 && (
            <>
              <TableContainer>
                <Table colorScheme="linkedin" size={'md'}>
                  {list.data.map((item, index) => (
                    <React.Fragment key={index}>
                      <Thead>
                        <Tr className="bg-blue-100">
                          <Th>{dayjs(item.day).format('DD [de] MMMM')}</Th>
                          <Th></Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      {item.data.map((data, index) => (
                        <Tbody key={index}>
                          <Tr>
                            <Td onClick={() => openModal(data)} maxWidth="90px">
                              <Text>{data.payment}</Text>
                            </Td>
                            <Td
                              textAlign="end"
                              onClick={() => openModal(data)}
                              maxWidth="90px"
                            >
                              € {data.value}
                            </Td>
                            <Td width="50px">
                              <CloseIcon
                                color="red.500"
                                boxSize={3}
                                cursor="pointer"
                                onClick={() => handleDeleteProduct(data.id)}
                              />
                            </Td>
                          </Tr>
                        </Tbody>
                      ))}
                    </React.Fragment>
                  ))}
                  <Tfoot background="red.200" fontWeight="bold">
                    <Tr>
                      <Th>Total</Th>
                      <Th textAlign="end">€ {list.total}</Th>
                      <Th></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
        <Alert obj={alert} title="Deletar venda?" fn={deleteProduct} />
        <Loader obj={loader} />
        <ModalVendas obj={modal} info={modalInfo} callback={fetchDay} />
      </>
    </Layout>
  )
}

export default Vendas
