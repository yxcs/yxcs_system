const router = require('koa-router')()
const bcrypt = require('bcrypt');

router.prefix('/api')

router.get('/register', async (ctx) => {
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
        user,
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
})

module.exports = router