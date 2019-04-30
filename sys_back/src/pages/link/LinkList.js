import React, { Component } from 'react';
import './link.less'
import http from '../../services/link';
import tool from '../../utils/tool'

import {
  Form, Input, Modal, Button, Select, message, Table, Popconfirm
} from 'antd';

const { Option } = Select;

const linkType = [
  {key: '1', value: 'js'},
  {key: '2', value: 'css'},
  {key: '3', value: 'react'},
  {key: '4', value: 'vue'},
  {key: '5', value: 'node'},
  {key: '6', value: '面试'},
  {key: '7', value: 'PHP'},
  {key: '8', value: 'python'},
  {key: '9', value: '产品'},
  {key: '10', value: '规划'},
]
class LinkList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      lists: [],
      pager: {
        size: 10,
        page: 1
      },
      link: {
        id: '',
        title: '',
        url: '',
        type: ''  
      }
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    const { pager } = this.state
    http.getLinks({}, pager.size, pager.page).then(res => {
      if (res.data.status === 200) {
        let lists = res.data.data;
        lists = lists.map(item => {
          linkType.forEach(sItem => {
            if (item.type === sItem.type) {
              item.typeText = sItem.value
            }
          })
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
    }, _ =>{
      this.getList();
    })
  }


  onEditLink = (e) => {
    this.setState({
      visible: true,
      link: {
        id: e._id,
        title: e.title,
        url: e.url,
        type: e.type
      }
    })
  }
  onDelLink = (id) => {
    http.deleteLink(id).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('删除成功');
        this.getList();
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  addLink = () => {
    this.setState({
      visible: true,
      link: {
        id: '',
        title: '',
        url: '',
        type: ''  
      }
    })
  }

  validateWebsite = (rule, value, callback) => {
    const strRegex = '^((https|http|ftp|rtsp|mms)?://)'
      + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
      + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
      + '|' // 允许IP和DOMAIN（域名）
      + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
      + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
      + '[a-z]{2,6})' // first level domain- .com or .museum
      + '(:[0-9]{1,4})?' // 端口- :80
      + '((/?)|' // a slash isn't required if there is no file name
      + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
    const WEB_REG = new RegExp(strRegex); 
    if (!WEB_REG.test(value)) {
      callback('请输入正确的链接');
    }
    callback();
  }

  handleSubmit = (e) => {
    const { link } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          title: values.title,
          url: values.url,
          type: values.type
        }
        if (link.id) {
          http.updateLink({id: link.id, params}).then(res => {
            if (res.data.status === 200 && res.data.data === 1) {
              message.success('编辑成功');
              this.setState({
                visible: false,
                link: {
                  id: '',
                  title: '',
                  url: '',
                  type: ''  
                }
              })
              this.getList()
            }
          })
        } else {
          http.insertLink(params).then(res => {
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
    const { pager, link } = this.state;

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
        title: '链接',
        dataIndex: 'url',
        key: 'url',
        render: (v) => {
          return <Button size="small" type="dashed" href={v}>跳转</Button>
        }
      }, {
        title: '作者',
        dataIndex: 'authorName',
        key: 'authorName',
      }, {
        title: '封面',
        dataIndex: 'coverImg',
        key: 'coverImg',
        render: (v, r, i) => {
          if(v) {
            return <img width="30" src={v}></img>
          }
          return '';
        }
      }, {
        title: '分类',
        dataIndex: 'typeText',
        key: 'typeText',
      }, {
        title: '创建时间',
        dataIndex: 'createText',
        key: 'createText',
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
        <Modal
          title={link.id ? '编辑书签' : '添加书签'}
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
                initialValue: link.title
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
                  validator: this.validateWebsite,
                }],
                initialValue: link.url
              })(
                <Input type="text" />
              )}
            </Form.Item>
            <Form.Item
              label="类型"
            >
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择类型',
                }],
                initialValue: link.type + ''
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择类型"
                >
                  {
                    linkType.map(item => <Option key={item.key} value={item.key}>{item.value}</Option>)
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">{link.id ? '保存' : '添加'}</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const linksForm = Form.create({ name: 'linksForm' })(LinkList);
export default linksForm