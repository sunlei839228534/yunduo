import { Outlet } from 'react-router'
import { CourseFormModal } from 'components/course'
import { Divider, Typography } from 'antd'

const { Title } = Typography

export const CourseScreen = () => (
  <>
    <Title level={4}>课程管理</Title>
    <Divider />
    <Outlet />
    <CourseFormModal />
  </>
)

