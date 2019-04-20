const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');

const config = require('./config');

// 自定义中间件
const pv = require('./middleware/koa-pv')
app.use(pv())

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares

// 跨域设置
app.use(cors({
  origin: function (ctx) {
    const regexp = new RegExp('/api');
    const regexpWith = new RegExp('/download');
    if (regexpWith.test(ctx.url)) {
      return `http://${config.url.download}`;
    } else if (~String(ctx.url).indexOf('/imgs/')) {
      return `http://${config.url.image}`;
    } else if (regexp.test(ctx.url)) {
      return '*'
    }
    return false;
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app