import { useAuth } from "context/auth"
import { Button } from 'antd'

export const UnAuthenticatedApp = () => {
  const { user, login, register } = useAuth()

  const handleLogin = () => {
    login({
      email: '839228534@qq.com',
      password: '123456'
    })
  }

  const handleRegister = () => {
    register({
      email: '827121258118@qq.com',
      password1: '123456',
      password2: '123456',
      nickname: 'pekopeko',
    })
  }

  return <div>
    <Button onClick={handleLogin}>login</Button>
    <Button onClick={handleRegister}>register</Button>
  </div>
}