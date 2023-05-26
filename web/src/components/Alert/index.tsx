/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  obj: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle?: () => void
    isControlled?: boolean
    getButtonProps?: (props?: any) => any
    getDisclosureProps?: (props?: any) => any
  }
  title: string
  fn: () => void
}

export const Alert = ({ obj, title, fn }: Props) => {
  const { isOpen, onClose } = useDisclosure(obj)
  const cancelRef = React.useRef(null)

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        isCentered
        size="sm"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>Deseja continuar?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={fn} ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
