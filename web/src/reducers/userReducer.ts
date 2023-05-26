import { reducerActionType } from '@/types/reducerActionType'

// type do initialState de usuário
export type UserType = {
  id: string
  name: string
  email: string
  role: string
  token: string
}

export const userInitialState: UserType = {
  id: '',
  name: '',
  email: '',
  role: '',
  token: '',
}

// Reducer do usuário, com a única action de mudar todo o state
export const userReducer = (state: UserType, action: reducerActionType) => {
  switch (action.type) {
    case 'change_state':
      return action.payload
  }
  return state
}
