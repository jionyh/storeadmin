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
  list,
  Tfoot,
} from '@chakra-ui/react'
import { Compras as data } from '@/utils/data'
import axios, { Axios } from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PurchaseList } from '@/types/PurchaseType'

const Compras = () => {
  const [date, setDate] = useState(dayjs().format())
  const [list, setList] = useState<PurchaseList>({})
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

  useEffect(() => {
    console.log(list)
  }, [list])

  return (
    <Layout title="Compras">
      <>
        <div className="mx-5 flex items-center justify-between">
          <div></div>
          <Link href="/compras/add">
            <button className="mb-2 cursor-pointer rounded-lg bg-red-500 p-2 text-base text-white hover:bg-red-600">
              Nova Compra
            </button>
          </Link>
        </div>
        <DatePicker clickFn={setDate} />
        <div className="mt-5 flex justify-center">
          <TableContainer className="w-full border">
            <Table className="">
              {loading && <div>Carregando dados...</div>}
              {!loading && list.data.length > 0 && (
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
                            <Td>€ {item.valor}</Td>
                          </Tr>
                        </Tbody>
                      ))}
                    </>
                  ))}
                  <Tfoot background="red.300" fontWeight="bold">
                    <Td>Total</Td>
                    <Td></Td>
                    <Td>€ {list.total}</Td>
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
