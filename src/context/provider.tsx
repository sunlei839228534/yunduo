import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { AuthForm, RegisterForm, User } from "types/user";
import * as auth from 'auth-provider'
import { http } from "utils/use-http";
import { FullPageLoading } from "components/lib";
import { UserActionKind, UserReducer } from "./user";
import { CourseActionKind, CourseReducer } from './course'

export const bootStrapUser = async () => {
  let user = null
  let token = auth.getToken()

  if (token) {
    user = await http({
      url: '/verify',
      method: 'POST',
      data: {
        token
      }
    })
    user.token = token
  }
  return user
}

const Context = createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: RegisterForm) => Promise<void>,
  logout: () => Promise<void>,
  showModal: boolean,
  toggle: (record: any) => void
} | undefined>(undefined)



export const Provider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [userState, userDispatch] = useReducer(UserReducer, {
    user: null
  })
  const [courseState, courseDispatch] = useReducer(CourseReducer, {
    showModal: false
  })

  const toggle = (record: any) => {
    console.log(record);

    courseDispatch({
      type: CourseActionKind.TOGGLE
    })
  }

  const login = (form: AuthForm) => {
    return auth.login(form).then((user) => {
      userDispatch({
        type: UserActionKind.LOGIN,
        paylod: user
      })
    })
  }

  const register = (form: RegisterForm) => {
    return auth.register(form).then(user => {
      userDispatch({
        type: UserActionKind.LOGIN,
        paylod: user
      })
    })
  }
  const logout = () => auth.logout().then(() => {
    userDispatch({
      type: UserActionKind.LOGOUT,
      paylod: null
    })
  })

  useEffect(() => {
    setIsLoading(true)
    bootStrapUser().then(res => {
      userDispatch({
        type: UserActionKind.LOGIN,
        paylod: res
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])


  if (isLoading) {
    return <FullPageLoading />
  }

  return <Context.Provider children={children} value={{
    user: userState.user, login, logout, register,
    showModal: courseState.showModal, toggle
  }}></Context.Provider>
}


export const useProvider = () => {
  let context = useContext(Context)
  if (!context) {
    throw new Error('必须在authProvider中使用')
  }
  return context
}