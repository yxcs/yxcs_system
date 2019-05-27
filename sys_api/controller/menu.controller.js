import Menu from '../dbs/menus/menuSchema';
import User from '../dbs/user/userSchema';

class MenuController {

  async getMenuList(ctx) {
    const { query } = ctx.request
    const user = await User.findById(query.id, {}, {})
    if (!user || !query.id) {
      ctx.body = {
        status: 401,
        data: false,
        message: '获取菜单失败'
      }
    } else {
      let menu = await Menu.find()  // SYS 的时候表示有全部权限 BLOG_MANAGEMENT 表示只有博客的权限
      if (user.power.indexOf('BLOG_MANAGEMENT') > -1) {
        menu = menu.filter(item => item.key === user.power || item.key === 'HOME_PAGE')
      }
      console.log(menu)
      ctx.body = {
        status: 200,
        data: menu
      }
    }
  }

  async insertMenu(ctx) {
    const { body } = ctx.request;
    const newMenu = new Menu(body);
    const menu = await newMenu.save();
    ctx.status = 200;
    ctx.body = {
      message: '添加成功',
      data: menu
    }
  }

  async updateMenu(ctx) {
    const { body } = ctx.request;
    const menu = await Menu.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: menu
    }
  }

  async deleteMenu(ctx) {
    const { body } = ctx.request;
    const menu = await Menu.findByIdAndRemove(body.id, {})
    console.log(menu)
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1
    }
  }

}

export default new MenuController()