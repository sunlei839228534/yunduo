import styled from '@emotion/styled'
import { Row, ButtonNoPadding } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/airchina.svg'
import { Routes, Route, Navigate } from 'react-router-dom'
import { StudentScreen } from 'screen/student'
import { CourseScreen } from 'screen/course'
import { ClassScreen } from 'screen/class'

export const AuthenticatedApp = () => {
  return (<Container>
    <PageHeader />
    <Main>
      <Routes>
        <Route path='/student' element={<StudentScreen />}></Route>
        <Route path='/course' element={<CourseScreen />}></Route>
        <Route path='/class' element={<ClassScreen />}></Route>
        <Route index element={<Navigate replace={true} to="/student"></Navigate>}></Route>
      </Routes>
    </Main>
  </Container>)
}

export const PageHeader = () => {
  return (<Header between={true}>
    <HeaderLeft gap={3} >
      <ButtonNoPadding style={{ width: '9rem' }} type="text" >
        <SoftwareLogo width="3rem" color="rgb(38,132,255)"></SoftwareLogo>
      </ButtonNoPadding>
      <div>学生</div>
      <div>课表</div>
      <div>班级</div>
    </HeaderLeft>
    <HeaderRight>2</HeaderRight>
  </Header>)
}

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr;
height: 100vh;
`


const Header = styled(Row)`
  padding: 1.6rem 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div`
`

const Main = styled.main`
  display: flex;
  overflow: hidden;
`