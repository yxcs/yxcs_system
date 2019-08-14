import React, { Component } from 'react';
import './link.less'

import { Form, Input, Button } from 'antd';
class LinkEdit extends Component {

  render () {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        md: { span: 4, offset: 4 }
      },
      wrapperCol: {
        md: { span: 6 }
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        md: { span: 6, offset: 8 }
      },
    };

    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="标题"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入书签标题',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="text" />
            )}
          </Form.Item>
          <Form.Item
            label="链接"
          >
            {getFieldDecorator('url', {
              rules: [{
                required: true, message: '请输入书签链接',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="text" />
            )}
          </Form.Item>
          <Form.Item
            label="type"
          >
            {getFieldDecorator('type', {
              rules: [{
                required: true, message: '请选择类型',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="text" />
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const linksForm = Form.create({ name: 'linksForm' })(LinkEdit);
export default linksForm