import Logo from '@/assets/logo.svg'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import api from '@/libs/axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import cookies from 'js-cookie'
import { Loader } from '@/components/Loader'

const Login = () => {
  const loader = useDisclosure()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    loader.onOpen()
    if (email && password) {
      try {
        const res = await api.post('/signin', {
          email,
          password,
        })
        if (res.data.success) {
          cookies.set('token', res.data.token)
          router.push('/')
          return
        }
      } catch (e: any) {
        setError(e.response.data.error)
        loader.onClose()
      }
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleLogin()
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-red-500">
      <Head>
        <title>Login</title>
      </Head>
      <div className="mx-10 flex flex-col items-center justify-center rounded-lg bg-gray-50 px-20 pb-12 pt-5 shadow-2xl">
        <Image src={Logo} alt="" />
        <div className="mt-11 flex flex-col gap-8">
          <Input
            placeholder="Digite seu email"
            autoComplete={'false'}
            shadow="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup>
            <Input
              placeholder="Digite sua senha"
              shadow="lg"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputRightElement>
              {show ? (
                <ViewOffIcon onClick={() => setShow(!show)} />
              ) : (
                <ViewIcon onClick={() => setShow(!show)} />
              )}
            </InputRightElement>
          </InputGroup>
          {error && (
            <Box background="red.200" p="8px" rounded="xl">
              <p className="flex justify-center leading-tight text-red-800">
                Usuário/Senha incorreto!
              </p>
            </Box>
          )}
          <Button colorScheme="red" alignSelf="end" onClick={handleLogin}>
            Entrar
          </Button>
        </div>
      </div>
      <Loader obj={loader} />
    </div>
  )
}

export default Login
