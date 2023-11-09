import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import { HamburgerMenu } from './HamburgerMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Loader } from '../Loader'

export default async function Header() {
  
  /* Pegando a session do usuário logado para passar ao component UserMenu */
  const userSession = await getServerSession(authOptions)

  return (
    <header className="flex h-20 items-center justify-between bg-primary px-4">
      {!userSession && <Loader visible/>}
      {userSession && <>
        <HamburgerMenu />
      <Logo />
      <UserMenu user={userSession.user}/>
      </>}
    </header>
  )
}
