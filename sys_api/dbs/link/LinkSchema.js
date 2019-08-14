import mongoose from '../db.js';
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  title: {                                                    // 标题
    type: String
  },
  authorName: {                                               // 作者名称
    type: String
  },
  authorId: {                                                 // 作者ID
    type: String
  },
  coverImg: {                                                 // 封面图片
    type: String,
    default: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  url: {                                                      // 书签链接
    type: String,
    default: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  type: {                                                     // 文章类型
    type: Number,                                             // 1:前端 2:后端 3:面试 4:杂文
    default: 1
  },
  createAt: {                                                 // 创建时间
    type: Date,
    default: Date.now
  },
  updateAt: {                                                 // 更新时间
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Link', LinkSchema);