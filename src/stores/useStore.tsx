import create from 'zustand'

export interface UserType {
  name: string
  email: string
  age: string
  password: string
}

interface State {
  users: UserType[]
  addUser: (user: UserType) => void
}

const useStore = create<State>((set) => ({
  users: [], // estado dentro do zustand (poderia ter outros)

  addUser: (user: UserType) => { // função para addUser, poderia ter outras
    set(state => ({ users: [...state.users, user] }))
    // espalha (spread) o estado já existente (...state.users), e coloca o novo (user)
  }
}))

export default useStore