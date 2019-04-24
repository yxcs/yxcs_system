import React, { Component } from 'react';
import './blog.less'
import http from '../../services/blog';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
  Form, Input, Radio, Select, Checkbox, Button
} from 'antd';

const { Option } = Select;

const type = [
  {
    key: '1',
    name: '前端',
    subType: [
      {key: '11', name: 'js'},
      {key: '12', name: 'css'},
      {key: '13', name: 'html'},
      {key: '14', name: 'react'},
      {key: '15', name: 'vue'},
      {key: '16', name: 'jquery'},
      {key: '101', name: '其他'},
    ]
  }, {
    key: '2',
    name: '后端',
    subType: [
      {key: '21', name: 'node'},
      {key: '22', name: 'express'},
      {key: '23', name: 'koa'},
      {key: '24', name: 'php'},
      {key: '25', name: '搭建'},
      {key: '26', name: '配置'},
      {key: '201', name: '其他'},
    ]
  }, {
    key: '3',
    name: '面试',
    subType: [
      {key: '31', name: '面经'},
      {key: '32', name: '问题'},
      {key: '33', name: '常识'},
      {key: '301', name: '其他'},
    ]
  }, {
    key: '4',
    name: '杂文',
    subType: [
      {key: '41', name: '散文'},
      {key: '42', name: '连载'},
      {key: '43', name: '记录'},
      {key: '401', name: '其他'},
    ]
  }
]

const source = [
  {key: '1', name: '原创'},
  {key: '2', name: '转载'},
]
class BlogEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: null,
      type: '1',
      subType:'11',
      source: '1'
    }
  }

  componentDidMount() {

  }

  onTitleChange = (v) => {
    this.setState({
      title: v.target.value
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onTypeChange = (v) => {

  }

  onSubTypeChange = (v) => {

  }

  onSourceChange = (v) => {

  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { editorState } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 4,
        },
        sm: {
          span: 10,
          offset: 4,
        },
      },
    };

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return (
      <div className="blog__edit--wrap">
        <div className="blog__edit--title">
          <Input onChange={this.onTitleChange.bind(this)} placeholder="填写标题" />
        </div>
        <Editor
          localization={{ locale: 'zh' }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange.bind(this)}
        />

        <div className="form-wrap">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="分类">
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择分类',
                }]
              })(
                <Radio.Group onChange={this.onTypeChange.bind(this)}>
                {
                  type.map(item => {
                    return <Radio.Button key={item.key} value={item.key}>{item.name}</Radio.Button>
                  })
                }
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="标签">
             {getFieldDecorator('subType', {
                rules: [{
                  required: true, message: '请添加标签',
                }],
                initialValue: ['a10', 'c12']
              })(
                <Select
                  mode="tags"
                  placeholder="Please select"
                  onChange={this.onSubTypeChange.bind(this)}
                  style={{ width: '100%' }}
                >
                  {children}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="来源">
              {getFieldDecorator('source', {
                rules: [{
                  required: true, message: '请选择来源',
                }]
              })(
                <Radio.Group onChange={this.onSourceChange}>
                  {
                    source.map(item => {
                      return <Radio.Button key={item.key} value={item.key}>{item.name}</Radio.Button>
                    })
                  }
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('draft', {
                valuePropName: 'checked',
              })(
                <Checkbox>直接发送</Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </div>

        {/* <textarea
          disabled
          value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    )
  }
}

const WrappedBlogEditForm = Form.create({ name: 'blog_edit' })(BlogEdit);

export default WrappedBlogEditForm