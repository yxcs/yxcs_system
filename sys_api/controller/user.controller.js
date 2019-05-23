import User from '../dbs/user/userSchema';

class UserController {

  async getUsers(ctx) {
    const users = await User.find()
    ctx.body = {
      status: 200,
      users
    }
  }
}

export default new UserController()