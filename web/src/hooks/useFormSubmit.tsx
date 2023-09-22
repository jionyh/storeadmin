'use-client'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/lib/axios'
import { queryClient } from '@/utils/queryClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function useFormSubmit<T>(type: { type: string }) {
  const [formData, setFormData] = useState<T>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function submitForm() {
    console.log(formData)
    setIsDialogOpen(false)

    try {
      const response = await api.post('/sales', formData)

      if (response.data.success) {
        toast({
          description: 'Venda adicionada com sucesso!',
        })
        queryClient.invalidateQueries({ queryKey: [`${type}`] })
        router.back()
      } else {
        toast({
          variant: 'destructive',
          description: 'Problema ao criar a venda! Tente novamente.',
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
