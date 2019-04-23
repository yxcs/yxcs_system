import React, { Component } from 'react';
import './menu.less'
import { Button, Modal, Form, Input } from 'antd'
import http from '../../services/login'

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
  handleShowAdd = () => {
    this.setState({
      visible: true
    })
  }

  handleHideAdd = () => {
    this.setState({
      visible: false
    })
  }

  handleMenuAddSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          name: values.menu_name,
          key: values.menu_key,
          icon: values.menu_icon,
          path: values.menu_path,
        }
        http.addMenu(params).then(res => {
          console.log(res)
        })
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;

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

    return (
      <div className="menu__content">
        <div>
          <Button onClick={this.handleShowAdd.bind(this)} type="primary">添加菜单</Button>
        </div>

        <Modal
          title="添加菜单"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleHideAdd.bind(this)}
        >
          <Form {...formItemLayout} onSubmit={this.handleMenuAddSubmit}>
            <Form.Item label="菜单名称">
              {getFieldDecorator('menu_name', {
                rules: [{
                  required: true, message: '请输入菜单名称',
                }],
              })(
                <Input placeholder="菜单名称"/>
              )}
            </Form.Item>
            <Form.Item label="GUID">
              {getFieldDecorator('menu_key', {
                rules: [{
                  required: true, message: '请填写唯一标识',
                }],
              })(
                <Input placeholder="全局唯一标识" />
              )}
            </Form.Item>
            <Form.Item label="Icon">
              {getFieldDecorator('menu_icon', {
              })(
                <Input placeholder="菜单左方图标"/>
              )}
            </Form.Item>
            <Form.Item label="链接">
              {getFieldDecorator('menu_path', {
                rules: [{
                  required: true, message: '请填写链接',
                }],
              })(
                <Input placeholder="请填写链接"/>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">添加</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedMenuAddForm = Form.create({ name: 'menu_add' })(MenuPage);

export default WrappedMenuAddForm