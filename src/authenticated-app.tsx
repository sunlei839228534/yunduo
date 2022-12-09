import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { ScheduleOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styled from '@emotion/styled';
import { ReactComponent as SoftwareLogo } from 'assets/pic/softwareLogo.svg'
import { useElements } from 'router'
import { useProvider } from 'context/provider';
import { useMenu } from 'utils/use-menu';

const { Header, Content, Sider } = Layout;


const items: MenuProps['items'] = [
  { key: '/student', icon: <UserOutlined />, label: '学员管理' },
  { key: '/course', icon: <ScheduleOutlined />, label: '课程管理' },
  // { key: '/class', icon: <TeamOutlined />, label: '班级管理' }
];

export const AuthenticatedApp: React.FC = () => {
  const { selectedKey, changeMenuItem } = useMenu(items)
  const { logout, user } = useProvider()
  const element = useElements()
  const [collapsed, setCollapsed] = useState(false);


  return (
    <div>
      <Layout style={{ height: '100vh' }}>
        <PageHeader style={{ padding: '0 16px' }}>
          <PageHeaderLeft>
            <Logo />
          </PageHeaderLeft>
          <PageHeaderRight>
            <Dropdown overlay={<OverlayAvatar logout={logout} />}>
              <Avatar style={{ background: 'rgb(24, 144, 255)' }}>{user?.user.nickname}</Avatar>
            </Dropdown>
          </PageHeaderRight>
        </PageHeader>
        <Layout >
          <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <Menu
              onClick={changeMenuItem}
              theme="dark"
              selectedKeys={[selectedKey]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Content style={{ padding: '1.6rem', background: '#fff', overflowY: 'auto' }}>
            {element}
          </Content>
        </Layout>
      </Layout>
    </div>

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