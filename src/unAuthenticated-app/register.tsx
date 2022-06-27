import { Form, Button, Input } from "antd"
import { LongButton } from "unAuthenticated-app"
import { RegisterForm } from 'types/user'
import { useProvider } from "context/provider"
import { customError } from "components/lib"


export const RegisterScreen = ({ onError }: { onError: (error: customError) => void }) => {
  const { register } = useProvider()
  const handleSubmit = async (data: RegisterForm) => {
    try {
      await register(data)
    } catch (e) {
      onError(e as customError)
    }
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name="nickname" rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder="请输入用户名" id="nickname"></Input>
    </Form.Item>
    <Form.Item name="email" rules={[{ required: true, message: '请输入Email' }]}>
      <Input placeholder="请输入Email" id="email"></Input>
    </Form.Item>
    <Form.Item name="password1" rules={[{ required: true, message: '请输入密码' }]}>
      <Input type="password" placeholder="请输入密码" id="password1"></Input>
    </Form.Item>
    <Form.Item name="password2" rules={[{ required: true, message: '请再次输入密码' }]}>
      <Input type='password' placeholder="请再次输入密码" id="password2"></Input>
    </Form.Item>
    <LongButton type="primary" htmlType="submit">
      注册
    </LongButton>
  </Form>
}