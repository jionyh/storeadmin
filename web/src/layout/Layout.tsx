import { ReactElement } from 'react'
import Header from '@/components/Header'

import { Box, Flex, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

type Props = {
  children: ReactElement
  title: string
}

export const Layout = ({ children, title }: Props) => {
  const router = useRouter()

  return (
    <>
      <Box className="container max-w-[480px]">
        <Header />
        <Flex align="center" justifyContent="center" mt={3}>
          {router.pathname !== '/' && (
            <Box
              cursor="pointer"
              transition="all"
              _hover={{ transform: 'scale(1.1)' }}
              onClick={() => router.back()}
              p="1px"
            >
              <ArrowLeftIcon boxSize={5} color="gray.600" ml={5} />
            </Box>
          )}
          <Heading
            flex={1}
            mt="5px"
            textAlign="center"
            color="gray.600"
            size="xl"
          >
            {title}
          </Heading>
        </Flex>
        <hr className="m-5" />
        <Head>
          <title>{title}</title>
        </Head>

        <Box padding={'1'}>{children}</Box>
      </Box>
    </>
  )
}
