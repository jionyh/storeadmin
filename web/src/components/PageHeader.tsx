'use client'
import { useRouter } from 'next/navigation'
import { AiOutlineCaretLeft } from 'react-icons/ai'

type PageHeaderProps = {
  name: string
}
export const PageHeader = ({ name }: PageHeaderProps) => {
  const router = useRouter()

  const handleBackButton = () => {
    router.back()
  }
  return (
    <>
      <div className="relative mt-3 flex h-11 items-center justify-center p-4">
        <div
          className="absolute left-0 cursor-pointer"
          onClick={handleBackButton}
        >
          <AiOutlineCaretLeft size={30} className="text-primary" />
        </div>
        <h2 className="w-full text-center text-xl font-bold ">
          {name.toUpperCase()}
        </h2>
      </div>
      <hr className=" " />
    </>
  )
}
