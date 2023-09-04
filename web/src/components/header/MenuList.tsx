import { ReactElement, ReactNode } from 'react'

type Params = {
  children?: ReactNode | ReactElement
}
export const MenuList = ({ children }: Params) => {
  return (
    <li className="flex w-full cursor-pointer items-center gap-3 px-4 text-red-500 hover:bg-red-100">
      {children}
    </li>
  )
}
