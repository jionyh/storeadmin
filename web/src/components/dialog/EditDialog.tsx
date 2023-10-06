import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

type Props = {
  openDialog: boolean
  onOpenChangeDialog: (event: boolean) => void
  children: ReactNode
}

export const EditDialog = ({
  onOpenChangeDialog,
  openDialog = false,
  children,
}: Props) => {
  return (
    <Dialog open={openDialog} onOpenChange={onOpenChangeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
