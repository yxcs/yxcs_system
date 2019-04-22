import React, { Component } from 'react';
import './login.less';
import {
  Form, Icon, Input, Button, message
} from 'antd';

import login from '../../services/login';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      user: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const params = { };
        if (this.state.isLogin) {
          params.username = values.login_userName;
          params.password = values.login_password;
          login.login(params).then(res => {
            if (res.status === 200) {
              message.success('登录成功')
              localStorage.setItem('J_TOKEN', res.data.token)
              this.setState({
                user: res.data.data
              })
              this.props.history.push('/')
            } else {
              message.error('服务器出错，稍后重试')
            }
          })
        } else {
          params.username = values.register_userName;
          params.password = values.register_password;
          login.register(params).then(res => {
            if (res.status === 200) {
              message.success('注册成功')
              this.setState({
                isLogin: true
              })
            }else {
              message.error('服务器出错，稍后重试')
            }
          }).catch(err => {
            if (err.status === 406) {
              message.error(err.data.message)
            } 
          })
        }
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('register_password')) {
      callback('两次输入的密码不相等');
    } else {
      callback();
    }
  }

  goLogin = (e) => {
    this.setState({
      isLogin: true
    })
  }

  goRegister = (e) => {
    this.setState({
      isLogin: false
    })
  }

  componentDidMount() {
    console.log(this)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login__bg">
        <div className="login__box--container">
          {this.state.isLogin ? (
            <div className="login__box--from">
              <p className="title">管理员登录</p>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('login_userName', {
                    rules: [{ required: true, message: '请输入用户名' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('login_password', {
                    rules: [{ required: true, message: '请输入登录密码' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </Form.Item>
                <div className="button__group">
                  <Button type="primary" htmlType="submit">登录</Button>
                  <a onClick={this.goRegister.bind(this)} href="javascript:void(0)">注册</a>
                </div>
              </Form>
            </div>
          ) : (
            <div className="login__box--from">
              <p className="title">管理员注册</p>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('register_userName', {
                    rules: [{ required: true, message: '请输入用户名' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('register_password', {
                    rules: [{ required: true, message: '请输入登录密码' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('register_password_confirm', {
                    rules: [
                      { required: true, message: '请再次输入密码' },
                      { validator: this.compareToFirstPassword }
                    ],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
                  )}
                </Form.Item>
                <div className="button__group">
                  <Button type="primary" htmlType="submit">注册</Button>
                  <a onClick={this.goLogin.bind(this)} href="javascript:void(0)">登录</a>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginPage);

export default WrappedNormalLoginForm;
