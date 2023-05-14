import { DatePicker } from '@/components/DatePicker'
import { Layout } from '@/layout/Layout'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'

import { Compras as data } from '@/utils/data'

const Compras = () => {
  return (
    <Layout title='Compras'>
      <>
        <DatePicker />
        <div className='flex justify-center mt-5'>
          <TableContainer className='w-full border'>
            <Table className=''>
              {data.data.map((item, index) => (
                <>
                  <Thead className='bg-slate-300 w-full'>
                    <Tr>
                      <Th>{item.cat}</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  {item.products.map((item, index) => (
                    <Tbody key={index}>
                      <Tr className=''>
                        <Td>{item.name}</Td>
                        <Td>€ {item.value}</Td>
                      </Tr>
                    </Tbody>
                  ))}
                </>
              ))}
            </Table>
          </TableContainer>
        </div>
      </>
    </Layout>
  )
}

export default Compras
