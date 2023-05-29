/* eslint-disable jsx-a11y/alt-text */
import { Context } from '@/contexts/UserContext'
import { Avatar, Box, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useContext } from 'react'
import { HamburguerMenu } from '../HamburguerMenu'

const Header = () => {
  const { state } = useContext(Context)

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
        {/* <HamburgerIcon
          onClick={() => setMenuOpen(!menuOpen)}
          w={12}
          h={12}
          color="white"
        /> */}

        <Link href="/">
          <Box className="flex flex-col items-center justify-center">
            <Image boxSize="40px" src="/assets/logo_branco.png" />
            <Text fontSize="md">STOREADMIN</Text>
          </Box>
        </Link>

        <Avatar
          size={'md'}
          bg={'whiteAlpha.900'}
          color={'gray.900'}
          name={state.user.name}
          src="https://bit.ly/broken-link"
        />
      </Box>
    </>
  )
}

export default Header
