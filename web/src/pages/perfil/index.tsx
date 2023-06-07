import { Layout } from '@/layout/Layout'
import { useContext, useState } from 'react'
import { Context } from '@/contexts/UserContext'
import { theme } from '@/utils/ChakraInput'
import {
  ChakraProvider,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Switch,
  InputGroup,
  Button,
  ButtonGroup,
  FormHelperText,
  useToast,
  Flex,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react'
import api from '@/libs/axios'
import { Error, User } from '@/types/PerfilTypes'
import { useRouter } from 'next/router'
import { Loader } from '@/components/Loader'
import Link from 'next/link'

const Perfil = () => {
  const [changePassword, setChangePassword] = useState(false)
  const loader = useDisclosure()
  const toast = useToast()
  const router = useRouter()
  const { state } = useContext(Context)
  const [user, setUser] = useState<User>({
    id: state.user.id,
    name: state.user.name,
    cpf: state.user.cpf,
    email: state.user.email,
    role: state.user.role,
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<Error>({})
  const [disabled, setDisabled] = useState(true)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const submit = async () => {
    loader.onOpen()
    if (user.password !== user.confirmPassword) {
      setError({ password: ['Senha não são iguais! Verifique'] })
      return
    }

    try {
      const res = await api.patch(`/user/${user.id}`, {
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        password: user.password ? user.password : null,
      })
      if (!res.data.success) {
        throw res.data.message
      }
      setDisabled(true)
      router.reload()
      loader.onClose()
    } catch (e: any) {
      setError(e)
      loader.onClose()
      toast({
        title: 'Erro! Verifique os campos.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <Layout title="Perfil">
      <>
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
                  placeholder="Nome"
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
                      placeholder="email"
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
                      placeholder="cpf"
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

            <FormControl display="flex" gap="5px" alignItems="center">
              <Switch
                id="editPassword"
                isDisabled={disabled}
                checked={changePassword}
                onChange={() => setChangePassword(!changePassword)}
              />
              <FormLabel htmlFor="editPassword" mb="0" color="gray.500">
                Alterar senha?
              </FormLabel>
            </FormControl>

            {changePassword && (
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
            )}
          </Stack>
          <ButtonGroup display="flex" justifyContent="end" m="15px">
            {disabled ? (
              <Button colorScheme="blue" onClick={() => setDisabled(!disabled)}>
                Editar
              </Button>
            ) : (
              <Button colorScheme="red" onClick={submit}>
                Alterar
              </Button>
            )}
            <Link href="/perfil/add">
              <Button isDisabled={user.role !== 'Admin'} colorScheme="green">
                Cadastrar novo usuário
              </Button>
            </Link>
          </ButtonGroup>
        </ChakraProvider>
        <Loader obj={loader} />
      </>
    </Layout>
  )
}

export default Perfil
