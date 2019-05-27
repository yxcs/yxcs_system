const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 文件上传
const koaBody = require('koa-body')
// 跨域相关
const cors = require('koa2-cors')

const config = require('./config')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(cors({
  origin: function (ctx) {
    const upload = new RegExp('/uploadfile');
    const static = new  RegExp('/static|images');
    if (upload.test(ctx.url) || static.test(ctx.url)) {
      if (ctx.header.origin === config.BACK_URL) {
        return config.BACK_URL
      } else if (ctx.header.origin === config.FRONT_URL) {
        return config.FRONT_URL
      }
      return false
    }
    return false;
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous', 'x-requested-with'],
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 2*1024*1024
    }
}));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
