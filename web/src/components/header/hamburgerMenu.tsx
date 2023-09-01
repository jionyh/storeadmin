'use client'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function HamburgerMenu() {
  return (
    <nav>
      <button className="flex cursor-pointer items-center">
        <GiHamburgerMenu size={30} color="white" />
      </button>
    </nav>
  )
}
