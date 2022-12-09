import { Menu, MenuProps, } from 'antd'
import { useMenu } from 'utils/use-menu'
import { Outlet } from 'react-router'
import { StudentFormModal } from 'components/student'
import { NavLink } from 'react-router-dom'

const items: MenuProps['items'] = [{
  label: <NavLink to="manage">学员管理</NavLink>,
  key: '/student/manage'
}]

export const StudentScreen = () => {
  const { selectedKey, changeMenuItem } = useMenu(items)

  return (
    <div>
      <Menu defaultSelectedKeys={[selectedKey]} onClick={changeMenuItem} items={items} mode="horizontal" />
      <Outlet />
      <StudentFormModal />
    </div>
  )
}