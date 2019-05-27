import bcrypt from 'bcrypt'
import User from '../dbs/user/userSchema';

class UserController {

  async getUsers(ctx) {
    const users = await User.find()
    ctx.body = {
      status: 200,
      users
    }
  }

  async updateUser(ctx) {
    const { body } = ctx.request;
    const user = await User.findOne({ username: body.params.username });
    if (user.notice !== body.params.notice) {
      body.params.noticeAt = Date.now()
    }
    if (body.params.password) {
      body.params.password = await bcrypt.hash(body.params.password, 5)
    }
    await User.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    const newData = await User.findById(body.id, {}, {});
    if (newData && newData._id) {
      ctx.body = {
        status: 200,
        data: {
          username: newData.username,
          avatar: newData.avatar,
          logindate: newData.logindate,
          notice: newData.notice,
          slogan: newData.slogan,
          id: newData._id
        },
        message: '更新成功'
      }
    }
  }

  async getUserById(ctx) {
    const { query } = ctx.request;
    if (query && query.id) {
      const data = await User.findById(query.id, {}, {});
      if (data && data._id) {
        ctx.body = {
          status: 200,
          data: {
            username: data.username,
            avatar: data.avatar,
            logindate: data.logindate,
            notice: data.notice,
            slogan: data.slogan,
            id: data._id,
            noticeAt: data.noticeAt
          },
          message: '查找成功'
        }
      } else {
        ctx.body = {
          status: 200,
          data: 0,
          message: '查找失败'
        }
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }
}

export default new UserController()