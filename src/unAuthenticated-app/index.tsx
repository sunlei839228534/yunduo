import { useAuth } from "context/auth"
import { Button, Card } from 'antd'
import { useState } from "react"
import styled from "@emotion/styled"
import softwareLogo from 'assets/pic/softwareLogo.svg'
import left from 'assets/pic/left.svg'
import right from 'assets/pic/right.svg'
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import { customError, ErrorBox } from 'components/lib'

export const UnAuthenticatedApp = () => {
  const { user, login, register } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<customError | null>(null)

  const changeIsReigister = () => {
    setIsRegister(!isRegister)
    setError(null)
  }

  return <Container>
    <Header />
    <Background />
    <ShadowCard>
      <Title>{isRegister ? '请注册' : "请登陆"}</Title>
      <ErrorBox error={error}></ErrorBox>
      {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
      <Button type='link' onClick={changeIsReigister} >{isRegister ? '已经有账号了?直接登录' : '没有账号?注册新账号'}</Button>
    </ShadowCard>
  </Container>
}

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94,108,132);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`

const Header = styled.header`
  background: url(${softwareLogo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment:fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem ) /2 ) - 3.2rem),calc(((100vw - 40rem ) /2 ) - 3.2rem),cover; 
  background-image:  url(${left}),url(${right});
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  text-align: center;
`