/**
 * 用户信息
 */
import mongoose from '../db.js';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    index: true
  }, //用户账号
  password: {
    type: String
  }, //密码
  logindate: {
    type: Date,
    default: Date.now
  } //最近登录时间
});

export default mongoose.model('User', UserSchema);