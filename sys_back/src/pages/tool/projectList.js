import React, { Component } from 'react';
import './tool.less'
import http from '../../services/tool';
import tool from '../../utils/tool'

import {
  Button, Table, Tag, message
} from 'antd';

const statusEnum = {1: 'prd准备', 2: '详设中', 3: '开发中', 4: '联调中', 5: '测试中', 6: '上线', 7: '上线后处理', 101: '延期', 102: '已上线', 103: '项目已取消'}
const websiteEnum = {1: 'cms.biyao.com', 2: 'ark.biyao.com'}

class ToolProjectList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      lists: [],
      pager: {
        size: 10,
        page: 1
      }
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = () => {
    const { pager } = this.state
    http.getProList({}, pager.size, pager.page).then(res => {
      if (res.data.status === 200) {
        let lists = res.data.data;
        lists = lists.map(item => {
          item.statusTxt = statusEnum[item.status]
          item.websiteTxt = websiteEnum[item.website]
          if (item.websiteTxt.indexOf('http://') < 0) {
            item.websiteTxt = `http://${item.websiteTxt}`
          }
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

  addProject = () => {
    this.props.history.push('/tool/project/add')
  }

  onEditProject = (record) => {
    this.props.history.push(`/tool/project/edit/${record._id}`)
  }

  onGoToFlow = (record) => {
    this.props.history.push(`/tool/project/flow/${record._id}`)
  }

  onSetDelay = (record) => {
    const params = {
      pId: record._id
    }
    http.delayPro(params).then(res => {
      if (res.data.status === 200 && res.data.data === 1) {
        message.success('项目延期成功')
        this.setState({
          pager: {
            size: 10,
            page: 1
          }
        }, _ => {
          this.getList()
        })
      }
    })
  }

  onSetCancel = (record) => {
    const params = {
      pId: record._id
    }
    http.cancelPro(params).then(res => {
      if (res.data.status === 200 && res.data.data === 1) {
        message.success('项目取消成功')
        this.setState({
          pager: {
            size: 10,
            page: 1
          }
        }, _ => {
          this.getList()
        })
      }
    })
  }

  render () {
    const { pager } = this.state;

    const columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (v) => {
          return tool.formatTime(v, 0)
        }
      }, {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: (v) => {
          return tool.formatTime(v, 0)
        }
      }, {
        title: '前端',
        dataIndex: 'frontDevPersion',
        key: 'frontDevPersion',
        render: (v) => {
          return (
            <div>
              {
                v.map((item, idx) => <Tag key={idx} color="cyan">{item}</Tag>)
              }
            </div>
          )
        }
      }, {
        title: '后端',
        dataIndex: 'backDevPersion',
        key: 'backDevPersion',
        render: (v) => {
          return (
            <div>
              {
                v.map((item, idx) => <Tag key={idx} color="cyan">{item}</Tag>)
              }
            </div>
          )
        }
      }, {
        title: '测试',
        dataIndex: 'testDevPersion',
        key: 'testDevPersion',
        render: (v) => {
          return (
            <div>
              {
                v.map((item, idx) => <Tag key={idx} color="cyan">{item}</Tag>)
              }
            </div>
          )
        }
      }, {
        title: '产品',
        dataIndex: 'productDevPersion',
        key: 'productDevPersion',
        render: (v) => {
          return (
            <div>
              {
                v.map((item, idx) => <Tag key={idx} color="cyan">{item}</Tag>)
              }
            </div>
          )
        }
      }, {
        title: '站点',
        dataIndex: 'websiteTxt',
        key: 'websiteTxt',
        render: (v) => {
          return v ? <Button size="small" type="dashed" href={v}>跳转</Button> : '--'
        }
      }, {
        title: '状态',
        dataIndex: 'statusTxt',
        key: 'statusTxt',
      }, {
        title: '文档',
        dataIndex: 'docUrl',
        key: 'docUrl',
        render: (v) => {
          return v ? <Button size="small" type="dashed" href={v}>跳转文档</Button> : '--'
        }
      }, {
        title: '复盘',
        dataIndex: 'review',
        key: 'review',
        render: (v) => {
          return (
            <div>
              {
                v.map((item, idx) => <div key={idx}>{item}</div>)
              }
            </div>
          )
        }
      }, {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        render: (v) => {
          return (
            <div>
              {
                v.map((item, idx) => <div key={idx}>{item}</div>)
              }
            </div>
          )
        }
      }, {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        render: (id, record, index) => {
          return (
            <div>
              <Button type="default" size="small" onClick={this.onEditProject.bind(this, record)}>编辑</Button>
              <span className="btn-pad"></span>
              <Button type="primary" size="small" onClick={this.onGoToFlow.bind(this, record)}>流程</Button>
              {
                +record.status < 100 ? (
                  <span>
                    <span className="btn-pad"></span>
                    <Button type="danger" size="small" onClick={this.onSetDelay.bind(this, record)}>延期</Button>
                    <span className="btn-pad"></span>
                    <Button type="danger" size="small" onClick={this.onSetCancel.bind(this, record)}>取消</Button>
                  </span>
                ) : ''
              }
            </div>
          )
        }
      }
    ]

    return (
      <div>
        <div className="link__content--header">
          <Button onClick={this.addProject} type="primary">添加项目</Button>
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
      </div>
    )
  }
}

export default ToolProjectList