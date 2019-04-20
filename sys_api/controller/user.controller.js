import jwt from 'jsonwebtoken'
import User from '../dbs/user/userSchema';
import config from '../config';

class UserController {

  /** you can get uers with it
   * curl -X GET http://localhost:3200/api/users -H 'authorization: Bearer token' -H 'cache-control: no-cache'
   */
  async getUsers(ctx) {
    const payload = jwt.verify(ctx.headers.authorization.split(' ')[1], config.secret);
    if (payload.username && payload._id) {
      const users = await User.find()
      ctx.body = {
        status: 200,
        users
      }
    } else {
      ctx.body = {
        status: 401,
        message: '请确认您已登录'
      }
    }
  }
}

export default new UserController()