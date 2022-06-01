import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthForm, RegisterForm, User } from "types/user";
import * as auth from 'auth-provider'
import { http } from "utils/use-http";

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

const AuthContext = createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: RegisterForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => {
    return auth.login(form).then(setUser)
  }
  const register = (form: RegisterForm) => {
    return auth.register(form).then(setUser)
  }
  const logout = () => auth.logout().then(() => {
    setUser(null)
  })

  useEffect(() => {
    bootStrapUser().then(res => {
      setUser(res)
    })
  }, [])

  return <AuthContext.Provider children={children} value={{ user, login, logout, register }}></AuthContext.Provider>
}


export const useAuth = () => {
  let context = useContext(AuthContext)
  if (!context) {
    throw new Error('必须在authProvider中使用')
  }
  return context
}