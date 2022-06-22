import { Menu, MenuProps, } from 'antd'
import { useMenu } from 'utils/use-menu'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'

const items: MenuProps['items'] = [{
  label: <NavLink to="add">新建课程</NavLink>,
  key: '/course/add'
}, {
  label: <NavLink to="manage">管理课程</NavLink>,
  key: '/course/manage'
}]

export const CourseScreen = () => {
  const { selectedKey, changeMenuItem } = useMenu(items)

  return (
    <div>
      <Menu defaultSelectedKeys={[selectedKey]} onClick={changeMenuItem} items={items} mode="horizontal" />
      <Outlet />
    </div>
  )
}