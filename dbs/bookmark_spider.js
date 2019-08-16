const cheerio = require('cheerio');
const superagent = require('superagent');
var MongoClient = require('mongodb').MongoClient
var async = require('async');
var dbURL = 'mongodb://localhost:27017'
var fs = require('fs')
var path = require('path')

// 书签
MongoClient.connect(dbURL,function(err, db) {

  var sysDB = db.db('sys');
  var book = sysDB.collection('bookmarks');

  function insertBook (item, callback) {
    book.insertOne({
      title: item.title,
      source: item.source + ' - 书签',
      linkTo: item.linkTo,
      coverImg: 'http://img.oyxco.com/default/20190512184540_ceWhn.jpeg',
      sourceType: 'bookmark',
      type: item.type,
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

  var file = path.join(__dirname, './bookmarks_2019_8_16.html');
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      res.send('文件读取失败');
    } else {
      var docs = []
      var $ = cheerio.load(data)
      var currentTag = []
      $('H3').each(function(index, item) {
        index && currentTag.push($(this).text())
      })
      $('DL DL DL').each(function (index, item) {
        $(item).find('A').each(function (idx, sItem) {
          var obj = {}
          obj.linkTo = $(sItem).attr('href')
          obj.type = currentTag[index - 1]
          obj.title =  $(sItem).text()
          obj.source = currentTag[index - 1]
          docs.push(obj)
        })
      })
      async.each(docs, insertBook, cb)
      db.close()
    }
  })
})