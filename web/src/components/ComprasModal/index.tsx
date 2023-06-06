import { Purchase } from '@/types/PurchaseType'
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
  ChakraProvider,
  Stack,
  Flex,
  InputGroup,
  InputRightAddon,
  InputLeftElement,
  useToast,
  UseDisclosureProps,
} from '@chakra-ui/react'
import { theme } from '@/utils/ChakraInput'
import { useEffect, useState } from 'react'
import { Alert } from '../Alert'
import { Loader } from '../Loader'
import api from '@/libs/axios'

type Props = {
  obj: UseDisclosureProps
  info: Purchase
  callback: () => void
}

export const ModalCompras = ({ obj, info, callback }: Props) => {
  const alert = useDisclosure()
  const loader = useDisclosure()
  const toast = useToast()
  const { isOpen, onClose } = useDisclosure(obj)
  const [data, setData] = useState(info)
  const [value, setValue] = useState(info.value)
  const [quantity, setQuantity] = useState(info.quantity)

  const handleEdit = async () => {
    alert.onClose()
    loader.onOpen()
    if (value && quantity) {
      try {
        await api.patch(`/compras/${data.id}`, {
          value,
          quantity,
        })
        loader.onClose()
        toast({
          title: 'Produto Editado!',
          status: 'success',
          isClosable: true,
        })
        onClose()
        callback()
        return
      } catch (e) {
        loader.onClose()
        toast({
          title: 'Erro ao Editar  o Produto!',
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    setData(info)
    setValue(info.value)
    setQuantity(info.quantity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <>
      <Alert obj={alert} title="Editar Produto?" fn={handleEdit} />
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
            <ModalHeader>Editar Produto</ModalHeader>
            <ModalBody pb={6}>
              <Stack spacing="15px">
                <FormControl variant="floating" id="first-name">
                  <Input value={data.name} disabled />
                  <FormLabel>Produto</FormLabel>
                </FormControl>

                <Flex gap={5}>
                  <FormControl variant="floating" id="first-name">
                    <InputGroup>
                      <Input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <FormLabel>Quantidade</FormLabel>
                      <InputRightAddon>{data.unit}</InputRightAddon>
                    </InputGroup>

                    <FormErrorMessage>
                      Quantidade precisa ser preenchido!
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl variant="floating" id="first-name">
                    <InputGroup>
                      <InputLeftElement textAlign="end">€</InputLeftElement>
                      <Input
                        textAlign="end"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      <FormLabel>Valor</FormLabel>
                    </InputGroup>

                    <FormErrorMessage>
                      Valor precisa ser preenchido!
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl variant="floating" id="first-name">
                  <Input disabled value={data.supplier} />
                  <FormLabel>Fornecedor</FormLabel>
                </FormControl>
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
