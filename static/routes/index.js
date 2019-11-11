const router = require('koa-router')()

// 静态资源
const Path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const qiniu = require('qiniu')

const config = require('../config')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/static/:name', async (ctx, next) => {
  const fileName = Path.resolve(__dirname, '../../public/' + ctx.url);
  const extName = Path.extname(fileName).substr(1);

  if (fs.existsSync(fileName)) {
    const mineTypeMap = {
      html: 'text/html;charset=utf-8',
      htm: 'text/html;charset=utf-8',
      xml: 'text/xml;charset=utf-8',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      css: 'text/css;charset=utf-8',
      txt: 'text/plain;charset=utf-8',
      mp3: 'audio/mpeg',
      mp4: 'video/mp4',
      ico: 'image/x-icon',
      tif: 'image/tiff',
      svg: 'image/svg+xml',
      zip: 'application/zip',
      ttf: 'font/ttf',
      woff: 'font/woff',
      woff2: 'font/woff2',
    }
    if (mineTypeMap[extName]) {
      res.setHeader('Content-Type', mineTypeMap[extName]);
    }
    const stream = fs.createReadStream(fileName);
    if (req.headers['accept-encoding'].indexOf('gzip') >= 0 && (extName == 'js' || extName == 'css' || extName == 'html')) {
      res.setHeader('Content-Encoding', 'gzip');
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
  const fileName = Path.resolve(__dirname, '../../public/' + ctx.url);
  const extName = Path.extname(fileName).substr(1);

  if (fs.existsSync(fileName)) {
    const mineTypeMap = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
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

router.post('/uploadfile', (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  const url = saveToLocal(file)

  return ctx.body = {
    url,
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
    filenames.push(config.STATIC_URL + '/static/' + file.name)
  }
  return ctx.body = {
    url: filenames,
    fileCount: filenames.length,
    message: '上传成功'
  }
})

// 上传至七牛
router.post('/qiniu', async (ctx, next) => {
  const file = ctx.request.files.file;
  const imageUrl = 'http://img.oyxco.com'; // 域名名称
  const extend = file.name.substring(file.name.lastIndexOf('.'))
  const fileName = Date.now() + extend;
  const qiniuPath = 'static/tmp/' + fileName;
  const respBody = await qiniuPromise(qiniuPath, file.path)
  const localUrl = saveToLocal(file)

  return ctx.body = {
    url: imageUrl + '/' + respBody.key,
    localUrl: localUrl,
    fileCount: 1,
    message: '上传成功'
  }
})

const qiniuPromise = (qiniuPath, path) => {
  const bucket = 'kkkkeqi';
  const accessKey = 'yIQ28eI8gWaAvubxsq0wMOeR6FoTtt2rnSUiy3PS'
  const secretKey = '70ywdZYqvyJfLUuT10voR9hFqhi6MiEZyqO1SyOy'
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: bucket,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0;
  const putExtra = new qiniu.form_up.PutExtra();
  const formUploader = new qiniu.form_up.FormUploader(config);

  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, qiniuPath, path, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        reject(respErr)
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        reject(respBody)
      }
    });
  })
}

const saveToLocal = (file) => {
  const reader = fs.createReadStream(file.path);
  let filePath = Path.join(__dirname, '../public/static/') + `/${file.name}`;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  return config.STATIC_URL + '/static/' + file.name;
}

module.exports = router
