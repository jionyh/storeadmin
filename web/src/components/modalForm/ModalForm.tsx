import { ReactNode } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

type ModalFormProps = {
  open: boolean
  setOpen: (evt: boolean) => void
  children?: ReactNode
}

export const ModalForm = ({
  open = false,
  setOpen,
  children,
}: ModalFormProps) => {
  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          {children}
        </DialogContent>
      </Dialog>
    </div>
  )
}
