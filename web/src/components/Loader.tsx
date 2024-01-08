'use client'
import { Blocks, TailSpin } from 'react-loader-spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type LoaderProps = {
  visible: boolean
  spin?: boolean
}
export const Loader = ({ visible = false, spin = false }: LoaderProps) => {
  return (
    <>
      {visible && spin && (
        <div className="flex h-screen w-screen items-center justify-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#ccc"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {visible && !spin && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
          <Blocks
            visible={visible}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper fill-red-500"
          />
        </div>
      )}
    </>
  )
}
