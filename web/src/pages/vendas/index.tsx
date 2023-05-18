import { DatePicker } from '@/components/DatePicker'
import { Layout } from '@/layout/Layout'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useState } from 'react'
import dayjs from 'dayjs'

const Vendas = () => {
  const [date, setDate] = useState(dayjs().format())
  const data = {
    day: '14/05',
    total: 109 + 30 + 60 + 49,
    data: [
      { name: 'cartao', value: '109,00' },
      { name: 'dinheiro', value: '30,00' },
      { name: 'delivery', value: '60,00' },
      { name: 'outros', value: '49,00' },
    ],
  }
  return (
    <Layout title="Vendas">
      <>
        <DatePicker clickFn={setDate} />
        <div className="mt-5 flex justify-center">
          <TableContainer className="w-full border">
            <Table>
              <Thead className="w-full bg-slate-300">
                <Tr>
                  <Th>Vendas do dia {data.day}</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              {data.data.map((item, index) => (
                <Tbody key={index}>
                  <Tr className="">
                    <Td>{item.name}</Td>
                    <Td>€ {item.value}</Td>
                  </Tr>
                </Tbody>
              ))}
              <Tfoot className="w-full bg-slate-300">
                <Tr>
                  <Th className="text-right">Total</Th>
                  <Th>€ {data.total.toString()},00</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </div>
      </>
    </Layout>
  )
}

export default Vendas
