import React, { Component } from 'react'
import './bookmark.less'
import http from '../../services/tool'
import tool from '../../utils/tool'

import { Tooltip, Button, Popconfirm, Table, Form, Modal, Input, Select, message, } from 'antd'

const { Option } = Select;
const sourceTxt = {
  bookmark: '书签',
  toutiao: '头条',
  weixin: '公众号',
  shequ: '社区'
}
const typeTxt = {
  1: '面试',
  2: '资源',
  3: '小程序',
  4: '微信',
  5: '移动端',
  6: 'github',
  7: '服务器',
  8: '文档',
  9: '学习'
}
class BookmarkView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pager: {
        size: 10,
        page: 1
      },
      visible: false,
      params: {
        title: '',
        source: '',
        linkTo: '',
        coverImg: '',
        sourceType: '',
        type: ''
      }
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    const { pager } = this.state
    http.getBookmarkList({}, pager.size, pager.page).then(res => {
      if (res.data.status === 200) {
        let lists = res.data.data;
        lists = lists.map(item => {
          item.sourceTxt = sourceTxt[item.sourceType]
          item.typeTxt = typeTxt[item.type]
          item.createText = tool.formatTime(item.createAt);
          item.updateText = tool.formatTime(item.updateAt);
          return item;
        })
        pager.total = res.data.total;
        this.setState({
          lists,
          pager
        })
      }
    })
  }

  onTableChange = (page, size) => {
    const { pager } = this.state;
    pager.page = page;
    this.setState({
      pager
    }, _ => {
      this.getList();
    })
  }

  validateWebsite = (rule, value, callback) => {
    const strRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/; 
    const WEB_REG = new RegExp(strRegex); 
    if (!WEB_REG.test(value)) {
      callback('请输入正确的链接');
    }
    callback();
  }

  addLink = () => {
    this.setState({
      visible: true,
      params: {
        title: '',
        source: '',
        linkTo: '',
        coverImg: '',
        sourceType: '',
        type: ''
      }
    })
  }

  onEditLink = (e) => {
    this.setState({
      visible: true,
      params: {
        id: e._id,
        title: e.title,
        source: e.source,
        linkTo: e.linkTo,
        coverImg: e.coverImg,
        sourceType: e.sourceType,
        type: e.type
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      params: {
        title: '',
        source: '',
        linkTo: '',
        coverImg: '',
        sourceType: '',
        type: ''
      }
    })
  }

  onDelLink = (id) => {
    http.deleteBookmark(id).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('删除成功');
        this.getList();
      }
    })
  }

  handleSubmit = (e) => {
    const { params: {id = 0} } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          title: values.title,
          source: values.source,
          linkTo: values.linkTo,
          coverImg: values.coverImg,
          sourceType: values.sourceType,
          type: values.type
        }
        if (id) {
          http.updateBookmark({id, params}).then(res => {
            if (res.data.status === 200 && res.data.data === 1) {
              message.success('编辑成功');
              this.setState({
                visible: false,
                link: {
                  title: '',
                  source: '',
                  linkTo: '',
                  coverImg: '',
                  sourceType: '',
                  type: ''
                }
              })
              this.getList()
            }
          })
        } else {
          http.insertBookmark(params).then(res => {
            if (res.data.status === 200 && res.data.data === 1) {
              message.success('添加成功');
              this.setState({
                visible: false
              })
              this.getList()
            }
          })
        }
      }
    })
  }

  render () {
    const { pager, params } = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        md: { span: 4, offset: 3 }
      },
      wrapperCol: {
        md: { span: 12 }
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        md: { span: 12, offset: 7 }
      },
    };
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 400
      }, {
        title: '路由',
        dataIndex: 'linkTo',
        key: 'linkTo',
        render: (v) => {
          return <Tooltip placement="top" title={v}><Button size="small" type="dashed" href={v}>跳转</Button></Tooltip>
        }
      }, {
        title: '来源',
        dataIndex: 'source',
        key: 'source',
      }, {
        title: '封面',
        dataIndex: 'coverImg',
        key: 'coverImg',
        render: (v, r, i) => {
          if(v) {
            return <Tooltip placement="top" title={<div className="tooltip-wrap"><img className="tooltip-img" alt="封面图片" src={v}></img></div>}><img alt="封面图片" width="30" src={v}></img></Tooltip>
          }
          return '';
        }
      }, {
        title: '渠道来源',
        dataIndex: 'sourceTxt',
        key: 'sourceTxt',
      }, {
        title: '分类',
        dataIndex: 'typeTxt',
        key: 'typeTxt',
      }, {
        title: '更新时间',
        dataIndex: 'updateText',
        key: 'updateText',
      }, {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        render: (id, record, index) => {
          return (
            <div>
              <Button type="primary" size="small" onClick={this.onEditLink.bind(this, record)}>编辑</Button>
              <span className="btn-pad"></span>
              <Popconfirm title="确定删除吗？" okText="删除" cancelText="取消" onConfirm={this.onDelLink.bind(this, id)}>
                <Button type="danger" size="small">删除</Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ]

    return (
      <div>
        <div className="link__content--header">
          <Button onClick={this.addLink} type="primary">添加书签</Button>
        </div>
        <Table
          dataSource={this.state.lists}
          columns={columns}
          size="small"
          rowKey={record => record._id}
          pagination={
            {
              current: pager.page,
              pageSize: pager.size,
              total: pager.total,
              onChange: this.onTableChange
            }
          } />
          {
            this.state.visible ? (
              <Modal
                title={params.id ? '编辑书签' : '添加书签'}
                visible={this.state.visible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Form.Item
                    label="标题"
                  >
                    {getFieldDecorator('title', {
                      rules: [{
                        required: true, message: '请输入书签标题',
                      }],
                      initialValue: params.title
                    })(
                      <Input placeholder="请输入标题" type="text" />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="链接"
                  >
                    {getFieldDecorator('linkTo', {
                      rules: [{
                        required: true, message: '请输入书签链接',
                      }, {
                        validator: this.validateWebsite,
                      }],
                      initialValue: params.linkTo
                    })(
                      <Input placeholder="请输入书签链接" type="text" />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="来源"
                  >
                    {getFieldDecorator('source', {
                      rules: [{
                        required: true, message: '请输入书签来源',
                      }],
                      initialValue: params.source
                    })(
                      <Input placeholder="请输入书签来源" type="text" />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="封面"
                  >
                    {getFieldDecorator('coverImg', {
                      rules: [{
                        required: false, message: '请输入书签封面',
                      }],
                      initialValue: params.coverImg
                    })(
                      <Input placeholder="请输入书签封面" type="text" />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="渠道来源"
                  >
                    {getFieldDecorator('sourceType', {
                      rules: [{
                        required: true, message: '请输入书签渠道来源',
                      }],
                      initialValue: params.sourceType
                    })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder="请选择分类"
                      >
                        <Option value="">请选择分类</Option>
                        {
                          Object.keys(sourceTxt).map(item => <Option key={item} value={item}>{sourceTxt[item]}</Option>)
                        }
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="分类"
                  >
                    {getFieldDecorator('type', {
                      rules: [{
                        required: true, message: '请选择分类',
                      }],
                      initialValue: params.type + ''
                    })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder="请选择分类"
                      >
                        <Option value="">请选择分类</Option>
                        {
                          Object.keys(typeTxt).map(item => <Option key={item} value={item}>{typeTxt[item]}</Option>)
                        }
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">{params.id ? '更新' : '添加'}</Button>
                    <Button type="default" className="cancel-btn" onClick={this.handleCancel}>取消</Button>
                  </Form.Item>
                </Form>
              </Modal>
            ) : ''
          }
      </div>
    )
  }
}

const BookmarkForm = Form.create({ name: 'BookmarkForm' })(BookmarkView);
export default BookmarkForm