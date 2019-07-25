import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
  Form, Input, DatePicker, Select, message, Button,
} from 'antd';
import http from '../../services/tool';
moment.locale('zh-cn');
class ToolProjectAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      detail: {
        name: '',
        startTime: '',
        endTime: '',
        frontDevPersion: [],
        backDevPersion: [],
        testDevPersion: [],
        productDevPersion: [],
        website: '1',
        status: '1',
        docUrl: '',
        review: [],
        remarks: []
      }
    }
  }

  componentDidMount () {
    if (this.props.match.params && this.props.match.params.id) {
      this.setState({
        id: this.props.match.params.id
      })
      this.getDetail(this.props.match.params.id)
    }
  }

  getDetail = (id) => {
    http.getProById({id}).then(res => {
      if (res.data.status === 200 && res.data.data) {
        this.setState({
          detail: res.data.data
        })
      } else {
        message.error(res.data.message)
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          name: values.name,
          startTime: values.devTime[0],
          endTime: values.devTime[1],
          frontDevPersion: values.frontDevPersion,
          backDevPersion: values.backDevPersion,
          testDevPersion: values.testDevPersion,
          productDevPersion: values.productDevPersion,
          website: values.website,
          status: values.status,
          docUrl: values.docUrl,
          review: values.review.split('\n'),
          remarks: values.remarks.split('\n')
        }
        if (this.state.id) {
          http.updatePro({id: this.state.id, params}).then(res => {
            if (res.data.status === 200 && res.data.data === 1) {
              message.success('更新成功');
              this.goBack()
            }
          })
        } else {
          http.insertPro(params).then(res => {
            if (res.data.status === 200 && res.data.data === 1) {
              message.success('添加成功');
              this.goBack()
            }
          })
        }
      }
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render () {
    const { detail } = this.state
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
          <Form.Item label="项目名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入项目名称',
              }],
              initialValue: detail.name
            })(
              <Input disabled={this.state.id} type="text" placeholder="请输入项目名称"/>
            )}
          </Form.Item>
          <Form.Item
            label="开发周期"
          >
            {getFieldDecorator('devTime', {
              rules: [{
                required: true, message: '请输入开发时间',
              }],
              initialValue: detail.startTime ? [moment(detail.startTime), moment(detail.endTime)] : []
            })(
              <DatePicker.RangePicker format='YYYY-MM-DD'  placeholder={['开始时间', '结束时间']}/>
            )}
          </Form.Item>
          <Form.Item
            label="前端人员"
          >
            {getFieldDecorator('frontDevPersion', {
              rules: [{
                required: true, message: '请输入或选择前端开发',
              }],
              initialValue: detail.frontDevPersion
            })(
              <Select mode="tags" style={{ width: '100%' }} placeholder="请选择前端开发" >
                <Select.Option value="yxcs">yxcs</Select.Option>
                <Select.Option value="王倩">王倩</Select.Option>
                <Select.Option value="杜龙龙">杜龙龙</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="后端人员"
          >
            {getFieldDecorator('backDevPersion', {
              rules: [{
                required: true, message: '请输入或选择后端开发',
              }],
              initialValue: detail.backDevPersion
            })(
              <Select mode="tags" style={{ width: '100%' }} placeholder="请选择后端开发" >
                <Select.Option value="崔天奇">崔天奇</Select.Option>
                <Select.Option value="李鹏飞">李鹏飞</Select.Option>
                <Select.Option value="刘超">刘超</Select.Option>
                <Select.Option value="马晨达">马晨达</Select.Option>
                <Select.Option value="马常海">马常海</Select.Option>
                <Select.Option value="亢永强">亢永强</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="测试人员"
          >
            {getFieldDecorator('testDevPersion', {
              rules: [{
                required: true, message: '请输入或选择测试',
              }],
              initialValue: detail.testDevPersion
            })(
              <Select mode="tags" style={{ width: '100%' }} placeholder="请选择测试" >
                <Select.Option value="范桂红">范桂红</Select.Option>
                <Select.Option value="裴丽娜">裴丽娜</Select.Option>
                <Select.Option value="史姣姣">史姣姣</Select.Option>
                <Select.Option value="侯典典">侯典典</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="产品人员"
          >
            {getFieldDecorator('productDevPersion', {
              rules: [{
                required: true, message: '请输入或选择产品',
              }],
              initialValue: detail.productDevPersion
            })(
              <Select mode="tags" style={{ width: '100%' }} placeholder="请选择产品" >
                <Select.Option value="曹保卫">曹保卫</Select.Option>
                <Select.Option value="王超">王超</Select.Option>
                <Select.Option value="任宏图">任宏图</Select.Option>
                <Select.Option value="何红英">何红英</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="项目网址">
            {getFieldDecorator('website', {
              rules: [{
                required: true, message: '请输入项目网址',
              }],
              initialValue: ''+detail.website
            })(
              <Select style={{ width: '100%' }} placeholder="请输入项目网址">
                <Select.Option value="1">cms.biyao.com</Select.Option>
                <Select.Option value="2">ark.biyao.com</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="项目阶段">
            {getFieldDecorator('status', {
              rules: [{
                required: true, message: '请输入项目状态',
              }],
              initialValue: ''+detail.status
            })(
              <Select style={{ width: '100%' }} placeholder="请输入项目状态">
                <Select.Option value="1">待开发</Select.Option>
                <Select.Option value="2">详设中</Select.Option>
                <Select.Option value="3">开发中</Select.Option>
                <Select.Option value="4">联调中</Select.Option>
                <Select.Option value="5">测试中</Select.Option>
                <Select.Option value="6">延期</Select.Option>
                <Select.Option value="7">已上线</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="文档地址">
            {getFieldDecorator('docUrl', {
              rules: [{
                required: true, message: '请输入文档地址',
              }],
              initialValue: detail.docUrl
            })(
              <Input type="text" placeholder="请输入文档地址" />
            )}
          </Form.Item>
          <Form.Item label="项目复盘">
            {getFieldDecorator('review', {
              rules: [{
                required: false
              }],
              initialValue: detail.review.join('\n')
            })(
              <Input.TextArea placeholder="请输入项目复盘内容"/>
            )}
          </Form.Item>
          <Form.Item label="项目备注">
            {getFieldDecorator('remarks', {
              rules: [{
                required: false
              }],
              initialValue: detail.remarks.join('\n')
            })(
              <Input.TextArea placeholder="请输入项目备注"/>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button className="back-btn" type="default" onClick={this.goBack}>返回</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const ToolProjectAddForm = Form.create({ name: 'ToolProjectAddForm' })(ToolProjectAdd);
export default ToolProjectAddForm