import { CategoryType } from '@/types/UnitType'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Tooltip,
  ButtonGroup,
  Flex,
  Button,
} from '@chakra-ui/react'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { Empty } from '../EmptyPurchases'
import api from '@/libs/axios'

type Props = {
  title: string
  link: string
  data: CategoryType[]
}

export const TableDashboard = ({ title, data, link }: Props) => {
  const handleEdit = (id: number) => {
    console.log('edit', id)
  }

  const handleDelete = async (id: number) => {
    const res = await api.patch(`/${link}`)
    console.log(res)
    console.log('del', id)
  }
  return (
    <>
      {data.length === 0 && <Empty title="Itens" />}

      {data.length > 0 && (
        <>
          <Flex alignItems="center" justifyContent="end" p="5px">
            <Button size="sm" colorScheme="red">
              Adicionar {title}
            </Button>
          </Flex>
          <TableContainer>
            <Table size="sm" colorScheme="linkedin">
              <TableCaption
                m="0px"
                mb="5px"
                p="0px"
                fontSize="2xl"
                placement="top"
              >
                {title}
              </TableCaption>
              <Thead>
                <Tr className="bg-blue-100">
                  <Th>Nome</Th>
                  <Th isNumeric>opções</Th>
                </Tr>
              </Thead>
              {data.map((item) => (
                <Tbody key={item.id}>
                  <Tr>
                    <Td className="whitespace-normal">{item.name}</Td>
                    <Td isNumeric>
                      <ButtonGroup>
                        <Tooltip label="Editar">
                          <IconButton
                            onClick={() => handleEdit(item.id)}
                            colorScheme="blue"
                            aria-label="Edit"
                            size="xs"
                            icon={<FaRegEdit />}
                          />
                        </Tooltip>
                        <Tooltip label="Deletar">
                          <IconButton
                            onClick={() => handleDelete(item.id)}
                            colorScheme="red"
                            aria-label="delete"
                            size="xs"
                            icon={<FaRegTrashAlt />}
                          />
                        </Tooltip>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}
