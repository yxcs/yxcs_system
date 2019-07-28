import React, { Component } from 'react';
import './tool.less'
import http from '../../services/tool';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
  Collapse, Button, message, Form, Input, Tag,
} from 'antd';
moment.locale('zh-cn');

const { Panel } = Collapse;
class ProjectFlow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      flow: {
        list: []
      },
      isShowFinish: false,
      isFinish: false
    }
  }

  componentDidMount () {
    if (this.props.match.params && this.props.match.params.id) {
      this.setState({
        id: this.props.match.params.id
      })
      this.getFlow(this.props.match.params.id)
    } else {
      message.warning('页面错误!')
    }
  }

  getFlow = (id) => {
    http.getFlowByProId({projectId: id}).then(res => {
      const data = res.data.data
      let flow = {
        list: []
      }
      flow.list = data.list.sort((a, b) => {
        return a.primaryKey - b.primaryKey
      })
      flow.projectId = data.projectId
      flow.projectName = data.projectName
      flow.stage = data.stage
      flow.status = data.status
      flow._id = data._id
      flow.list = flow.list.map(item => {
        item.startTime = item.startTime ? moment(item.startTime).format('YYYY-MM-DD HH:mm') : '-'
        item.endTime = item.endTime ? moment(item.endTime).format('YYYY-MM-DD HH:mm') : '-'
        item.example = Array.isArray(item.example) ? item.example.join('\n') : item.example
        item.persion = Array.isArray(item.persion) ? item.persion.join('\n') : item.persion
        item.mailTo = Array.isArray(item.mailTo) ? item.mailTo.join('\n') : item.mailTo
        item.document = Array.isArray(item.document) ? item.document.join('\n') : item.document
        item.account = Array.isArray(item.account) ? item.account.join('\n') : item.account
        item.operate = Array.isArray(item.operate) ? item.operate.join('\n') : item.operate
        item.explain = Array.isArray(item.explain) ? item.explain.join('\n') : item.explain
        item.remarks = Array.isArray(item.remarks) ? item.remarks.join('\n') : item.remarks
        if (item.status === 0) {
          item.bgColor = 'close'
        } else if (item.status === 1) {
          item.bgColor = 'pending'
        } else if (item.status === 2) {
          item.bgColor = 'doing'
        } else if (item.status === 3) {
          item.bgColor = 'fulfilled'
        }
        return item
      })
      let isShowFinish = flow.list[flow.list.length - 1].status === 3
      this.setState({ flow, isShowFinish })
    })
  }

  onTextAreaChange = (flowIdx, key, v) => {
    const flow = this.state.flow
    flow.list[flowIdx][key] = v.target.value
    this.setState({ flow })
  }

  panelheader = (item) => {
    if (item.status === 0) {
      return <span><Tag color="purple">关闭</Tag>{item.title}</span>
    } else if (item.status === 1) {
      return <span><Tag color="orange">待开始</Tag>{item.title}</span>
    } else if (item.status === 2) {
      return <span><Tag color="green">进行中</Tag>{item.title}</span>
    } else if (item.status === 3) {
      return <span><Tag color="purple">已完成</Tag>{item.title}</span>
    }
  }

  extraButton = (item) => {
    const { flow } = this.state
    if (!flow.stage) {
      if (item.primaryKey === 10000) {
        return <Button size="small" type="primary" onClick={event => { event.stopPropagation(); this.dealStatus(item.primaryKey) }}>处理</Button>
      } else {
        return <Button disabled={true} size="small" type="primary">待开始</Button>
      }
    } else if (flow.stage === 1) {
      return <span>已结束</span>
    } else {
      if (flow.stage === item.primaryKey) {
        if (item.type === 1) {
          if (item.status === 1) {
            return <Button size="small" type="primary" onClick={event => { event.stopPropagation(); this.dealStatus(item.primaryKey) }}>处理</Button>
          } else if (item.status === 2) {
            return <Button size="small" type="primary" onClick={event => { event.stopPropagation(); this.dealStatus(item.primaryKey) }}>关闭</Button>
          } else if (item.status === 3) {
            return <span>已结束</span>
          }
        } else if (item.type === 2) {
          return <span>自动关闭</span>
        } else if (item.type === 3) {
          return <span>仅提示</span>
        }
      } else {
        if (item.type === 1) {
          if (item.status === 1) {
            return <span>-</span>
          } else if (item.status === 2) {
            return <span>-</span>
          } else if (item.status === 3) {
            return <span>已结束</span>
          }
        } else if (item.type === 2) {
          return <span>自动关闭</span>
        } else if (item.type === 3) {
          return <span>仅提示</span>
        }
      }
    }
    return ''
  }

  dealStatus = (primaryKey) => {
    const {flow, id} = this.state
    http.dealFlow({id: flow._id, pId: id, primaryKey}).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('更新成功')
        this.getFlow(id)
      }
    })
  }

  onUpdateFlow = () => {
    const { flow, id } = this.state
    const params = {
      list: flow.list
    }
    http.updateFlow({id: flow._id, params}).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('更新成功')
        this.getFlow(id)
      }
    })
  }

  onEndFlow = () => {
    const { flow, id } = this.state
    http.finishFlow({pId: id, id: flow._id}).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('更新成功')
        this.getFlow(id)
      }
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render () {
    const { flow, isShowFinish } = this.state

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
        <div className="flow-header">{flow.projectName}</div>
        <div className="flow-wrap">
          <Collapse
            expandIconPosition="left">
              {
                flow.list.map((item, flowIdx) => {
                  return (
                    <Panel 
                      header={this.panelheader(item)}
                      key={item.onlySign}
                      extra={this.extraButton(item)}
                      className={item.bgColor}>
                      <Form {...formItemLayout}>
                        <Form.Item label="开始时间"> {item.startTime} </Form.Item>
                        <Form.Item label="结束时间"> {item.endTime} </Form.Item>
                        <Form.Item label="案例">
                          <Input.TextArea autosize={true} defaultValue={item.example} placeholder="案例" onChange={this.onTextAreaChange.bind(this, flowIdx, 'example')}/>
                        </Form.Item>
                        <Form.Item label="人员">
                          <Input.TextArea autosize={true} defaultValue={item.persion} placeholder="人员" onChange={this.onTextAreaChange.bind(this, flowIdx, 'persion')}/>
                        </Form.Item>
                        <Form.Item label="邮件@">
                          <Input.TextArea autosize={true} defaultValue={item.mailTo} placeholder="邮件" onChange={this.onTextAreaChange.bind(this, flowIdx, 'mailTo')}/>
                        </Form.Item>
                        <Form.Item label="文档">
                          <Input.TextArea autosize={true} defaultValue={item.document} placeholder="文档" onChange={this.onTextAreaChange.bind(this, flowIdx, 'document')}/>
                        </Form.Item>
                        <Form.Item label="涉及账号">
                          <Input.TextArea autosize={true} defaultValue={item.account} placeholder="涉及账号" onChange={this.onTextAreaChange.bind(this, flowIdx, 'account')}/>
                        </Form.Item>
                        <Form.Item label="操作">
                          <Input.TextArea autosize={true} defaultValue={item.operate} placeholder="操作" onChange={this.onTextAreaChange.bind(this, flowIdx, 'operate')}/>
                        </Form.Item>
                        <Form.Item label="说明">
                          <Input.TextArea autosize={true} defaultValue={item.explain} placeholder="说明" onChange={this.onTextAreaChange.bind(this, flowIdx, 'explain')}/>
                        </Form.Item>
                        <Form.Item label="备注">
                          <Input.TextArea autosize={true} defaultValue={item.remarks} placeholder="备注" onChange={this.onTextAreaChange.bind(this, flowIdx, 'remarks')}/>
                        </Form.Item>
                      </Form>
                    </Panel>
                  )
                })
              }
          </Collapse>
          <Form className="footer-btn" {...tailFormItemLayout}>
            <Form.Item>
              <Button type="default" onClick={this.goBack}> 返回 </Button>
              { flow.status < 100 ? <Button type="primary" onClick={this.onUpdateFlow} className="back-btn"> 更新 </Button> : ''}
              { isShowFinish && flow.status < 100 ? <Button type="danger" onClick={this.onEndFlow} className="back-btn"> 上线 </Button> : ''}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default ProjectFlow