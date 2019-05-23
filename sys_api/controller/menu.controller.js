import Menu from '../dbs/menus/menuSchema';

class MenuController {

  async getMenuList(ctx) {
    const menu = await Menu.find()
    ctx.body = {
      status: 200,
      data: menu
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