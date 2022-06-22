import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthForm, RegisterForm, User } from "types/user";
import * as auth from 'auth-provider'
import { http } from "utils/use-http";
import { FullPageLoading } from "components/lib";
import { useQuery } from "react-query";

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

  return <AuthContext.Provider children={children} value={{ user, login, logout, register }}></AuthContext.Provider>
}


export const useAuth = () => {
  let context = useContext(AuthContext)
  if (!context) {
    throw new Error('必须在authProvider中使用')
  }
  return context
}