import Pro from '../dbs/tool/toolProject';
import Flow from '../dbs/tool/toolFlow';

class ToolController {
  constructor() {}

  async insertPro (ctx) {
    const { body } = ctx.request
    const pro = new Pro(body);
    const res = await pro.save();
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
}

export default new ToolController()