/* eslint-disable jsx-a11y/alt-text */

import { Box, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { HamburguerMenu } from '../HamburguerMenu'
import { ProfileMenu } from '../ProfileMenu'

const Header = () => {
  return (
    <>
      <Box
        className="flex items-center justify-between p-6"
        bg="red.500"
        w="100%"
        h="80px"
        color="white"
      >
        <HamburguerMenu />

        <Link href="/">
          <Box className="flex flex-col items-center justify-center">
            <Image boxSize="40px" src="/assets/logo_branco.png" />
            <Text fontSize="md">STOREADMIN</Text>
          </Box>
        </Link>

        <ProfileMenu />
      </Box>
    </>
  )
}

export default Header
