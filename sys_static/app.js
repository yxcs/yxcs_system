var http = require("http");
var Path = require("path");
var fs = require("fs");
var zlib = require('zlib');

var server = http.createServer(function (req, res) {
  var fileName = Path.resolve(__dirname, "." + req.url);
  var extName = Path.extname(fileName).substr(1);

  if (fs.existsSync(fileName)) {
    var mineTypeMap = {
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
    var stream = fs.createReadStream(fileName);
    if (req.headers["accept-encoding"].indexOf("gzip") >= 0 && (extName == "js" || extName == "css" || extName == "html")) {
      res.setHeader('Content-Encoding', "gzip");
      var gzip = zlib.createGzip();
      stream.pipe(gzip).pipe(res);
    } else {
      stream.pipe(res);
    }
  } else {
    var stream = fs.createReadStream(Path.resolve(__dirname, "." + '/hello.html'));
    stream.pipe(res);
  }
})
server.listen(4001);