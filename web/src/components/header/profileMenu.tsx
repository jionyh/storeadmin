'use client'

import { useEffect, useRef, useState } from 'react'
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa'

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    // Function to handle clicks outside of the menu
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target instanceof HTMLButtonElement)
      ) {
        closeMenu()
      }
    }

    // Add event listener for clicks on the window when the menu is open
    if (isOpen) {
      window.addEventListener('click', handleOutsideClick)
    }

    // Remove the event listener when the component unmounts or when the menu is closed
    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        id="menu-button"
        onClick={handleToggle}
        className="z-20 h-10 w-10 rounded-full bg-white text-red-400"
      >
        JH
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-3 top-10 z-10 w-44 rounded bg-white shadow-md"
        >
          <ul className="w-full space-y-1 py-3">
            <li className="flex w-full cursor-pointer items-center gap-3 px-4 text-red-500 hover:bg-red-50">
              <FaUserEdit size={20} />
              Perfil
            </li>
            <li className="flex cursor-pointer items-center gap-3 px-4 text-red-500 hover:bg-red-50">
              <FaSignOutAlt size={20} />
              Sair
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
