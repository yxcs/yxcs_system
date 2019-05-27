import React, { Component } from 'react';
import './menu.less'
import { Button, Modal, Form, Input, Table, message, Popconfirm } from 'antd'
import http from '../../services/login'
import tool from '../../utils/tool'

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      menuValue: {
        id: '',
        menu_name: '',
        menu_key: '',
        menu_icon: '',
        menu_path: ''
      },
      superMenu: {
        id: '',
        name: '',
        key: '',
        icon: '',
        path: '',
        sub: []
      },
      lists: [],
      user: {}
    }
  }

  componentDidMount() {
    let user = localStorage.getItem('user')
    user = typeof user === 'string' ? JSON.parse(user) : user
    this.setState({ user })
    this.getMenuList(user.id);
  }


  handleShowAdd = () => {
    this.setState({
      menuValue: {
        id: '',
        menu_name: '',
        menu_key: '',
        menu_icon: '',
        menu_path: ''
      },
      superMenu: {
        id: '',
        name: '',
        key: '',
        icon: '',
        path: '',
        sub: []
      },
    })
    this.setState({
      visible: true
    })
  }

  handleHideAdd = () => {
    this.setState({
      visible: false,
      menuValue: {
        menu_name: '',
        menu_key: '',
        menu_icon: '',
        menu_path: ''
      },
      superMenu: {
        id: '',
        name: '',
        key: '',
        icon: '',
        path: '',
        sub: []
      }
    })
  }

  getMenuList = (id) => {
    this.handleHideAdd();
    http.getMenu({id}).then(res => {
      if (res.data.status === 200) {
        let lists = res.data.data;
        lists = lists.map(item => {
          item.updateText = tool.formatTime(item.updateAt);
          return item;
        })
        this.setState({
          lists,
          visible: false
        })
      }
    })
  }

  handleMenuAddSubmit = (e) => {
    const { menuValue, superMenu } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(superMenu)
        if (superMenu.id) {
          const params = {
            name: superMenu.name,
            key: superMenu.key,
            icon: superMenu.icon,
            path: superMenu.path
          }

          if (menuValue.id) {
            superMenu.sub = superMenu.sub.map(item => {
              if (item.id == menuValue.id) {
                item = {
                  id: item.id,
                  type: 2,
                  name: values.menu_name,
                  key: values.menu_key,
                  icon: values.menu_icon,
                  path: values.menu_path
                }
              }
              return item;
            })
            params.sub = [...superMenu.sub]
          } else {
            params.sub = [
              {
                id: Date.now(),
                type: 2,
                name: values.menu_name,
                key: values.menu_key,
                icon: values.menu_icon,
                path: values.menu_path
              },
              ...superMenu.sub
            ]
          }

          console.log({id: superMenu.id, params})

          http.updateMenu({id: superMenu.id, params}).then(res => {
            if (res.status === 200) {
              message.success('编辑成功');
              setTimeout(_ => {
                window.location.reload()
              }, 2000)
            }
          })

        } else {
          const params = {
            name: values.menu_name,
            key: values.menu_key,
            icon: values.menu_icon,
            path: values.menu_path,
          }

          if (menuValue.id) {
            http.updateMenu({id: menuValue.id, params}).then(res => {
              if (res.status === 200) {
                message.success('编辑成功');
                setTimeout(_ => {
                  window.location.reload()
                }, 2000)
              }
            })
          } else {
            http.addMenu(params).then(res => {
              if (res.status === 200) {
                message.success('添加成功');
                setTimeout(_ => {
                  window.location.reload()
                }, 2000)
              }
            })
          }

        }
      }
    });
  }

  onEditMenu = (v) => {
    this.setState({
      visible: true,
      menuValue: {
        id: v._id,
        menu_name: v.name,
        menu_key: v.key,
        menu_icon: v.icon,
        menu_path: v.path
      }
    })
  }

  onEditSubMenu = (v, superMenu) => {
    this.setState({
      visible: true,
      superMenu: {
        id: superMenu.id || superMenu._id,
        name: superMenu.name,
        key: superMenu.key,
        icon: superMenu.icon,
        path: superMenu.path,
        sub: [...superMenu.sub]
      },
      menuValue: {
        id: v.id,
        menu_name: v.name,
        menu_key: v.key,
        menu_icon: v.icon,
        menu_path: v.path
      }
    })
  }

  onAddSubMenu = (v) => {
    this.setState({
      visible: true,
      superMenu: {
        id: v._id,
        name: v.name,
        key: v.key,
        icon: v.icon,
        path: v.path,
        sub: [...v.sub]
      }
    })
  }

  onDelMenu = (v) => {
    http.deleteMenu(v._id).then(res => {
      if (res.status === 200 && res.data.data === 1) {
        message.success('删除成功');
        setTimeout(_ => {
          window.location.reload()
        }, 2000)
      }
    })
  }

  onDelSubMenu = (v, id) => {
    const list = this.state.lists;
    let delItem = {};
    list.forEach(item => {
      if (item._id === id) {
        delItem = item;
      }
    })
    delItem.sub = delItem.sub.filter(item => {
      return item.id !== v.id
    })
    const params = {
      type: delItem.type,
      name: delItem.name,
      key: delItem.key,
      icon: delItem.icon,
      path: delItem.path,
      sub: delItem.sub,
    }
    http.updateMenu({id, params}).then(res => {
      if (res.status === 200) {
        message.success('删除成功');
        setTimeout(_ => {
          window.location.reload()
        }, 2000)
      }
    })
  }

  expandedRowRender = (record, index, indent, expanded) => {
    const id = record._id;
    const superMenu = {
      id,
      name: record.name,
      key: record.key,
      icon: record.icon,
      path: record.path,
      sub: [...record.sub]
    }
    const columns = [{
      title: '级别',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '唯一标识',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    }, {
      title: '链接路由',
      dataIndex: 'path',
      key: 'path',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record, index) => {
        return (
          <div>
            <Button type="primary" size="small" onClick={this.onEditSubMenu.bind(this, record, superMenu)}>编辑</Button>
            <span className="btn-pad"></span>
            <Popconfirm title="确定删除吗？" okText="删除" cancelText="取消" onConfirm={this.onDelSubMenu.bind(this, record, id)}>
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }];

    return (
      <Table
        pagination={false}
        dataSource={record.sub}
        columns={columns}
        size="small"
        showHeader={true} />
    )
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { superMenu } = this.state;

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          span: 18,
          offset: 6,
        },
      },
    };

    const columns = [{
      title: '级别',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '唯一标识',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    }, {
      title: '链接路由',
      dataIndex: 'path',
      key: 'path',
    }, {
      title: '更新时间',
      dataIndex: 'updateText',
      key: 'updateText',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record, index) => {
        return (
          <div>
            <Button type="primary" size="small" onClick={this.onEditMenu.bind(this, record)}>编辑</Button>
            <span className="btn-pad"></span>
            <Button size="small" onClick={this.onAddSubMenu.bind(this, record)}>添加</Button>
            <span className="btn-pad"></span>
            <Popconfirm title="确定删除吗？" okText="删除" cancelText="取消" onConfirm={this.onDelMenu.bind(this, record)}>
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }];

    return (
      <div className="menu__content">
        <div className="menu__content--hrader">
          <Button onClick={this.handleShowAdd.bind(this)} type="primary">添加菜单</Button>
        </div>

        <Table
          pagination={false}
          dataSource={this.state.lists}
          columns={columns}
          size="small"
          expandedRowRender={this.expandedRowRender.bind(this)} />

        {
          this.state.visible ? (
            <Modal
              title={this.state.menuValue.menu_key?'编辑':'添加菜单'}
              visible={this.state.visible}
              footer={null}
              onCancel={this.handleHideAdd.bind(this)}
            >
              <Form {...formItemLayout} onSubmit={this.handleMenuAddSubmit}>

                {
                  superMenu.id ? (
                    <div>
                      <Form.Item label="父菜单名称">
                        <Input disabled value={superMenu.name}/>
                      </Form.Item>
                      <Form.Item label="父菜单标识">
                        <Input disabled value={superMenu.key}/>
                      </Form.Item>
                    </div>
                  ) : ''
                }

                <Form.Item label="菜单名称">
                  {getFieldDecorator('menu_name', {
                    rules: [{
                      required: true, message: '请输入菜单名称',
                    }],
                    initialValue: this.state.menuValue.menu_name
                  })(
                    <Input placeholder="菜单名称"/>
                  )}
                </Form.Item>
                <Form.Item label="GUID">
                  {getFieldDecorator('menu_key', {
                    rules: [{
                      required: true, message: '请填写唯一标识',
                    }],
                    initialValue: this.state.menuValue.menu_key
                  })(
                    <Input placeholder="全局唯一标识" />
                  )}
                </Form.Item>
                <Form.Item label="Icon">
                  {getFieldDecorator('menu_icon', {
                    initialValue: this.state.menuValue.menu_icon
                  })(
                    <Input placeholder="菜单左方图标"/>
                  )}
                </Form.Item>
                <Form.Item label="链接">
                  {getFieldDecorator('menu_path', {
                    rules: [{
                      required: true, message: '请填写链接',
                    }],
                    initialValue: this.state.menuValue.menu_path
                  })(
                    <Input placeholder="请填写链接"/>
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
              </Form>
            </Modal>
          ) : ''
        }
      </div>
    )
  }
}

const WrappedMenuAddForm = Form.create({ name: 'menu_add' })(MenuPage);

export default WrappedMenuAddForm