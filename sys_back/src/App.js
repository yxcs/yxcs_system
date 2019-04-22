import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from './components/routes/PrivateRoute';
import LoginPage from './pages/login/LoginPage'
import MenuPage from './pages/menu/MenuPage'
import HomePage from './pages/home/HomePage'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

import './App.css'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {type: 1, name: 'subnav 1', key: '1', icon: 'user', sub: [
          {type: 2, name: 'option1', key: '11', icon: '', path: '/option11', sub: []},
          {type: 2, name: 'option2', key: '12', icon: '', path: '/option12', sub: []},
          {type: 2, name: 'option3', key: '13', icon: '', path: '/option13', sub: []},
          {type: 2, name: 'option4', key: '14', icon: '', path: '/option14', sub: []},
        ]},
        {type: 1, name: 'subnav 2', key: '2', icon: 'laptop', sub: [
          {type: 2, name: 'option21', key: '21', icon: '', path: '/option21', sub: []},
          {type: 2, name: 'option22', key: '22', icon: '', path: '/option22', sub: []},
          {type: 2, name: 'option23', key: '23', icon: '', path: '/option23', sub: []},
        ]},
        {type: 1, name: 'subnav 4', key: '3', icon: 'notification', sub: [
          {type: 2, name: 'option31', key: '31', icon: '', path: '/option31', sub: []},
          {type: 2, name: 'option32', key: '32', icon: '', path: '/option32', sub: []},
          {type: 2, name: 'option33', key: '33', icon: '', path: '/option33', sub: []},
        ]},
        {type: 2, name: 'option4', key: '4', icon: 'laptop', path: '/option4', sub: []},
      ],
      breadcrumb: [
        {idx: 1, name: '首页', path: '/', key: 0,},
        {idx: 2, name: '列表', path: '/list', key: 1,},
        {idx: 3, name: '详情', path: '/detail', key: 2,},
      ]
    }
  }

  switchCollapse = (collapsed, type) => {
    console.log(collapsed, type)

  }

  menuItemSelect = (e) => {
    console.log(e)
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={LoginPage}></Route>
          <Layout>
            <Header className="header">
              <div className="logo" />
            </Header>
            <Layout>
              <Sider className="sider" width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['11']}
                  defaultOpenKeys={['1']}
                  onOpenChange={this.switchCollapse.bind(this)}
                  onSelect={this.menuItemSelect.bind(this)}
                  theme="dark"
                  style={{ height: '100%', borderRight: 0 }}
                >
                  {
                    this.state.menus.map(item => {
                      let menu = '';
                      if (item.type === 1 && item.sub.length) {
                        menu = (
                          <SubMenu key={item.key} title={<span> {item.icon && <Icon type={item.icon} />}{item.name}</span>}>
                            {
                              item.sub.map(sItem => {
                                return <Menu.Item key={sItem.key}>{sItem.name}</Menu.Item>
                              })
                            }
                          </SubMenu>
                        )
                      } else {
                        menu = <Menu.Item key={item.key}>{item.icon && <Icon type={item.icon} />}{item.name}</Menu.Item>
                      }
                      return menu;
                    })
                  }
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                {
                  this.state.breadcrumb.map(item => {
                    return <Breadcrumb.Item key={item.key}>{item.name}</Breadcrumb.Item>
                  })
                }
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0}}>
                  <Route path="/" exact component={HomePage}></Route>
                  <Route path="/menu" exact component={MenuPage}></Route>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </Router>
    )
  }
}

export default App;
