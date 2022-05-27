import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  ScheduleOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Routes, Route, Navigate } from 'react-router-dom'
import { StudentScreen } from 'screen/student';
import type { MenuProps } from 'antd';
import styled from '@emotion/styled';
import { ReactComponent as SoftwareLogo } from 'assets/pic/logo.svg'
import { useNavigate, useLocation } from 'react-router';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { CourseScreen } from 'screen/course';
import { ClassScreen } from 'screen/class';
import { routerConfig } from 'router'


const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
  { key: '/student', icon: <UserOutlined />, label: '学生管理' },
  { key: '/course', icon: <ScheduleOutlined />, label: '课程管理' },
  { key: '/class', icon: <TeamOutlined />, label: '班级管理' },
];

export const AuthenticatedApp: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(pathname)

  const changeMenuItem: MenuClickEventHandler = ({ key, keyPath }) => {
    navigate(key)
  }
  useEffect(() => {
    setSelectedKey(pathname)
  }, [pathname])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: '0 16px' }}>
        <SoftwareLogo width='12rem' height="6.4rem" />
      </Header>
      <Layout className="site-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <Menu onClick={changeMenuItem} theme="dark" selectedKeys={[selectedKey]} forceSubMenuRender mode="inline" items={items} />
        </Sider>
        <Content style={{ margin: '32px' }}>
          <Routes >
            {routerConfig.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
            {/* <Route path='/student' element={<StudentScreen />}></Route>
            <Route path='/course' element={<CourseScreen />}></Route>
            <Route path='/class' element={<ClassScreen />}></Route>
            <Route index element={<Navigate replace={true} to='/student'></Navigate>}></Route> */}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};


