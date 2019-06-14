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
  },
  avatar: {
    type: String,
    default: 'http://img.oyxco.com/avatar/5e766f2f4ff24c8779c94f9d426d32d0.jpg'
  },
  slogan: {
    type: String,
    default: ''
  },
  notice: {
    type: String,
    default: ''
  },
  noticeAt: {
    type: Date,
    default: Date.now
  },
  power: {
    type: String,
    default: 'BLOG_MANAGEMENT'
  }
});

export default mongoose.model('User', UserSchema);