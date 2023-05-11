import { HamburgerIcon } from '@chakra-ui/icons'
import { Avatar, Box, Image, Text } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box
      className='flex items-center p-6 justify-between'
      bg='red.500'
      w='100%'
      h='80px'
      color='white'>
      <HamburgerIcon
        w={12}
        h={12}
        color='white'
      />

      <Box className='flex flex-col items-center justify-center'>
        <Image
          boxSize='40px'
          src='/assets/logo_branco.png'
        />
        <Text fontSize='md'>STOREADMIN</Text>
      </Box>

      <Avatar
        size={'md'}
        bg={'whiteAlpha.900'}
        color={'gray.900'}
        name='Jiony Henrique'
        src='https://bit.ly/broken-link'
      />
    </Box>
  )
}

export default Header
