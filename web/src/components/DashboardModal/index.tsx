import api from '@/libs/axios'
import { InfoModal } from '@/types/Dashboard'
import { CategoryType } from '@/types/UnitType'
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
  FormLabel,
  extendTheme,
  ChakraProvider,
  Stack,
  UseDisclosureProps,
  FormHelperText,
  InputGroup,
  Select,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
  obj: UseDisclosureProps
  info: InfoModal
  fn?: () => Promise<void>
  create?: boolean
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

export const DashboardModal = ({ obj, info, fn, create = false }: Props) => {
  const loader = useDisclosure()
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onClose } = useDisclosure(obj)
  const [abbreviation, setAbbreviation] = useState('')
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState(1)
  const [categories, setCategories] = useState<CategoryType[]>([])

  const getCategories = async () => {
    const res = await api.get('/category')
    setCategories(res.data.data)
  }

  const handleFetch = async (endpoint: string, data: any) => {
    loader.onOpen()
    console.log()
    try {
      create
        ? await api.post(endpoint.slice(0, endpoint.indexOf('/')), data)
        : await api.patch(endpoint, data)
      loader.onClose()
      onClose()
      setTimeout(() => {
        if (create && fn) {
          fn()
        } else {
          router.reload()
        }
      }, 3000)
      toast({
        title: `${info.title} ${create ? 'criado!' : 'editado!'}`,
        status: 'success',
        isClosable: true,
      })

      return
    } catch (e) {
      loader.onClose()
      onClose()
      toast({
        title: `Erro ao ${create ? 'adicionar' : 'editar'} ${
          info.title
        }. Verifique os campos!`,
        status: 'error',
        isClosable: true,
      })
    }
  }

  const endpointSwitch = (endpoint: string) => {
    switch (endpoint) {
      case 'Categorias':
        handleFetch(`category/${info.id}`, { name })
        break

      case 'Produtos':
        handleFetch(`product/${info.id}`, { name, categoryId })
        break

      case 'Unidades':
        handleFetch(`unit/${info.id}`, { name, abbreviation })
        break
    }
  }

  useEffect(() => {
    setName(info.name ? info.name : '')
    setAbbreviation(info.abb ? info.abb : '')
    setCategoryId(info.cat ? info.cat : 1)
    getCategories()
  }, [info])
  return (
    <>
      <ChakraProvider theme={theme}>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {create ? 'Adicionar' : 'Editar'} {info.title}
            </ModalHeader>
            <ModalBody pb={6}>
              <Stack spacing="15px">
                <FormControl variant="floating" id="first-name">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormLabel>{info.title}</FormLabel>
                </FormControl>

                {info.title !== 'Categorias' &&
                  (info.title === 'Produtos' ? (
                    // Se for para produtos
                    <FormControl variant="floating" id="first-name">
                      <InputGroup>
                        <Select
                          value={categoryId}
                          onChange={(e) =>
                            setCategoryId(parseInt(e.target.value))
                          }
                        >
                          {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Select>

                        <FormLabel>Categorias</FormLabel>
                      </InputGroup>
                    </FormControl>
                  ) : (
                    // Se for para unidades
                    <FormControl variant="floating" id="first-name">
                      <InputGroup>
                        <Input
                          value={abbreviation}
                          onChange={(e) => setAbbreviation(e.target.value)}
                        />
                        <FormLabel>Abreviação</FormLabel>
                      </InputGroup>
                      <FormHelperText ml="8px" className="text-sx">
                        Abreviação da unidade de medida. No máximo 3 letras
                      </FormHelperText>
                    </FormControl>
                  ))}
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => endpointSwitch(info.title)}
              >
                {create ? 'Adicionar' : 'Editar'}
              </Button>
              <Button colorScheme="red" onClick={() => onClose()}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </>
  )
}
