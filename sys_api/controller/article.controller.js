import jsonwebtoken from 'jsonwebtoken';
import config from '../config';
import Article from '../dbs/blog/ArticleSchema';

const verifyToken = (_token) => {
  let verify = jsonwebtoken.verify(_token, config.secret, (error, decoded) => {
      if(error) {
          return "Token Invalid";
      }
      return decoded;
  });
  return verify;
};

class ArticleController {

  async insertArticle(ctx) {
    const { body } = ctx.request
    const art = new Article(body);
    const res = await art.save();
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

  async updateArticle(ctx) {
    const { body } = ctx.request;
    const art = await Article.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async deleteArticle(ctx) {
    const { body } = ctx.request;
    const art = await Article.findByIdAndRemove(body.id, {})
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1,
      status: 200
    }
  }

  // 查找
  async getArticleById(ctx) {
    const { body } = ctx.request;
    let { id, showOpts = {}, options = {} } = body;
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Article.findById(id, showOpts, options);
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

  async getArticleList(ctx) {
    const { body } = ctx.request;
    let { where = {}, limit = 10, current = 1, sort = {'updateAt': -1} } = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    const skipnum = (current - 1) * limit;
    const data = await Article.find(where).skip(skipnum).limit(limit).sort(sort).exec();
    const count = await Article.count(where);
    ctx.body = {
      status: 200,
      data: data,
      total: count || 0,
      message: '查找成功'
    }
  }

}

export default new ArticleController()