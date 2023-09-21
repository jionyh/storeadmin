import { GiHamburgerMenu } from 'react-icons/gi'

type Params = {
  icon?: boolean
  handleToggle: () => void
  initials?: string
}
export const MenuButton = ({ icon, handleToggle, initials = 'AA' }: Params) => {
  return (
    <button
      id="menu-button"
      onClick={handleToggle}
      className={`flex items-center justify-center ${
        icon ? '' : 'z-20 h-10 w-10 rounded-full bg-white text-primary'
      }`}
    >
      {icon ? (
        <GiHamburgerMenu size={30} color="white" />
      ) : (
        <span>{initials}</span>
      )}
    </button>
  )
}
