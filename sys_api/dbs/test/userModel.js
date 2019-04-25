var User = require("./userSchema.js");

/** 插入信息 */
// params => {}
function insertBySave(params, callback) {
  var user = new User(params);
  user.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  });
}
// params => [{name:"a"},{name:"b"}]
function insertByCreate(params, callback) { 
  User.create(params[0], params[1],function(err, doc1, doc2){
    //{ __v: 0, name: 'xiaowang', _id: 59720d83ad8a953f5cd04664 }
    console.log(doc1); 
    //{ __v: 0, name: 'xiaoli', _id: 59720d83ad8a953f5cd04665 }
    console.log(doc2);
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: [doc1, doc2]
      })
    }
  });
}
// params => [{name:"a"},{name:"b"}]
function insertMany(params, callback) {
  temp.insertMany(params,function(err, res){
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  });   
}

/** 信息查找 */
// where 查询条件，showOpts 返回显示列控制，options 查询配置 例如{skip:2}
function findAll(where, showOpts, options, callback) {
  User.find(where, showOpts, options, function(err, res){
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}
// 根据id查询
function findById(id, showOpts, options, callback) {
  User.findById(id, showOpts, options, function(err, res){
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}
// 查找第一个
function findOne(where, showOpts, options, callback) {
  User.findOne(where, showOpts, options, function(err, res){
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}

/** 更新信息 */
// 需要配置options信息
function updateAll(where, msg, options, callback) {
  User.update(where, msg, options, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}
// 默认开启 {multi:true}
function updateMany(where, msg, options, callback) {
  User.updateMany(where, msg, options, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}
// 更新一个
function updateOne(where, msg, options, callback) {
  User.updateOne(where, msg, options, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}

/** 文档删除 */
function deleteAll(where, callback) {
  User.remove(where, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}
function deleteOne(where, options, callback) {
  User.findOneAndRemove(where, options, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}
function deleteById(id, options, callback) {
  User.findByIdAndRemove(id, options, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}

/** 数量查询 */
function getCountByConditions(where, callback) {
  User.count(where, function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}
/** 分页查询 */
function getByPager(where, limit, current, sort) {
  var sort = {
    'logindate': -1
  }; //排序（按登录时间倒序）
  var skipnum = (current - 1) * limit; //跳过数

  User.find(where).skip(skipnum).limit(limit).sort(sort).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
      callback({
        code: 0,
        msg: '出错了',
        data: {}
      })
    } else {
      console.log("Res:" + res);
      callback({
        code: 1,
        msg: '插入成功',
        data: res
      })
    }
  })
}

/** 常见options */
// safe (boolean)： 默认为true。安全模式。
// upsert (boolean)： 默认为false。如果不存在则创建新记录。
// multi (boolean)： 默认为false。是否更新多个查询记录。
// runValidators： 如果值为true，执行Validation验证。
// setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
// strict (boolean)： 以strict模式进行更新。
// overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。

/** 常用查询后处理 */
// sort     排序
// skip     跳过
// limit    限制
// select   显示字段
// exect    执行
// count    计数
// distinct 去重

module.exports = {
  insertBySave: insertBySave,
  insertByCreate: insertByCreate,
  insertMany: insertMany, 
  findAll: findAll,
  findById: findById,
  findOne: findOne,
  updateAll: updateAll,
  updateMany: updateMany,
  updateOne: updateOne,
  deleteAll: deleteAll,
  deleteOne: deleteOne,
  deleteById: deleteById,
  getCountByConditions: getCountByConditions,
  getByPager: getByPager
}