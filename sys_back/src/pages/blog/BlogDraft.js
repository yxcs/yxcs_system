import React, { Component } from 'react';
import './blog.less'
import http from '../../services/blog';
import { Button, Table, message, Popconfirm, Tag } from 'antd'
import tool from '../../utils/tool'
const typeText = {'1': '前端', '2':'后端', '3': '面试', '4': '杂文'}
const subTypeText = {
  '11': 'js',
  '12': 'css',
  '13': 'html',
  '14': 'react',
  '15': 'vue',
  '16': 'jquery',
  '101': '其他',
  '21': 'node',
  '22': 'express',
  '23': 'koa',
  '24': 'php',
  '25': '搭建',
  '26': '配置',
  '201': '其他',
  '31': '面经',
  '32': '问题',
  '33': '常识',
  '301': '其他',
  '41': '散文',
  '42': '连载',
  '43': '记录',
  '401': '其他',
}
const sourceText = {'1': '原创', '2': '转载'}
class BlogDraft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      draftList: [],
      pager: {
        size: 10,
        page: 1
      }
    }
  }
  componentDidMount() {
    this.getDrafList();
  }
  getDrafList = () => {
    const { pager } = this.state
    http.getArticles({draft: true}, pager.size, pager.page).then(res => {
      if (res.data.status === 200) {
        let draftList = res.data.data;
        draftList = draftList.map(item => {
          item.typeText = typeText[item.type];
          item.subTypeText = item.subType.map((sItem, sIdx) => {
            return {key: `${item._id}_${sIdx}`, text: subTypeText[sItem]}
          })
          item.sourceText = sourceText[item.source];
          item.createText = tool.formatTime(item.createAt);
          item.updateText = tool.formatTime(item.updateAt);
          return item;
        })
        pager.total = res.data.total;
        this.setState({
          draftList,
          pager
        })
      }
    })
  }

  gotoAddArticle = () => {
    this.props.history.push('/blog/add')
  }

  onEditDraft = (id) => {
    this.props.history.push(`/blog/edit/${id}`)
  }

  onPublishDraft = (id) => {
    http.updateArticle({id, params: {draft: false}}).then(res => {
      if (res.data.status === 200 && res.data.data) {
        message.success('发布成功');
        this.getDrafList();
      }
    })
  }

  onDelDraft = (id) => {
    http.deleteArticle(id).then(res => {
      if (res.data.status === 1 && res.data.data) {
        message.success('删除成功');
        this.getDrafList();
      }
    })
  }

  onTableChange = (page, size) => {
    const { pager } = this.state;
    pager.page = page;
    this.setState({
      pager
    }, _ =>{
      this.getDrafList();
    })
  }
  
  render () {
    const { pager } = this.state;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 400
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
        title: '标签',
        dataIndex: 'subTypeText',
        key: 'subTypeText',
        render: (v, r, i) => {
          return (
            <div>
              {
                v.map(item => <Tag key={item.key+'_'+i} color="#2db7f5">{item.text}</Tag>)
              }
            </div>
          );
        }
      }, {
        title: '来源',
        dataIndex: 'sourceText',
        key: 'sourceText',
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
              <Button type="primary" size="small" onClick={this.onEditDraft.bind(this, id)}>编辑</Button>
              <span className="btn-pad"></span>
              <Button size="small" onClick={this.onPublishDraft.bind(this, id)}>发布</Button>
              <span className="btn-pad"></span>
              <Popconfirm title="确定删除吗？" okText="删除" cancelText="取消" onConfirm={this.onDelDraft.bind(this, id)}>
                <Button type="danger" size="small">删除</Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ]
    return (
      <div>
        <div className="article__content--header">
          <Button onClick={this.gotoAddArticle.bind(this)} type="primary">添加文章</Button>
        </div>
        <Table
          dataSource={this.state.draftList}
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

export default BlogDraft