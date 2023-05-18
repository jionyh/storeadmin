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
} from '@chakra-ui/react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PurchaseList } from '@/types/PurchaseType'
import { Empty } from '@/components/EmptyPurchases'
import { LoadingSpinner } from '@/components/LoadingSpinner'

const Compras = () => {
  const [date, setDate] = useState(dayjs().format())
  const [list, setList] = useState<PurchaseList>()
  const [loading, setLoading] = useState(true)

  const fetchDay = async () => {
    setLoading(true)
    const res = await axios.get(`https://localhost:4001/compras?date=${date}`)
    if (res) {
      setList(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDay()
  }, [date])

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
          <TableContainer className="w-full border">
            <Table className="">
              {loading && <LoadingSpinner />}
              {!loading && list!.data.length === 0 && <Empty title="compras" />}
              {!loading && list && list.data.length > 0 && (
                <>
                  {list.data.map((item, index) => (
                    <>
                      <Thead className="w-full bg-slate-300" key={index}>
                        <Tr>
                          <Th>{item.name}</Th>
                          <Th></Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      {item.produto.map((item, index) => (
                        <Tbody key={index}>
                          <Tr className="">
                            <Td>{item.name}</Td>
                            <Td>
                              {item.quantity} {item.unit}
                            </Td>
                            <Td>€ {item.valor.toFixed(2)}</Td>
                          </Tr>
                        </Tbody>
                      ))}
                    </>
                  ))}
                  <Tfoot background="red.200" fontWeight="bold">
                    <Td>Total</Td>
                    <Td></Td>
                    <Td>€ {list.total.toFixed(2)}</Td>
                  </Tfoot>
                </>
              )}
            </Table>
          </TableContainer>
        </div>
      </>
    </Layout>
  )
}

export default Compras
