import React, { Component } from 'react';
import './blog.less'
import http from '../../services/blog';

import {
  Form, Input, Radio, Select, Checkbox, Button, message, Upload, Icon
} from 'antd';

import Editor from 'for-editor'

import config from '../../config'

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
      id: '',
      title: '',
      type: '1',
      subType: '11',
      source: '1',
      subTypeList: [],
      abstract: [],
      markValue: '',
      draft: true,
      coverImg: '',
      fileList: [{url: ''}]
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    let subTypeList = type[0].subType;
    subTypeList = subTypeList.map(item => {
      return <Option key={item.key} value={item.key}>{item.name}</Option>
    })
    this.setState({ subTypeList, id })
    this.getDetail(id)
  }

  getDetail = (id) => {
    http.getArticle({id}).then(res => {
      if (res.status === 200 && res.data.status === 200) {
        const detail = res.data.data;
        let subTypeList = [];
        type.forEach(item => {
          if(+item.key === +detail.type) {
            subTypeList = item.subType;
          }
        })
        subTypeList = subTypeList.map(item => {
          return <Option key={item.key} value={item.key}>{item.name}</Option>
        })
        this.setState({
          title: detail.title,
          markValue: detail.content,
          type: '' + detail.type,
          abstract: detail.abstract,
          subType: detail.subType,
          source: '' + detail.source,
          coverImg : detail.coverImg,
          subTypeList: [...subTypeList],
          fileList: [{url: detail.coverImg}]
        })
      }
    })
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
      subTypeList: [...subTypeList],
      subType: []
    })
  }

  onMarkdownchange = (value) => {
    this.setState({
      markValue: value
    })
  }

  handleSubmit = (e) => {
    const { id, markValue, coverImg } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          draft: !values.draft,           //  取反
          type: values.type,
          subType: values.subType,
          source: values.source,
          content: markValue,
          title: values.title,
          abstract: values.abstract.substr(0, 66) + '...',
          coverImg: coverImg
        }
        http.updateArticle({ id, params }).then(res => {
          if (res.data.status === 200 && res.data.data === 1) {
            message.success('更新成功');
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

  beforeUpload = (file) => {
    const type = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    const size = 2
    if (type.indexOf(file.type) === -1) {
      message.error('请上传jpeg、jpg、png、gif格式的图片')
      return false
    }
    if (size * 1024 * 1024 < file.size) {
      message.error('图片在2M以内')
      return false
    }
    return true
  }

  handleChange = ({file, fileList}) => {
    if (file && file.response) {
      this.setState({
        coverImg: file.response.url,
        fileList
      })
    }
  }

  normFile = e => {
    console.log(e)
    e.file = {}
    e.fileList = []
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { subTypeList, coverImg } = this.state;

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

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="blog__edit--wrap">
        <div className="blog-back"><Button onClick={this.goBack}>返回</Button></div>
        <div className="blog__markdown--editer">
          <Editor value={this.state.markValue} onChange={this.onMarkdownchange.bind(this)} />
        </div>

        <div className="form-wrap">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="标题">
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请填写标题'
                }],
                initialValue: this.state.title
              })(
                <Input onChange={this.onTitleChange.bind(this)} placeholder="填写标题" />
              )}
            </Form.Item>
            <Form.Item label="分类">
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择分类',
                }],
                initialValue: this.state.type
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
                }],
                initialValue: this.state.abstract
              })(
                <TextArea onChange={this.onAbstractChange.bind(this)} placeholder="填写简介，66字以内"></TextArea>
              )}
            </Form.Item>
            <Form.Item label="标签">
             {getFieldDecorator('subType', {
                rules: [{
                  required: true, message: '请添加标签',
                }],
                initialValue: this.state.subType
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择 多选"
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
                initialValue: this.state.source
              })(
                <Radio.Group>
                  {
                    source.map(item => {
                      return <Radio.Button key={item.key} value={item.key}>{item.name}</Radio.Button>
                    })
                  }
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="封面图片">
              <div className="coverImg">
                {getFieldDecorator('coverImg', {
                })(
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${config.static_url}/uploadfile`}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                    {coverImg ? <img src={coverImg} alt="avatar" /> : uploadButton}
                  </Upload>
                )}
              </div>
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