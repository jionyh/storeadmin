import {
  Modal,
  ModalOverlay,
  Spinner,
  ModalContent,
  Center,
  useDisclosure,
} from '@chakra-ui/react'
type Props = {
  obj: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
    isControlled: boolean
    getButtonProps: (props?: any) => any
    getDisclosureProps: (props?: any) => any
  }
}
export const Loader = ({ obj }: Props) => {
  const { isOpen, onClose } = useDisclosure(obj)
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        isCentered
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="transparent">
          <Center>
            <Spinner thickness="4px" speed="0.65s" color="gray.500" size="xl" />
          </Center>
        </ModalContent>
      </Modal>
    </>
  )
}
