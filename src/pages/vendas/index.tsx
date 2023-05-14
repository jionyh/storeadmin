import { DatePicker } from '@/components/DatePicker'
import { Layout } from '@/layout/Layout'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'

import { Vendas as data } from '@/utils/data'

const Vendas = () => {
  return (
    <Layout title='Vendas'>
      <>
        <DatePicker />
        <div className='flex justify-center mt-5'>
          <TableContainer className='w-full border'>
            <Table>
              <Thead className='bg-slate-300 w-full'>
                <Tr>
                  <Th>Vendas do dia {data.day}</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              {data.data.map((item, index) => (
                <Tbody key={index}>
                  <Tr className=''>
                    <Td>{item.name}</Td>
                    <Td>€ {item.value}</Td>
                  </Tr>
                </Tbody>
              ))}
              <Tfoot className='bg-slate-300 w-full'>
                <Tr>
                  <Th className='text-right'>Total</Th>
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
