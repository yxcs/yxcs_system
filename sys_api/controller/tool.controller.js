import Pro from '../dbs/tool/toolProject';
import Flow from '../dbs/tool/toolFlow';

const keys = ['projectId', 'projectName', 'stage', 'prdLearn', 'prdBug', 'prdExplain', 'prdConfirm', 'prdSign', 'effortEstimation', 'scheduling', 'newWebsite', 'apiDesign', 'frontDesign', 'designEmail', 'frontExplain', 'meetingMinute', 'backExplain', 'pullBranch', 'devCoding', 'testExplain', 'testBySelf', 'mailTestDoc', 'sendTestApiPlan', 'testApiVersion', 'testApi', 'testVersion', 'testOrder', 'debug', 'mergeMaster', 'testMainOrder', 'sendVersion', 'mainVerison', 'sendToRatify', 'confirmVersionPersion', 'followSendVersion', 'confirmOrderMail', 'updateDocument', 'updateConfluence', 'report', 'review']
class ToolController {
  constructor() {}

  async insertPro (ctx) {
    const { body } = ctx.request
    const pro = new Pro(body);
    const res = await pro.save();
    if (res._id) {
      const params = {
        projectId: res._id,
        projectName: res.name
      }
      const flow = new Flow(params);
      const flowRes = await flow.save();
      if (flowRes._id) {
        ctx.body = {
          status: 200,
          data: 1,
          message: '添加成功'
        }
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        errorCode: 4002,
        message: '添加出错'
      }
    }
  }

  async updatePro(ctx) {
    const { body } = ctx.request;
    const pro = await Pro.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async deletePro(ctx) {
    const { body } = ctx.request;
    const pro = await Pro.findByIdAndRemove(body.id, {})
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1,
      status: 200
    }
  }

  // 查找
  async getProById(ctx) {
    const { body } = ctx.request;
    let { id, showOpts = {}, options = {} } = body;
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Pro.findById(id, showOpts, options);
    if (data && data._id) {
      ctx.body = {
        status: 200,
        data: data,
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }

  async getProList(ctx) {
    const { body } = ctx.request;
    let { where = {}, limit = 10, current = 1, sort = {'updateAt': -1}} = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    const skipnum = (current - 1) * limit;
    const data = await Pro.find(where).skip(skipnum).limit(limit).sort(sort).exec();
    const count = await Pro.count(where);
    ctx.body = {
      status: 200,
      data: data,
      total: count || 0,
      message: '查找成功'
    }
  }

  async insertFlow (ctx) {
    const { body } = ctx.request
    const flow = new Flow(body);
    const res = await flow.save();
    if (res._id) {
      ctx.body = {
        status: 200,
        data: 1,
        message: '添加成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        errorCode: 4002,
        message: '添加出错'
      }
    }
  }

  async updateFlow(ctx) {
    const { body } = ctx.request;
    body.params.updateTime = Date.now()
    const flow = await Flow.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async dealFlow(ctx) {
    const { body } = ctx.request;
    const curr = body.params[body.key]
    const pParams = {
      updateAt: Date.now()
    }
    if (curr.status < 3) {
      body.params.stage = curr.primaryKey
      if (curr.status === 2) {
        body.params[body.key].startTime = Date.now()
      }
      pParams.stageTxt = curr.title
      pParams.stage = body.params.stage
    } else {
      if (curr.endTime === 3) {
        body.params.startTime = Date.now()
      }
      body.params.stage = curr.primaryKey + 1
      if (body.params.stage > 10036) {
        body.params.stage = 1
        pParams.stageTxt = '已完成'
      } else {
        for (let key in body.params) {
          if (body.params[key].primaryKey === body.params.stage) {
            pParams.stageTxt = body.params[key].title
          }
        }
      }
      pParams.stage = body.params.stage
    }

    const pro = await Pro.findByIdAndUpdate(body.pId, pParams)
    const flow = await Flow.findByIdAndUpdate(body.id, body.params)
    
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async deleteFlow(ctx) {
    const { body } = ctx.request;
    const flow = await Flow.findByIdAndRemove(body.id, {})
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1,
      status: 200
    }
  }

  // 查找
  async getFlowById(ctx) {
    const { body } = ctx.request;
    let { id, showOpts = {}, options = {} } = body;
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Flow.findById(id, showOpts, options);
    if (data && data._id) {
      ctx.body = {
        status: 200,
        data: data,
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }
  // 根据项目id查找
  async getFlowByProId(ctx) {
    const { body } = ctx.request;
    let { where = {}, showOpts = {}, options = {} } = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Flow.find(where, showOpts, options).exec();
    if (data && data.length) {
      ctx.body = {
        status: 200,
        data: data[0],
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }

  async getFlowList(ctx) {
    const { body } = ctx.request;
    let { where = {}, limit = 10, current = 1, sort = {'updateAt': -1}} = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    const skipnum = (current - 1) * limit;
    const data = await Flow.find(where).skip(skipnum).limit(limit).sort(sort).exec();
    const count = await Flow.count(where);
    ctx.body = {
      status: 200,
      data: data,
      total: count || 0,
      message: '查找成功'
    }
  }
}

export default new ToolController()