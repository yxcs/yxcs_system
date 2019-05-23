const router = require('koa-router')()

// 静态资源
const Path = require("path");
const fs = require("fs");
const zlib = require('zlib');

const config = require('../config')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/static/:name', async (ctx, next) => {
  const fileName = Path.resolve(__dirname, "../../public/" + ctx.url);
  const extName = Path.extname(fileName).substr(1);

  if (fs.existsSync(fileName)) {
    const mineTypeMap = {
      html: 'text/html;charset=utf-8',
      htm: 'text/html;charset=utf-8',
      xml: "text/xml;charset=utf-8",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      css: "text/css;charset=utf-8",
      txt: "text/plain;charset=utf-8",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      ico: "image/x-icon",
      tif: "image/tiff",
      svg: "image/svg+xml",
      zip: "application/zip",
      ttf: "font/ttf",
      woff: "font/woff",
      woff2: "font/woff2",
    }
    if (mineTypeMap[extName]) {
      res.setHeader('Content-Type', mineTypeMap[extName]);
    }
    const stream = fs.createReadStream(fileName);
    if (req.headers["accept-encoding"].indexOf("gzip") >= 0 && (extName == "js" || extName == "css" || extName == "html")) {
      res.setHeader('Content-Encoding', "gzip");
      const gzip = zlib.createGzip();
      stream.pipe(gzip).pipe(res);
    } else {
      ctx.body = stream.pipe(res);
    }
  } else {
    // ctx.redirect('/404')
    ctx.body = {
      status: 404,
      message: '文件不存在'
    }
  }
})

router.get('/images/:name', async (ctx, next) => {
  const fileName = Path.resolve(__dirname, "../../public/" + ctx.url);
  const extName = Path.extname(fileName).substr(1);

  if (fs.existsSync(fileName)) {
    const mineTypeMap = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
    }
    if (mineTypeMap[extName]) {
      res.setHeader('Content-Type', mineTypeMap[extName]);
    }
    ctx.body = stream.pipe(res);
  } else {
    // ctx.redirect('/404')
    ctx.body = {
      status: 404,
      message: '文件不存在'
    }
  }
})

router.get('/404', async (ctx, next) => {
  await ctx.render('404', {
    title: '404 出错！',
    content: '404'
  })
})

router.post('/uploadfile', async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  const reader = fs.createReadStream(file.path);
  let filePath = Path.join(__dirname, '../public/static/') + `/${file.name}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  return ctx.body = {
    url: config.BASE_URL + '/static/' + file.name,
    fileCount: 1,
    message: '上传成功'
  }
});

// 上传多个文件
router.post('/uploadfiles', async (ctx, next) => {
  const filenames = [];
  const files = ctx.request.files.file;
  for (let file of files) {
    const reader = fs.createReadStream(file.path);
    let filePath = Path.join(__dirname, 'public/upload/') + `/${file.name}`;
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    filenames.push(config.BASE_URL + '/static/' + file.name)
  }
  return ctx.body = {
    url: filenames,
    fileCount: filenames.length,
    message: '上传成功'
  }
})

module.exports = router
