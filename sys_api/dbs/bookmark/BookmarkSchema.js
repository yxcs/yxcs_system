import mongoose from '../db.js';
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  title: {                                                    // 标题
    type: String
  },
  source: {
    type: String
  },
  linkTo: {
    type: String
  },
  coverImg: {
    type: String
  },
  sourceType: {
    type: String,
    default: 'bookmark'         // bookmark、toutiao、weixin、juejin
  },
  type: {
    type: String,
    default: 'interview'         // 面试、资源、小程序、微信、移动端，github、服务器、文档、学习
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Bookmark', BookmarkSchema);