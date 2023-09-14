'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { ReactElement, ReactNode } from 'react'

type Params = {
  children?: ReactNode | ReactElement
  href?: string
  out?: boolean | undefined
}
export const MenuList = ({ children, href = '/', out }: Params) => {
  function handleClickButton() {
    signOut({ callbackUrl: 'http://localhost:3000/login' })
  }
  return (
    <Link href={href} onClick={out ? handleClickButton : undefined}>
      <li className="flex w-full cursor-pointer items-center gap-3 px-4 text-red-500 hover:bg-red-100">
        {children}
      </li>
    </Link>
  )
}
