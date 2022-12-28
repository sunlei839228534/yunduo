import { Divider, Typography } from 'antd'
import { Outlet } from 'react-router'
import { StudentFormModal } from 'components/student'

const { Title } = Typography

export const StudentScreen = () => {
  return (
    <div>
      <Title level={4}>学员管理</Title>
      <Divider />
      <Outlet />
      <StudentFormModal />
    </div>
  )
}