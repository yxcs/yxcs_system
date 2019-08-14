import Book from '../dbs/bookmark/BookmarkSchema';

class BookController {

  async insertBook(ctx) {
    const { body } = ctx.request
    const order = await Book.find({}).limit(1).sort({createAt: 'asc'}).exec()
    body.order = order && order.length ? order[0].order + 1 : 1
    const book = new Book(body);
    const res = await book.save();
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

  async updateBook(ctx) {
    const { body } = ctx.request;
    body.params.updateAt = Date.now()
    const book = await Book.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async deleteBook(ctx) {
    const { body } = ctx.request;
    const book = await Book.findByIdAndRemove(body.id, {})
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1,
      status: 200
    }
  }

  // 查找
  async getBookById(ctx) {
    const { body } = ctx.request;
    let { id, showOpts = {}, options = {} } = body;
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Book.findById(id, showOpts, options);
    if (data && data.id) {
      ctx.body = {
        status: 200,
        data: data,
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }

  async getBookList(ctx) {
    const { body } = ctx.request;
    let { where = {}, limit = 10, current = 1, sort = {'updateAt': -1} } = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    const skipnum = (current - 1) * limit;
    const data = await Book.find(where).skip(skipnum).limit(limit).sort(sort).exec();
    const count = await Book.count(where);
    ctx.body = {
      status: 200,
      data: data,
      total: count || 0,
      message: '查找成功'
    }
  }

}

export default new BookController()