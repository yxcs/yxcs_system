import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config';

import User from '../dbs/user/userSchema';

class LoginController {

  async login(ctx) {
    const { body } = ctx.request
    try {
      const user = await User.findOne({ username: body.username });
      if (!user) {
        ctx.status = 401
        ctx.body = {
          message: '用户名错误',
        }
        return;
      }
      // 匹配密码是否相等
      if (await bcrypt.compare(body.password, user.password)) {
        ctx.status = 200
        ctx.body = {
          message: '登录成功',
          data: {
            logindate: user.logindate,
            username: user.username,
            id: user._id,
            username: user.username,
            avatar: user.avatar,
            notice: user.notice,
            slogan: user.slogan
          },
          // 生成 token 返回给客户端
          token: jsonwebtoken.sign({
            data: user,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 60 seconds * 60 minutes * 24 hour = 1 Day
          }, config.secret),
        }
      } else {
        ctx.status = 401
        ctx.body = {
          errorCode: 4001,
          message: '密码错误',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  async register(ctx) {
    const { body } = ctx.request;
    try {
      if (!body.username || !body.password) {
        ctx.status = 400;
        ctx.body = {
          error: `expected an object with username, password but got: ${body}`,
        }
        return;
      }
      body.password = await bcrypt.hash(body.password, 5)
      let user = await User.find({ username: body.username });
      if (!user.length) {
        const newUser = new User(body);
        user = await newUser.save();
        ctx.status = 200;
        ctx.body = {
          message: '注册成功',
          data: {
            logindate: user.logindate,
            username: user.username,
            id: user._id
          },
        }
      } else {
        ctx.status = 406;
        ctx.body = {
          message: '用户名已经存在',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

}

export default new LoginController();
