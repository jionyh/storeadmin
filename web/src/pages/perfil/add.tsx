import { Layout } from '@/layout/Layout'
import { theme } from '@/utils/ChakraInput'
import {
  ChakraProvider,
  Input,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Button,
  ButtonGroup,
  FormHelperText,
  useToast,
  Flex,
  FormErrorMessage,
  useDisclosure,
  Center,
  Box,
} from '@chakra-ui/react'
import api from '@/libs/axios'
import { Error, User } from '@/types/PerfilTypes'
import { useRouter } from 'next/router'
import { Loader } from '@/components/Loader'
import { useState } from 'react'

const Add = () => {
  const loader = useDisclosure()
  const toast = useToast()
  const router = useRouter()
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    cpf: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<Error>({})
  const [disabled, setDisabled] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const submit = async () => {
    setError({})
    loader.onOpen()
    setDisabled(true)
    if (user.password !== user.confirmPassword) {
      setError({ password: ['Senha não são iguais! Verifique'] })
      return
    }

    try {
      const res = await api.post('/user/add', {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        password: user.password,
      })
      if (!res.data.success) {
        console.log(res.data)
        throw res.data.message
      }
      loader.onClose()
      toast({
        title: 'Usuário criado com sucesso! Redirecionando',
        status: 'success',
        isClosable: true,
      })
      setTimeout(() => {
        setDisabled(false)
        router.push('/perfil')
      }, 3000)
    } catch (e: any) {
      setDisabled(false)
      setError({ error: [e] })
      loader.onClose()
      toast({
        title: 'Erro! Verifique os campos.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Layout title="Cadastrar usuário">
      <>
        {error.error && (
          <Center>
            <Box
              border="1px"
              borderColor="red.100"
              bgColor="red.100"
              w="full"
              textAlign="center"
              p="5px"
              textColor="red.600"
            >
              <span>{error.error}</span>
            </Box>
          </Center>
        )}
        <ChakraProvider theme={theme}>
          <Stack spacing="20px" border="1px" borderColor="gray.300" p="15px">
            <Stack spacing="20px">
              <FormControl
                variant="floating"
                id="name"
                mt="10px"
                isInvalid={!!error.name}
              >
                <Input
                  border="1px"
                  borderColor="gray.300"
                  isDisabled={disabled}
                  name="name"
                  value={user.name}
                  onChange={(e) => handleChange(e)}
                />
                <FormLabel>Nome</FormLabel>
                {error.name && (
                  <FormErrorMessage>{error.name[0]}</FormErrorMessage>
                )}
              </FormControl>

              <Flex gap="5px">
                <FormControl
                  variant="floating"
                  id="email"
                  isInvalid={!!error.email}
                >
                  <InputGroup>
                    <Input
                      border="1px"
                      borderColor="gray.300"
                      isDisabled={disabled}
                      name="email"
                      isInvalid={!!error.email}
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                    />
                    <FormLabel>Email</FormLabel>
                  </InputGroup>
                  {error.email && (
                    <FormErrorMessage>{error.email[0]}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  variant="floating"
                  id="cpf"
                  isInvalid={!!error.cpf}
                >
                  <InputGroup>
                    <Input
                      border="1px"
                      borderColor="gray.300"
                      isDisabled={disabled}
                      name="cpf"
                      isInvalid={!!error.cpf}
                      value={user.cpf}
                      onChange={(e) => handleChange(e)}
                    />
                    <FormLabel>CPF</FormLabel>
                  </InputGroup>
                  {error.cpf && (
                    <FormErrorMessage>{error.cpf[0]}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
            </Stack>

            <Stack spacing="20px">
              <FormControl
                variant="floating"
                id="password"
                isInvalid={!!error.password}
              >
                <InputGroup>
                  <Input
                    border="1px"
                    borderColor="gray.300"
                    isDisabled={disabled}
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel>Nova senha</FormLabel>
                </InputGroup>
              </FormControl>
              <FormControl
                variant="floating"
                id="confirmPassword"
                isInvalid={!!error.password}
              >
                <InputGroup>
                  <Input
                    border="1px"
                    borderColor="gray.300"
                    isDisabled={disabled}
                    name="confirmPassword"
                    type="password"
                    value={user.confirmPassword}
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel>Confirmar senha</FormLabel>
                </InputGroup>
                {error.password ? (
                  <FormErrorMessage>{error.password[0]}</FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Senha deve conter ao menos 6 caratecteres.
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Stack>
          <ButtonGroup display="flex" justifyContent="end" m="15px">
            <Button colorScheme="red" onClick={submit}>
              Cadastrar
            </Button>
          </ButtonGroup>
        </ChakraProvider>
        <Loader obj={loader} />
      </>
    </Layout>
  )
}

export default Add
