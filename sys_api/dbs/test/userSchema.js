/**
 * 用户信息
 */
var mongoose = require('./db.js'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    index: true
  },
  userpwd: {
    type: String
  },
  userage: {
    type: Number
  },
  logindate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('find', function (next) {
  console.log('我是pre方法1');
  next();
});

UserSchema.post('find', function (docs) {
  console.log('我是post方法1');
});

module.exports = mongoose.model('User', UserSchema);