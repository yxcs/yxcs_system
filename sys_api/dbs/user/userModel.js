var User = require("./userSchema");

function insertOne(params, callback) {

  var user = new User(params);

  user.save(function (err, res) {
    if (err) {
      console.error("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  });
}

// params = {} || []
function createMany(params, callback) {
  User.create(params, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log('保存成功：' + res);
      callback(res);
    }
  });
}

function insertMany(params, callback) {
  User.insertMany(params, function(err, res){
    if (err) {
      console.log(err);
    } else {
      console.log('保存成功：' + res);
      callback(res);
    }
  });
}

// update 为更新数据
function updateByQuery(where, update, opt, callback) {
  User.update(where, update, opt, function (err, res) {
    if (err) {
      console.error("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

// 一次更新多条
// update = {} || []
function updateMany(where, update, opt, callback) {
  User.update(where, update, opt, function (err, res) {
    if (err) {
      console.error("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

function findByIdAndUpdate(id, update, callback) {
  User.findByIdAndUpdate(id, update, function (err, res) {
    if (err) {
      console.error("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

function deleteOne(where, callback) {
  User.remove(where, function (err, res) {
    if (err) {
      console.error("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

// find many
function getByConditions(where, opt, callback) {
  User.find(where, opt, function (err, res) {
    if (err) {
      console.error("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

function getCountByConditions(where, callback) {
  User.count(where, function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

function findById(id, callback) {
  User.findById(id, function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

function getByRegex(where, callback) {
  User.find(where, function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

function getByPager(pageSize, currentPage, sort, where, callback) {
  var skipnum = (currentPage - 1) * pageSize; //跳过数

  User.find(where).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
    } else {
      console.log("Res:" + res);
      callback(res);
    }
  })
}

module.exports = {
  insertOne: insertOne,
  createMany: createMany,
  insertMany: insertMany,
  updateByQuery: updateByQuery,
  updateMany: updateMany,
  findByIdAndUpdate: findByIdAndUpdate,
  deleteOne: deleteOne,
  getByConditions: getByConditions,
  getCountByConditions: getCountByConditions,
  findById: findById,
  getByRegex: getByRegex,
  getByPager: getByPager
}