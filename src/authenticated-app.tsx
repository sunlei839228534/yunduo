import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { ScheduleOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
import { Routes, Route } from 'react-router-dom'
import type { MenuProps } from 'antd';
import styled from '@emotion/styled';
import { ReactComponent as SoftwareLogo } from 'assets/pic/logo.svg'
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { routerConfig } from 'router'
import { useAuth } from 'context/auth';


const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
  { key: '/student', icon: <UserOutlined />, label: '学生管理' },
  { key: '/course', icon: <ScheduleOutlined />, label: '课程管理' },
  { key: '/class', icon: <TeamOutlined />, label: '班级管理' }
];

export const AuthenticatedApp: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

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
      <PageHeader style={{ padding: '0 16px' }}>
        <PageHeaderLeft>
          <Logo />
        </PageHeaderLeft>
        <PageHeaderRight>
          <Dropdown overlay={<OverlayAvatar logout={logout} />}>
            <Avatar style={{ background: 'rgb(24, 144, 255)' }}>孙</Avatar>
          </Dropdown>
        </PageHeaderRight>
      </PageHeader>
      <Layout className="site-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <Menu onClick={changeMenuItem} theme="dark" selectedKeys={[selectedKey]} forceSubMenuRender mode="inline" items={items} />
        </Sider>
        <Content style={{ margin: '32px' }}>
          <Routes >
            {routerConfig.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const OverlayAvatar = ({ logout }: { logout: () => void }) => {
  return <Menu items={[{ key: 'logout', label: <a onClick={logout}>登出</a> }]} />
}

const PageHeader = styled(Header)`
  display: flex;
  justify-content:space-between ;
`
const PageHeaderLeft = styled.div`
  margin: 0 2rem;
`

const PageHeaderRight = styled.div`
  margin: 0 2rem;
`

const Logo = styled(SoftwareLogo)`
  width: 12rem;
  height: 6.4rem;
  padding: .5rem 0;
  box-sizing: border-box;
`