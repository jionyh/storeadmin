import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { UserFormMain } from '@/components/forms/user/userForm'
import { Loader } from '@/components/Loader'
import { UserFormDataType } from '@/types/FormDataTypes'

export default async function Profile() {
  const userSession = await getServerSession(authOptions)

  const initialData: UserFormDataType = {
    name: '',
    email: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  if (userSession) {
    const { name, email, role } = userSession.user
    initialData.name = name
    initialData.email = email
    initialData.role = role
  }

  return (
    <>
      {userSession ? (
        <UserFormMain initialData={initialData} />
      ) : (
        <Loader visible />
      )}
    </>
  )
}
