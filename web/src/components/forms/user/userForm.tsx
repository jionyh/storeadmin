'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { userFormSchema, UserFormDataType } from '@/types/FormDataTypes'
import { capitalize } from '@/utils/capitalizeNames'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import useFormSubmit from '@/hooks/useFormSubmit'
import { Alert } from '@/components/alertDialog/Alert'

type UserFormMainProps = {
  initialData: UserFormDataType
}

export const UserFormMain = ({ initialData }: UserFormMainProps) => {
  const [editPassword, setEditPassword] = useState<boolean>(false)

  const { setFormData, isDialogOpen, setIsDialogOpen, submitForm } =
    useFormSubmit<UserFormDataType>({
      endpoint: 'users/edit',
      name: 'usuario',
    })

  const form = useForm<UserFormDataType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData,
  })

  function onSubmit(values: UserFormDataType) {
    setFormData(values)
    setIsDialogOpen(true)
    setEditPassword(false)
  }

  return (
    <Card className="h-screen w-screen rounded-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="text-center">
            <CardTitle>{`Perfil de ${capitalize(initialData.name)}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col gap-3">
              <FormField
                control={form.control}
                name={`email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled id="email" value={initialData.email} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`role`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-start gap-2">
                      <FormLabel>Administrador</FormLabel>
                      <FormControl>
                        <Switch
                          disabled
                          id="role"
                          checked={initialData.role === 'Admin'}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              {editPassword && (
                <>
                  <FormField
                    control={form.control}
                    name={`currentPassword`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha Atual</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`newPassword`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nova Senha</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`confirmNewPassword`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Nova Senha</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            {!editPassword && (
              <div className="mb-4">
                <Button onClick={() => setEditPassword(!editPassword)}>
                  Alterar senha
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" className="w-full p-2.5">
              Editar
            </Button>
          </CardFooter>
        </form>
      </Form>
      <Alert
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        submit={submitForm}
      />
    </Card>
  )
}
