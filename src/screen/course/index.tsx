import { Menu, MenuProps, } from 'antd'
import { useMenu } from 'utils/use-menu'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import { CourseFormModal } from 'components/course'

const items: MenuProps['items'] = [{
  label: <NavLink to="manage">课程管理</NavLink>,
  key: '/course/manage'
}]

export const CourseScreen = () => {
  const { selectedKey, changeMenuItem } = useMenu(items)

  return (
    <div>
      <Menu defaultSelectedKeys={[selectedKey]} onClick={changeMenuItem} items={items} mode="horizontal" />
      <Outlet />
      <CourseFormModal />
    </div>
  )
}

