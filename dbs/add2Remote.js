var MongoClient = require('mongodb').MongoClient
var async = require('async');
const superagent = require('superagent');
var dbURL = 'mongodb://localhost:27017'
const fs = require('fs')
var path = require('path')

// MongoClient.connect(dbURL,function(err, db) {

//   var sysDB = db.db('sys');
//   var book = sysDB.collection('bookmarks');

//   var i = 0;

//   function insertBook (item, callback) {
//     i ++
//     superagent.post('http://manage.oyxco.com/insertBookmark')
//               .send({
//                 title: item.title,
//                 source: item.source,
//                 linkTo: item.linkTo,
//                 coverImg: item.coverImg,
//                 sourceType: item.sourceType,
//                 type: item.type,
//                 createAt: item.createAt,
//                 updateAt: item.updateAt
//               })
//               .set({
//                 'Authorization': 'foBearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVkMGFmYmU1NmVjMTg4NWIwMzUyNzFlNSIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQwNSR0R0ZhRmNKYlVpMW9UNUdTZ05jZmQuTjBBS2dlT3BrOWVGdmM4czNmS2dkZERTanJkRVcxVyIsIl9fdiI6MCwicG93ZXIiOiJTWVMiLCJub3RpY2VBdCI6IjIwMTktMDYtMjBUMDM6MjI6MTMuMjk1WiIsIm5vdGljZSI6IiIsInNsb2dhbiI6IiIsImF2YXRhciI6Imh0dHA6Ly9pbWcub3l4Y28uY29tL2F2YXRhci81ZTc2NmYyZjRmZjI0Yzg3NzljOTRmOWQ0MjZkMzJkMC5qcGciLCJsb2dpbmRhdGUiOiIyMDE5LTA2LTIwVDAzOjIyOjEzLjI5NVoifSwiZXhwIjoxNTY2MDM2NzQ1LCJpYXQiOjE1NjU5NTAzNDV9.rqECepfC6OQHpLDBmmRQ7onvtIV7l6C4jY14u3wtXOAobar',
//                 'Referer': 'http://manage.oyxco.com/'
//               })
//               .end(function (res) {
//                 if (res.ok) {
//                   console.log('成功 =>', i)
//                 } else {
//                   console.log('失败 =>', i)
//                 }
//                 callback()
//               })
//   }
  
//   function cb (err, data) {
//     console.log('err:', err)
//     console.log('data:', data)
//     console.log('插入完成')
//   }

//   book.find({}).toArray(function(error, docs) {
//     fs.writeFileSync('prod.json', JSON.stringify(docs))
//     // async.each(docs, insertBook, cb)
//     db.close();
//   })
// })

  var i = 0;

  function insertBook (item, callback) {
    i ++
    superagent.post('http://manage.oyxco.com/insertBookmark')
              .send({
                title: item.title,
                source: item.source,
                linkTo: item.linkTo,
                coverImg: item.coverImg,
                sourceType: item.sourceType,
                type: item.type,
                createAt: item.createAt,
                updateAt: item.updateAt
              })
              .set({
                'Authorization': 'foBearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVkMGFmYmU1NmVjMTg4NWIwMzUyNzFlNSIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQwNSR0R0ZhRmNKYlVpMW9UNUdTZ05jZmQuTjBBS2dlT3BrOWVGdmM4czNmS2dkZERTanJkRVcxVyIsIl9fdiI6MCwicG93ZXIiOiJTWVMiLCJub3RpY2VBdCI6IjIwMTktMDYtMjBUMDM6MjI6MTMuMjk1WiIsIm5vdGljZSI6IiIsInNsb2dhbiI6IiIsImF2YXRhciI6Imh0dHA6Ly9pbWcub3l4Y28uY29tL2F2YXRhci81ZTc2NmYyZjRmZjI0Yzg3NzljOTRmOWQ0MjZkMzJkMC5qcGciLCJsb2dpbmRhdGUiOiIyMDE5LTA2LTIwVDAzOjIyOjEzLjI5NVoifSwiZXhwIjoxNTY2MDM2NzQ1LCJpYXQiOjE1NjU5NTAzNDV9.rqECepfC6OQHpLDBmmRQ7onvtIV7l6C4jY14u3wtXOAobar',
                'Referer': 'http://manage.oyxco.com/'
              })
              .end(function (res) {
                if (res.ok) {
                  console.log('成功 =>', i)
                } else {
                  console.log('失败 =>', i)
                }
                callback()
              })
  }
  
  function cb (err, data) {
    console.log('err:', err)
    console.log('data:', data)
    console.log('插入完成')
  }

  var file = path.join(__dirname, './prod.json');
  fs.readFile(file, 'utf-8', function(err, data) {
    if (err) {
      res.send('文件读取失败');
    } else {
      var docs = JSON.parse(data)
      async.each(docs, insertBook, cb)
    }
  })