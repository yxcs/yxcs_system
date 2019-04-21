import React, { Component } from 'react';
import './login.less';
import {
  Form, Icon, Input, Button,
} from 'antd';
class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login__bg">
        <div className="login__box--container">
          <div className="login__box--from">
            <p className="title">管理员登录</p>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入登录密码' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                 <a href="">注册</a>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginPage);

export default WrappedNormalLoginForm;
