import mongoose from '../db.js';
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {                                                    // 标题
    type: String
  },
  content: {                                                  // 文章内容
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
    default: ''
  },
  type: {                                                     // 文章类型
    type: Number,                                             // 1:前端 2:后端 3:面试 4:杂文
    default: 1
  },
  subType: {                                                  // 文章类型
    type: Array,                                             // [1:js 2:css 3: html 4:react 5:vue]
    default: []
  },
  source: {                                                   // 文章来源  转载|原创
    type: Number,                                             // 1:原创 2:转载 
    default: 1
  },
  readCount: {                                                // 阅读数量
    type: Number,
    default: 0
  },
  zan: {                                                      // 点赞数
    type: Number,
    default: 0
  },
  draft: {                                                    // 是否为草稿
    type: Boolean,
    default: false
  },
  createAt: {                                                 // 创建时间
    type: Date,
    default: Date.now
  },
  updateAt: {                                                 // 更新时间
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Article', ArticleSchema);