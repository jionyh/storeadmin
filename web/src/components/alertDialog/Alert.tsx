import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type AlertProps = {
  open: boolean
  setOpen: (open: boolean) => void
  submit: () => void
  deleteTitle?: boolean
}

export const Alert = ({
  open = false,
  setOpen,
  submit,
  deleteTitle,
}: AlertProps) => {
  const title = deleteTitle
    ? 'Você tem certeza que deseja deletar o registro?'
    : 'Você tem certeza que deseja continuar?'
  const submitButtonTitle = deleteTitle ? 'Deletar' : 'Continuar'
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={submit}>
            {submitButtonTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
