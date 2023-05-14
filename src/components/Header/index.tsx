import { HamburgerIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Image, Text, Fade } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuEvent = (event: MouseEvent) => {
    const tagName = (event.target as Element).tagName
    if (!['path', 'svg'].includes(tagName)) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    window.removeEventListener('click', handleMenuEvent)
    window.addEventListener('click', handleMenuEvent)
    return () => window.removeEventListener('click', handleMenuEvent)
  }, [menuOpen])

  return (
    <>
      <Box
        className='flex items-center p-6 justify-between'
        bg='red.500'
        w='100%'
        h='80px'
        color='white'>
        <HamburgerIcon
          onClick={() => setMenuOpen(!menuOpen)}
          w={12}
          h={12}
          color='white'
        />

        <Link href='/'>
          <Box className='flex flex-col items-center justify-center'>
            <Image
              boxSize='40px'
              src='/assets/logo_branco.png'
            />
            <Text fontSize='md'>STOREADMIN</Text>
          </Box>
        </Link>

        <Avatar
          size={'md'}
          bg={'whiteAlpha.900'}
          color={'gray.900'}
          name='Jiony Henrique'
          src='https://bit.ly/broken-link'
        />
      </Box>
      {menuOpen && (
        <Fade in={menuOpen}>
          <Box
            className='absolute top-0 left-0 m-6 flex flex-col item text-left transition-all'
            border={'1px'}
            borderColor={'red.600'}
            zIndex={'10'}
            shadow={'lg'}>
            <Link href='/vendas'>
              <Button
                className='w-full'
                rounded={'0'}
                colorScheme={'red'}
                color={'white'}>
                Vendas
              </Button>
            </Link>
            <Link href='/compras'>
              <Button
                className='w-full'
                rounded={'0'}
                colorScheme={'red'}
                color={'white'}>
                Compras
              </Button>
            </Link>
            <Link href='/relatorios'>
              <Button
                className='w-full'
                rounded={'0'}
                colorScheme={'red'}
                color={'white'}>
                Relatórios
              </Button>
            </Link>
            <Link href='/config'>
              <Button
                className='w-full'
                rounded={'0'}
                colorScheme={'red'}
                color={'white'}>
                Configurações
              </Button>
            </Link>
          </Box>
        </Fade>
      )}
    </>
  )
}

export default Header
