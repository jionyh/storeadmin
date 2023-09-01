import HamburgerMenu from './hamburgerMenu'
import ProfileMenu from './profileMenu'

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between bg-red-400 px-2">
      <HamburgerMenu />
      <div className="text-white">STOREADMIN</div>
      <ProfileMenu />
    </header>
  )
}
