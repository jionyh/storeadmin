import { Text } from '@chakra-ui/react'
import { BiTaskX } from 'react-icons/bi'
type Props = {
  title?: string
}
export const Empty = ({ title = 'compras' }: Props) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <BiTaskX className="text-gray-400" size={70} />
        <Text className="text-lg font-bold leading-relaxed text-gray-500">
          Não há {title} para esse dia
        </Text>
      </div>
    </div>
  )
}
