import { Divider, Typography } from 'antd'
import { ClassModal } from 'components/class'
import { Outlet } from 'react-router'

const { Title } = Typography

export const ClassScreen = () => {
  return (
    <>
      <Title level={4}>班级管理</Title>
      <Divider />
      <Outlet />
      <ClassModal />
    </>
  )
}