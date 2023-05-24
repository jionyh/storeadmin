import { useEffect, useState } from 'react'
import { Alert } from '../Alert'
import { Loader } from '../Loader'
import { api } from '@/libs/axios'
import { SaleInfoModal } from '@/types/SaleType'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Button,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  FormLabel,
  extendTheme,
  ChakraProvider,
  Stack,
  Flex,
  InputGroup,
  InputLeftElement,
  useToast,
  UseDisclosureProps,
} from '@chakra-ui/react'

type Props = {
  obj: UseDisclosureProps
  info: SaleInfoModal
  callback: () => void
}

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
})

export const ModalVendas = ({ obj, info, callback }: Props) => {
  const alert = useDisclosure()
  const loader = useDisclosure()
  const toast = useToast()
  const { isOpen, onClose } = useDisclosure(obj)
  const [data, setData] = useState(info)
  const [value, setValue] = useState(info.value)

  const handleEdit = async () => {
    alert.onClose()
    loader.onOpen()
    if (value) {
      try {
        await api.patch(`/vendas/${data.id}`, {
          value,
        })
        loader.onClose()
        toast({
          title: 'Venda Editada!',
          status: 'success',
          isClosable: true,
        })
        onClose()
        callback()
        return
      } catch (e) {
        loader.onClose()
        toast({
          title: 'Erro ao editar a venda!',
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    setData(info)
    setValue(info.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <>
      <Alert obj={alert} title="Editar venda?" fn={handleEdit} />
      <Loader obj={loader} />
      <ChakraProvider theme={theme}>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar venda</ModalHeader>
            <ModalBody pb={6}>
              <Stack spacing="15px">
                <FormControl variant="floating" id="first-name">
                  <Input value={info.payment} disabled />
                  <FormLabel>Produto</FormLabel>
                </FormControl>

                <Flex gap={5}>
                  <FormControl variant="floating" id="first-name">
                    <InputGroup>
                      <InputLeftElement textAlign="end">€</InputLeftElement>
                      <Input
                        textAlign="end"
                        value={value}
                        onChange={(e) =>
                          setValue(e.target.value.replace(',', '.'))
                        }
                      />
                      <FormLabel>Valor</FormLabel>
                    </InputGroup>

                    <FormErrorMessage>
                      Valor precisa ser preenchido!
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => alert.onOpen()}>
                Editar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  )
}