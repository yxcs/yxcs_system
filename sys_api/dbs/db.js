var mongoose = require('mongoose');
var config = require('../config');

// mongodb:// + [用户名:密码@] +数据库地址[:端口] + 数据库名
var DB_URL = 'mongodb://' + config.dbHost + config.dbName;

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('数据库已经连接到 ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('数据库连接失败' + err);
});
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('数据库连接已关闭');
});

module.exports = mongoose;