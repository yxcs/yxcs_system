import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom'
import PrivateRoute from '../components/routes/PrivateRoute';
import MenuPage from './menu/MenuPage'
import HomePage from './home/HomePage'
import BlogList from './blog/BlogList'
import BlogAdd from './blog/BlogAdd'
import BlogEdit from './blog/BlogEdit'
import BlogDraft from './blog/BlogDraft'

import LinkList from './link/LinkList'
import LinkEdit from './link/LinkEdit'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import http from '../services/login'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class LayoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      openKeys: [''],
      selectedKeys: ['HOME_PAGE_1'],
      menus: [],
      breadcrumb: [
        // {idx: 1, name: '首页', path: '/', key: 0,},
        // {idx: 2, name: '列表', path: '/list', key: 1,},
        // {idx: 3, name: '详情', path: '/detail', key: 2,},
      ]
    }
  }

  componentDidMount() {
    this.getMenuList();
  }

  getMenuList = () => {
    const pathname = this.props.location.pathname
    let {openKeys, selectedKeys} = this.state;
    http.getMenu().then(res => {
      if (res.data.status === 200) {
        const lists = res.data.data;
        lists.forEach(item => {
          if (item.sub.length) {
            item.sub.forEach(sItem => {
              if (sItem.path === pathname) {
                openKeys = [item.key];
                selectedKeys = [sItem.key]
              }
            })
          } else {
            if (item.path === pathname) {
              openKeys = [];
              selectedKeys = [item.key]
            }
          }
        })
        this.setState({
          openKeys,
          selectedKeys,
          lists,
          visible: false
        })
      }
    })
  }

  switchCollapse = (collapsed, type) => {
    this.setState({
      openKeys: collapsed
    })
  }

  menuItemSelect = (e) => {
    const lists = this.state.lists;
    let path = '/';
    lists.forEach(item => {
      if (item.type == 1 && item.sub.length) {
        item.sub.forEach(sItem => {
          if (e.key === sItem.key) {
            path = sItem.path;
          }
        })
      } else {
        if (e.key === item.key) {
          path = item.path;
        }
      }
    })
    this.setState({
      selectedKeys: [e.key]
    })
    this.props.history.push(path);
  }

  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider className="sider" width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              openKeys={this.state.openKeys}
              selectedKeys={this.state.selectedKeys}
              onOpenChange={this.switchCollapse.bind(this)}
              onSelect={this.menuItemSelect.bind(this)}
              theme="dark"
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.state.lists.map(item => {
                  let menu = '';
                  if (item.type == 1 && item.sub.length) {
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
              <Switch>
                <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
                <PrivateRoute exact path="/menu" component={MenuPage}></PrivateRoute>
                <PrivateRoute exact path="/blog/list" component={BlogList}></PrivateRoute>
                <PrivateRoute exact path="/blog/add" component={BlogAdd}></PrivateRoute>
                <PrivateRoute exact path="/blog/edit/:id" component={BlogEdit}></PrivateRoute>
                <PrivateRoute exact path="/blog/draft" component={BlogDraft}></PrivateRoute>
                <PrivateRoute exact path="/bookmark" component={LinkList}></PrivateRoute>
                <PrivateRoute exact path="/bookmark/edit" component={LinkEdit}></PrivateRoute>
                <Redirect exact from="*" to="/"/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default LayoutPage;