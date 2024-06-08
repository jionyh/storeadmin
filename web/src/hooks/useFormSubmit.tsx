'use-client'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { queryClient } from '@/utils/queryClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function useFormSubmit<T>(props: {
  endpoint: string
  name: string
  onSuccess?: (status: boolean) => void
  put?: boolean
}) {
  const [formData, setFormData] = useState<T>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function submitForm() {
    setIsDialogOpen(false)

    const onSuccess = () => {
      if (props.onSuccess) {
        return props.onSuccess(false)
      } else {
        return router.back
      }
    }

    const costId =
      Array.isArray(formData) && formData.length > 0 && formData[0].cost_id

    const requestFn = props.put
      ? api.put(`/${props.endpoint}/${costId}}`, formData)
      : api.post(`/${props.endpoint}`, formData)

    const toastSuccessMessage = props.put
      ? `${props.name} editada com sucesso!`
      : `${props.name}s adicionada com sucesso!`

    try {
      const response = await requestFn

      if (response.data.success) {
        toast({
          description: toastSuccessMessage,
        })
        queryClient.invalidateQueries({ queryKey: [`${props.endpoint}`] })
        onSuccess()
      } else {
        toast({
          variant: 'destructive',
          description: `Problema ao criar a ${props.name}! Tente novamente.`,
        })
      }
    } catch (error) {
      console.log('API request error:', error)
      toast({
        variant: 'destructive',
        description:
          'Ocorreu um erro ao processar a solicitação. Tente novamente mais tarde.',
      })
    }
  }
  return {
    formData,
    setFormData,
    isDialogOpen,
    setIsDialogOpen,
    submitForm,
  }
}

export default useFormSubmit
