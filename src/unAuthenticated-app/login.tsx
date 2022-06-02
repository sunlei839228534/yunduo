import { Form, Input } from "antd"
import { LongButton } from "unAuthenticated-app"
import { AuthForm } from 'types/user'
import { useAuth } from "context/auth"
import { customError } from "components/lib"


export const LoginScreen = ({ onError }: { onError: (error: customError) => void }) => {
  const { login } = useAuth()
  const handleSubmit = async (data: AuthForm) => {
    try {
      await login(data)
    } catch (e) {
      onError(e as customError)
    }
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name="email" rules={[{ required: true, message: '请输入Email' }]}>
      <Input placeholder="请输入Email" id="email"></Input>
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
      <Input type="password" placeholder="请输入密码" id="password"></Input>
    </Form.Item>
    <LongButton type="primary" htmlType="submit">
      登陆
    </LongButton>
  </Form>
}