'use client'
import { Blocks } from 'react-loader-spinner'
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
}
export const Loader = ({ visible = false }: LoaderProps) => {
  return (
<>
{visible && (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <Blocks
        visible={visible}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
    )}</>
  )
}
