import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<{
  name: number
} | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState(12)

  return <AuthContext.Provider children={children} value={{ name }}></AuthContext.Provider>
}



export const useAuth = () => {
  let context = useContext(AuthContext)
  if (!context) {
    throw new Error('必须在authProvider中使用')
  }
  return context
}