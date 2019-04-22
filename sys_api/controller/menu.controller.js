import jwt from 'jsonwebtoken'
import Menu from '../dbs/menus/menuSchema';
import config from '../config';

class MenuController {

  /** you can get uers with it
   * curl -X GET http://localhost:3200/api/users -H 'authorization: Bearer token' -H 'cache-control: no-cache'
   */
  async getMenuList(ctx) {
    const payload = jwt.verify(ctx.headers.authorization.split(' ')[1], config.secret);
    if (payload.username && payload._id) {
      const menu = await Menu.find()
      ctx.body = {
        status: 200,
        data: menu
      }
    } else {
      ctx.body = {
        status: 401,
        message: '请确认您已登录'
      }
    }
  }

  async insertMenu(ctx) {
    const payload = jwt.verify(ctx.headers.authorization.split(' ')[1], config.secret);
    if (payload.username && payload._id) {
      const { body } = ctx.request;
      const newMenu = new Menu(body);
      const menu = await newMenu.save();
      ctx.status = 200;
      ctx.body = {
        message: '添加成功',
        data: menu
      }
    } else {
      ctx.body = {
        status: 401,
        message: '请确认您已登录'
      }
    }
  }

  async updateMenu(ctx) {
    const payload = jwt.verify(ctx.headers.authorization.split(' ')[1], config.secret);
    if (payload.username && payload._id) {
      const { body } = ctx.request;
      const menu = await Menu.findByIdAndUpdate(body.id, body.params)
      ctx.status = 200;
      ctx.body = {
        message: '更新成功',
        data: menu
      }
    } else {
      ctx.body = {
        status: 401,
        message: '请确认您已登录'
      }
    }
  }
}

export default new MenuController()