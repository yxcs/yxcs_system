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
const keys = ['projectId', 'projectName', 'stage', 'prdLearn', 'prdBug', 'prdExplain', 'prdConfirm', 'prdSign', 'effortEstimation', 'scheduling', 'newWebsite', 'apiDesign', 'frontDesign', 'designEmail', 'frontExplain', 'meetingMinute', 'backExplain', 'pullBranch', 'devCoding', 'testExplain', 'testBySelf', 'mailTestDoc', 'sendTestApiPlan', 'testApiVersion', 'testApi', 'testVersion', 'testOrder', 'debug', 'mergeMaster', 'testMainOrder', 'sendVersion', 'mainVerison', 'sendToRatify', 'confirmVersionPersion', 'followSendVersion', 'confirmOrderMail', 'updateDocument', 'updateConfluence', 'report', 'review']
class ProjectFlow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      flow: {},
      project: {},
      flowArr: []
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

  toHump (name) {
    return name.replace(/\_(\w)/g, function(all, letter) {
      return letter.toUpperCase()
    });
  }

  getFlow = (id) => {
    http.getFlowByProId({projectId: id}).then(res => {
      const data = res.data.data
      let flow = {}
      let project = {}
      for (let key in data) {
        if (typeof data[key] === 'object') {
          flow[key] = data[key]
        } else {
          project[key] = data[key]
        }
      }
      let flowArr = []
      let flowList = flow.list.map(item => {
        item.key = this.toHump(item.onlySign.toLowerCase())
        return item
      })
      keys.forEach(item => {
        flowList.forEach (sItem => {
          if (sItem.key === item) {
            const curr = sItem
            curr.isExpand = false
            curr.startTime = curr.startTime ? moment(curr.startTime).format('YYYY-MM-DD HH:mm') : '-'
            curr.endTime = curr.endTime ? moment(curr.endTime).format('YYYY-MM-DD HH:mm') : '-'
            curr.example = Array.isArray(curr.example) ? curr.example.join('\n') : curr.example
            curr.persion = Array.isArray(curr.persion) ? curr.persion.join('\n') : curr.persion
            curr.mailTo = Array.isArray(curr.mailTo) ? curr.mailTo.join('\n') : curr.mailTo
            curr.document = Array.isArray(curr.document) ? curr.document.join('\n') : curr.document
            curr.account = Array.isArray(curr.account) ? curr.account.join('\n') : curr.account
            curr.operate = Array.isArray(curr.operate) ? curr.operate.join('\n') : curr.operate
            curr.explain = Array.isArray(curr.explain) ? curr.explain.join('\n') : curr.explain
            curr.remarks = Array.isArray(curr.remarks) ? curr.remarks.join('\n') : curr.remarks
            if (curr.status === 0) {
              curr.bgColor = 'close'
            } else if (curr.status === 1) {
              curr.bgColor = 'pending'
            } else if (curr.status === 2) {
              curr.bgColor = 'doing'
            } else if (curr.status === 3) {
              curr.bgColor = 'fulfilled'
            }
            flowArr.push(curr)
          }
        })
      })
      this.setState({
        flow,
        project,
        flowArr
      })
    })
  }

  onExpandChange = (e) => {
    console.log(e)
  }

  onTextAreaChange = (flowIdx, key, v) => {
    const flowArr = this.state.flowArr
    flowArr[flowIdx][key] = v.target.value
    this.setState({ flowArr })
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

  extraButton = (item, flowIdx) => {
    const { project } = this.state
    if (item.type === 1) {
      if (project.stage === 0) {
        if (item.primaryKey === 10000) {
          if (item.status === 1) {
            return <Button size="small" type="primary" onClick={event => { event.stopPropagation(); this.dealStatus(flowIdx, 2) }}>处理</Button>
          } else if (item.status === 2) {
            return <Button size="small" type="primary" onClick={event => { event.stopPropagation(); this.dealStatus(flowIdx, 3) }}>关闭</Button>
          } else if (item.status === 3) {
            return <span>已结束</span>
          }
        } else {
          return <Button disabled={true} size="small" type="primary">待处理</Button>
        }
      } else if (project.stage === 1) {
        return <span>已结束</span>
      } else {
        if (item.status === 1) {
          if (project.stage === item.primaryKey) {
            return <Button size="small" type="primary" onClick={event => { event.stopPropagation(); this.dealStatus(flowIdx, 2) }}>处理</Button>
          } else {
            return <Button disabled={true} size="small" type="primary">待处理</Button>
          }
        } else if (item.status === 2) {
          return <Button size="small" type="primary" onClick={event => { event.stopPropagation(); this.dealStatus(flowIdx, 3) }}>关闭</Button>
        } else if (item.status === 3) {
          return <span>已结束</span>
        }
      }
    } else if (item.type === 2) {
      return <span>自动关闭</span>
    } else if (item.type === 3) {
      return <span>仅提示</span>
    }
    return ''
  }

  dealStatus = (flowIdx, status) => {
    const {project, flowArr, id} = this.state
    flowArr[flowIdx].status = status
    const currKey = flowArr[flowIdx].onlySign.toLowerCase().replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())
    const params = {}
    flowArr.forEach(item => {
      const key = item.onlySign.toLowerCase().replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())
      params[key] = item
    })
    params.stage = project.stage
    http.dealFlow({id: this.state.project._id, pId: id, key: currKey, params}).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('更新成功')
        this.getFlow(this.id)
      }
    })
  }

  onUpdateFlow = () => {
    const { project, flowArr } = this.state
    const params = {}
    flowArr.forEach(item => {
      const key = item.onlySign.toLowerCase().replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())
      params[key] = item
    })
    http.updateFlow({id: project._id, params}).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('更新成功')
        this.getFlow(this.id)
      }
    })
  }

  onEndFlow = () => {
    
  }

  render () {
    const { project, flowArr } = this.state

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
        <div className="flow-header">{project.projectName}</div>
        <div className="flow-wrap">
          <Collapse
            defaultActiveKey={['PRD_LEARN']}
            expandIconPosition="left">
              {
                flowArr.map((item, flowIdx) => {
                  return (
                    <Panel
                      header={this.panelheader(item)}
                      key={item.onlySign}
                      extra={this.extraButton(item, flowIdx)}
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
              <Button type="primary" onClick={this.onUpdateFlow}> 更新 </Button>
              {project.stage === 10036 ? <Button type="danger" onClick={this.onEndFlow} className="back-btn"> 上线 </Button> : ''}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default ProjectFlow