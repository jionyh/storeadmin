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
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PurchaseList } from '@/types/PurchaseType'
import { Empty } from '@/components/EmptyPurchases'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Alert } from '@/components/Alert'
import { Loader } from '@/components/Loader'

const Compras = () => {
  const toast = useToast()
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [list, setList] = useState<PurchaseList>()
  const [delProduct, setDelProduct] = useState('')
  const alert = useDisclosure()
  const modal = useDisclosure()
  const [loading, setLoading] = useState(true)

  const fetchDay = async () => {
    setLoading(true)
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/compras?date=${date}`,
    )
    if (res) {
      setList(res.data)
    }
    setLoading(false)
  }

  const handleDeleteProduct = (id: number) => {
    setDelProduct(id.toString())
    alert.onOpen()
  }

  const deleteProduct = async () => {
    alert.onClose()
    modal.onOpen()
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_PATH}/compras/${delProduct}`,
      )
      modal.onClose()
      toast({
        title: 'Produto Deletado!',
        status: 'success',
        isClosable: true,
      })
      fetchDay()
      return
    } catch (e) {
      modal.onClose()
      toast({
        title: 'Erro ao deletar o Produto!',
        status: 'error',
        isClosable: true,
      })
      console.log(e)
    }
  }

  useEffect(() => {
    fetchDay()
  }, [date])

  useEffect(() => {
    fetchDay()
  }, [])

  return (
    <Layout title="Compras">
      <>
        <div className="m-5 flex items-center justify-end">
          <Link href="/compras/add">
            <Button size={'sm'} colorScheme="red">
              Nova Compra
            </Button>
          </Link>
        </div>
        <DatePicker clickFn={setDate} />
        <div className="mt-5 flex justify-center">
          {loading && <LoadingSpinner />}
          {!loading && list!.data.length === 0 && (
            <div className="mt-20">
              <Empty title="compras" />
            </div>
          )}

          {!loading && list && list.data.length > 0 && (
            <>
              <TableContainer overflowX="hidden">
                <Table colorScheme="linkedin" size={'md'}>
                  {list.data.map((item, index) => (
                    <React.Fragment key={index}>
                      <Thead key={index}>
                        <Tr className="bg-blue-100">
                          <Th>{item.name}</Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      {item.produto.map((item, index) => (
                        <Tbody key={index}>
                          <Tr>
                            <Td>{item.name}</Td>
                            <Td>
                              {item.quantity} {item.unit}
                            </Td>
                            <Td>€ {item.valor.toFixed(2)}</Td>
                            <Td textAlign="right">
                              <CloseIcon
                                color="red.500"
                                boxSize={3}
                                cursor="pointer"
                                onClick={() => handleDeleteProduct(item.id)}
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
                      <Th></Th>
                      <Th>€ {list.total}</Th>
                      <Th></Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
        <Alert obj={alert} title="Deletar Produto?" fn={deleteProduct} />
        <Loader obj={modal} />
      </>
    </Layout>
  )
}

export default Compras
