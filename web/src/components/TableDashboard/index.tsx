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
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { Empty } from '../EmptyPurchases'
import api from '@/libs/axios'
import { Alert } from '../Alert'
import { Loader } from '../Loader'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DashboardModal } from '../DashboardModal'
import { InfoModal } from '@/types/Dashboard'

type Props = {
  title: string
  link: string
  data: CategoryType[]
}

export const TableDashboard = ({ title, data, link }: Props) => {
  const alertEdit = useDisclosure()
  const alertDelete = useDisclosure()
  const modal = useDisclosure()
  const loader = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  const [activeId, setActiveId] = useState<any>()
  const [info, setInfo] = useState<InfoModal>({ title: '', id: '', name: '' })

  const handleEdit = async (data: any) => {
    const modalData: any = {
      title,
      id: data.id,
      name: data.name,
      cat: data.categoryId ? data.categoryId : undefined,
      abb: data.abbreviation ? data.abbreviation : undefined,
    }
    setInfo(modalData)
    setActiveId(data.id)
    modal.onOpen()
  }

  const handleDelete = async (id: number) => {
    alertDelete.onOpen()
    setActiveId(id)
  }

  const fetchEdit = async () => {
    console.log(activeId)
    alertEdit.onClose()
    loader.onOpen()
    try {
      const res = await api.patch(`/${link}/${activeId}`)

      if (res.data.success) {
        router.reload()
        toast({
          title: `${title} editado com sucesso!`,
          status: 'success',
          isClosable: true,
        })
        loader.onClose()
        return
      }
      throw Error(res.data.error)
    } catch (e) {
      toast({
        title: `Erro ao editar ${title.toLowerCase()}. Verifique os campos!`,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      loader.onClose()
    }
  }

  const fetchDelete = async () => {
    alertDelete.onClose()
    loader.onOpen()
    try {
      const res = await api.delete(`/${link}/${activeId}`)

      if (res.data.success) {
        router.reload()
        toast({
          title: `${title} deletado com sucesso!`,
          status: 'success',
          isClosable: true,
        })
        loader.onClose()
        return
      }
      throw Error(res.data.error)
    } catch (e) {
      toast({
        title: `Erro ao deletar ${title.toLowerCase()}. Verifique os campos!`,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      loader.onClose()
    }
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
                            onClick={() => handleEdit(item)}
                            colorScheme="blue"
                            aria-label="Edit"
                            size="xs"
                            icon={<FaRegEdit />}
                          />
                        </Tooltip>
                        <Tooltip label="Deletar">
                          <IconButton
                            isDisabled={title === 'Categorias'}
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
          <Alert obj={alertEdit} fn={fetchEdit} title={`Editar ${title}`} />
          <Alert
            obj={alertDelete}
            fn={fetchDelete}
            title={`Deletar ${title}`}
          />
          <Loader obj={loader} />
          <DashboardModal obj={modal} info={info} />
        </>
      )}
    </>
  )
}
