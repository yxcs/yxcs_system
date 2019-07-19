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
  description: {
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
  repoenStartTime: {                           // 延期时重开时间和结束时间
    type: Date,
    default: null
  },
  repoenEndTime: {
    type: Date,
    default: null
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
  }
});

export default mongoose.model('ToolProject', ToolProjectSchema);