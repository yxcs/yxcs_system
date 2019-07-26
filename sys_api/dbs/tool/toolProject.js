import mongoose from '../db.js';
const Schema = mongoose.Schema;

const ToolProjectSchema = new Schema({
  operateBy: {
    type: String,
    default: null
  },
  name: {                                                    // 项目名称
    type: String,
    default: null
  },
  startTime: {
    type: Date,
    default: null
  },
  endTime: {
    type: Date,
    default: null
  },
  frontDevPersion: {
    type: Array,
    default: []
  },
  backDevPersion: {
    type: Array,
    default: []
  },
  testDevPersion: {
    type: Array,
    default: []
  },
  productDevPersion: {
    type: Array,
    default: []
  },
  website: {
    type: Number,
    default: 1                                 // {1: cms.biyao.com, 2: ark.biyao.com}
  },
  status: {
    type: Number,
    default: 1                                 // {1: 待开发, 2: 详设中, 3: 开发中, 4: 联调中, 5: 测试中, 6: 延期, 7: 已上线}
  },
  docUrl: {
    type: String,
    default: null
  },
  review: {
    type: Array,
    default: []
  },
  remarks: {
    type: Array,
    default: []
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

export default mongoose.model('ToolProject', ToolProjectSchema);