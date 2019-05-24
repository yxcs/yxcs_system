const Koa = require('koa')
const views = require('koa-views')
const helmet = require('koa-helmet')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const config = require('./config')

// jwt 验证
const jwtKoa = require('koa-jwt')

const app = new Koa()

// 自定义中间件
const pv = require('./middleware/koa-pv')
app.use(pv())

// Token 错误处理
const errorHandle = require('./middleware/error')
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
      if (regexpWith.test(ctx.url)) {
        return `http://${config.url.download}`;
      } else if (~String(ctx.url).indexOf('/imgs/')) {
        return `http://${config.url.image}`;
      } else if (regexp.test(ctx.url)) {
        return config.BACK_URL
      } else if (front_rep.test(ctx.url)) {
        return config.FRONT_URL
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
    path: [/\/register/, /\/login/, /\/v1/],
  }))
  .use(json())

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const v1 = require('./routes/v1')

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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app