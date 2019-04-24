import User from '../dbs/user/userSchema';

class UserController {

  /** you can get uers with it
   * curl -X GET http://localhost:3200/api/users -H 'authorization: Bearer token' -H 'cache-control: no-cache'
   */
  async getUsers(ctx) {
    const users = await User.find()
    ctx.body = {
      status: 200,
      users
    }
  }
}

export default new UserController()