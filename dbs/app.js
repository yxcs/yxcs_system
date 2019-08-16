var MongoClient = require('mongodb').MongoClient
var async = require('async');
var dbURL = 'mongodb://localhost:27017'
var fs = require('fs')
var path = require('path')

// 微信

// MongoClient.connect(dbURL,function(err, db) {

//   var oldDB = db.db('gzh_article');
//   var article = oldDB.collection('gzxarticles');

//   var sysDB = db.db('sys');
//   var book = sysDB.collection('bookmarks');

//   function insertBook (item, callback) {
//     book.insertOne({
//       title: item.title,
//       source: item.articleSource + ' - 公众号',
//       linkTo: item.content_url,
//       coverImg: item.cover,
//       sourceType: 'weixin',
//       type: '',
//       createAt: new Date(),
//       updateAt: new Date()
//     }, function (error, result) {
//       var re = JSON.parse(result);
//       if (re.n === 1) {
//         console.log("插入成功。");
//       } else {
//         console.log("插入失败,error：" + error);
//       }
//       callback()
//     })
//   }
  
//   function cb (err, data) {
//     console.log('err:', err)
//     console.log('data:', data)
//     console.log('插入完成')
//   }

//   article.find({}).toArray(function(error, docs) {
//     async.each(docs, insertBook, cb)
//     db.close();
//   })
// })


// // 头条
MongoClient.connect(dbURL,function(err, db) {

  var sysDB = db.db('sys');
  var book = sysDB.collection('bookmarks');

  function insertBook (item, callback) {
    book.insertOne({
      title: item.title,
      source: item.source + ' - 头条',
      linkTo: item.display_url,
      coverImg: item.image_url,
      sourceType: 'toutiao',
      type: item.tag,
      createAt: new Date(),
      updateAt: new Date()
    }, function (error, result) {
      var re = JSON.parse(result);
      if (re.n === 1) {
        console.log("插入成功。");
      } else {
        console.log("插入失败,error：" + error);
      }
      callback()
    })
  }
  
  function cb (err, data) {
    console.log('err:', err)
    console.log('data:', data)
    console.log('插入完成')
  }

  var file = path.join(__dirname, './toutiao.json');
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      res.send('文件读取失败');
    } else {
      var docs = []
      data2Json = JSON.parse(data)
      data2Json.forEach(function (item) {
        docs = docs.concat(item.data)
      })
      async.each(docs, insertBook, cb)
      db.close()
    }
  })
})