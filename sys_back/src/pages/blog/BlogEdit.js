import React, { Component } from 'react';
import './blog.less'
import http from '../../services/blog';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
  Form, Input, Radio, Select, Checkbox, Button, message
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

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
      source: '1',
      subTypeList: []
    }
  }

  componentDidMount() {
    let subTypeList = type[0].subType;
    subTypeList = subTypeList.map(item => {
      return <Option key={item.key} value={item.key}>{item.name}</Option>
    })
    this.setState({ subTypeList })
  }

  onTitleChange = (v) => {
    this.setState({
      title: v.target.value
    })
  }

  onAbstractChange = (v) => {
    this.setState({
      absrtact: v.target.value
    })
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onTypeChange = (v) => {
    const currType = v.target.value;
    let subTypeList = [];
    type.forEach(item => {
      if(item.key === currType) {
        subTypeList = item.subType;
      }
    })
    subTypeList = subTypeList.map(item => {
      return <Option key={item.key} value={item.key}>{item.name}</Option>
    })
    this.setState({
      type: currType,
      subTypeList: [...subTypeList]
    })
  }

  onSubTypeChange = (v) => {

  }

  onSourceChange = (v) => {

  }

  handleSubmit = (e) => {
    const { title, editorState, type } = this.state;
    e.preventDefault();
    if (!title) {
      message.success('请填写标题');
      return false;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          draft: !values.draft,           //  取反
          type: values.type,
          subType: values.subType,
          source: values.source,
          content: '',
          title: title,
          abstract: values.abstract.substr(0, 66) + '...'
        }
        params.content = editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        console.log(editorState.getCurrentContent())
        console.log(convertToRaw(editorState.getCurrentContent()))
        console.log(params.content)
        http.insertArticle(params).then(res => {
          if (res.data.status === 200 && res.data.data === 1) {
            message.success('添加成功');
            if (values.draft) {
              this.props.history.push('/blog/list');
            } else {
              this.props.history.push('/blog/draft');
            }
          }
        })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { subTypeList } = this.state;

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
                }],
                initialValue: '1'
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
            <Form.Item label="摘要">
             {getFieldDecorator('abstract', {
                rules: [{
                  required: true, message: '请添加摘要'
                }]
              })(
                <TextArea onChange={this.onAbstractChange.bind(this)} placeholder="填写简介，66字以内"></TextArea>
              )}
            </Form.Item>
            <Form.Item label="标签">
             {getFieldDecorator('subType', {
                rules: [{
                  required: true, message: '请添加标签',
                }]
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择 多选"
                  onChange={this.onSubTypeChange.bind(this)}
                  style={{ width: '100%' }}
                >
                  {subTypeList}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="来源">
              {getFieldDecorator('source', {
                rules: [{
                  required: true, message: '请选择来源',
                }],
                initialValue: '1'
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
                initialValue: false
              })(
                <Checkbox>直接发送</Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedBlogEditForm = Form.create({ name: 'blog_edit' })(BlogEdit);

export default WrappedBlogEditForm