import { Logo } from './Logo'
import { UserMenu } from './UserMenu'
import { HamburgerMenu } from './HamburgerMenu'

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between bg-primary px-4">
      <HamburgerMenu />
      <Logo />
      <UserMenu />
    </header>
  )
}
