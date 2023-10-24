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

    try {
      const response = await api.post(`/${props.endpoint}`, formData)

      if (response.data.success) {
        toast({
          description: `${props.name}s adicionada com sucesso!`,
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
      console.error('API request error:', error)
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
