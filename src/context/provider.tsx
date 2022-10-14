import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { AuthForm, RegisterForm, User } from "types/user";
import * as auth from 'auth-provider'
import { http } from "utils/use-http";
import { FullPageLoading } from "components/lib";
import { message } from 'antd'

export const bootStrapUser = async () => {
  let user = null
  let token = auth.getToken()

  if (token) {
    try {
      user = await http({
        url: '/verify',
        method: 'POST',
        data: {
          token
        }
      })
      user.token = token

    } catch (e) {
      if (e instanceof Error) {
        message.error(`${e.message}, 请重新登陆！`)
        auth.logout()
      }
    }

  }
  return user
}

const Context = createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: RegisterForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined)



export const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = (form: AuthForm) => {
    return auth.login(form).then((user) => {
      setUser(user)
    })
  }

  const register = (form: RegisterForm) => {
    return auth.register(form).then(user => {
      setUser(user)
    })
  }

  const logout = () => auth.logout().then(() => {
    setUser(null)
  })

  useEffect(() => {
    setIsLoading(true)
    bootStrapUser().then(res => {
      setUser(res)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])


  if (isLoading) {
    return <FullPageLoading />
  }

  return <Context.Provider children={children} value={{
    user, login, logout, register,
  }}></Context.Provider>
}


export const useProvider = () => {
  let context = useContext(Context)
  if (!context) {
    throw new Error('必须在authProvider中使用')
  }
  return context
}