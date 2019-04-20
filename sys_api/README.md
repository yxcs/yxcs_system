## 使用koa2 开发系统的api教程
使用 nodejs + koa2 + mongoose等开发这个api系统

### 1. koa2 安装

#### 1.1 安装koa-generator  
``` shell
$ npm install -g koa-generator
```
#### 1.2 使用koa-generator生成koa2项目
``` shell
$ koa2 -e sys_api  #sys_api 为项目名称 -e 代表使用模板引擎ejs 默认为pug
```
#### 1.3 进入项目
``` shell
$ cd sys_api
$ npm install 
```
#### 1.4 运行项目
```shell
npm run dev   # http://localhost:3000 默认端口号 3000
```
### 2. 添加自定义中间价
创建文件夹middleware存放各种自定义中间件；  
创建文件 koa-pv.js:  
``` js
function pv(ctx) {
  global.console.log('当前路由', ctx.path) // 打印当前路由，node中全局不能用window，需要用global代替
}

module.exports = function () {
  return async function (ctx, next) {
    pv(ctx)
    await next() // 每个中间件都必须有这一句，用以执行下一个中间件
  }
}
``` 
然后在app.js中使用刚才定义的文件:  
``` js
// 自定义中间件
const pv = require('./middleware/koa-pv')
app.use(pv())
```  
### 3. 跨域配置 koa2-cors
#### 3.1 安装 koa2-cors  
``` shell 
npm i koa2-cors --save
```
#### 3.2 在 app.js 中引入 koa2-cors
``` js
const cors = require('koa2-cors');

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
```  