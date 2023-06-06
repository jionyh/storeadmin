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
} from '@chakra-ui/react'
import api from '@/libs/axios'

type User = {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: string
}

const Perfil = () => {
  const [changePassword, setChangePassword] = useState(false)
  const toast = useToast()
  const { state } = useContext(Context)
  const [user, setUser] = useState<User>({
    name: state.user.name,
    email: state.user.email,
    role: state.user.role,
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const submit = async () => {
    console.log(state.user)
    if (user.password !== user.confirmPassword) {
      toast({
        position: 'bottom-right',
        title: 'Senha não confere!!',
        status: 'error',
        isClosable: true,
      })
      return
    }

    const res = api.patch('/user', {
      name: user.name,
      email: user.email,
      password: user.password,
    })
    console.log(res)
  }

  return (
    <Layout title="Perfil">
      <>
        <ChakraProvider theme={theme}>
          <Stack spacing="20px" border="1px" borderColor="gray.300" p="15px">
            <Stack spacing="20px">
              <FormControl variant="floating" id="name" mt="10px">
                <Input
                  border="1px"
                  borderColor="gray.300"
                  placeholder="Nome"
                  name="name"
                  value={user.name}
                  onChange={(e) => handleChange(e)}
                />
                <FormLabel>Nome</FormLabel>
              </FormControl>

              <FormControl variant="floating" id="first-name">
                <InputGroup>
                  <Input
                    border="1px"
                    borderColor="gray.300"
                    placeholder="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel>Email</FormLabel>
                </InputGroup>
              </FormControl>
            </Stack>

            <FormControl display="flex" gap="5px" alignItems="center">
              <Switch
                id="editPassword"
                checked={changePassword}
                onChange={() => setChangePassword(!changePassword)}
              />
              <FormLabel htmlFor="editPassword" mb="0" color="gray.500">
                Alterar senha?
              </FormLabel>
            </FormControl>

            {changePassword && (
              <Stack spacing="20px">
                <FormControl variant="floating" id="password">
                  <InputGroup>
                    <Input
                      border="1px"
                      borderColor="gray.300"
                      name="password"
                      type="password"
                      value={user.password}
                      onChange={(e) => handleChange(e)}
                    />
                    <FormLabel>Nova senha</FormLabel>
                  </InputGroup>
                </FormControl>
                <FormControl variant="floating" id="confirmPassword">
                  <InputGroup>
                    <Input
                      border="1px"
                      borderColor="gray.300"
                      name="confirmPassword"
                      type="password"
                      value={user.confirmPassword}
                      onChange={(e) => handleChange(e)}
                    />
                    <FormLabel>Confirmar senha</FormLabel>
                  </InputGroup>

                  <FormHelperText>
                    Senha deve conter ao menos 6 caratecteres.
                  </FormHelperText>
                </FormControl>
              </Stack>
            )}
          </Stack>
          <ButtonGroup display="flex" justifyContent="end" m="15px">
            <Button colorScheme="red" onClick={submit}>
              Alterar
            </Button>
            <Button isDisabled={user.role !== 'Admin'} colorScheme="green">
              Cadastrar novo usuário
            </Button>
          </ButtonGroup>
        </ChakraProvider>
      </>
    </Layout>
  )
}

export default Perfil
