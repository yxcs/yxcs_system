import Koa from 'koa'
import views from 'koa-views'
import helmet from 'koa-helmet'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa2-cors'

import config from './config';

// jwt 验证
import jwtKoa from 'koa-jwt'

const app = new Koa()

// 自定义中间件
import pv from './middleware/koa-pv'
app.use(pv())

// Token 错误处理
import errorHandle from './middleware/error';
app
  .use(errorHandle)
  .use(logger())
  .use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))
  .use(helmet())
  .use(cors({
    origin: function (ctx) {
      const regexp = new RegExp('/api');
      const front_rep = new RegExp('/v1');
      const regexpWith = new RegExp('/download');
      const toolReg = new RegExp('/tool');
      if (regexpWith.test(ctx.url)) {
        return `http://${config.url.download}`;
      } else if (~String(ctx.url).indexOf('/imgs/')) {
        return `http://${config.url.image}`;
      } else if (regexp.test(ctx.url)) {
        return config.BACK_URL
      } else if (front_rep.test(ctx.url)) {
        return config.FRONT_URL
      } else if (toolReg.test(ctx.url)) {
        return config.BACK_URL
      }
      return false;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
  }))
  .use(jwtKoa({
    secret: config.secret
  }).unless({
    path: [/\/register/, /\/login/, /\/v1/, /\/tool\/saveGooglePluginBookmarks/],
  }))
  .use(json())

import index from './routes/index'
import users from './routes/users'
import api from './routes/api'
import v1 from './routes/v1'
import tool from './routes/tool'

// error handler
onerror(app)

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(api.routes(), api.allowedMethods())
app.use(v1.routes(), v1.allowedMethods())
app.use(tool.routes(), tool.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app