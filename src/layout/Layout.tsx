import { ReactElement } from 'react'
import Header from '@/components/Header'

import { Box, Input, Stack, Select, NumberInput, Heading } from '@chakra-ui/react'
import Head from 'next/head'

type Props = {
  children: ReactElement
  title: string
}

export const Layout = ({ children, title }: Props) => {
  return (
    <Box className='container max-w-[480px]'>
      <Header />
      <Heading
        textAlign={'center'}
        size={'xl'}>
        {title}
      </Heading>
      <Head>
        <title>{title}</title>
      </Head>
      <Box padding={'2'}>{children}</Box>
    </Box>
  )
}
