import mongoose from '../db.js';
const Schema = mongoose.Schema;

const ToolFlowSchema = new Schema({
  projectId: {
    type: String,
    default: ''
  },
  projectName: {
    type: String,
    default: ''
  },
  stage: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 1                                 // {1: 待开发, 2: 详设中, 3: 开发中, 4: 联调中, 5: 测试中, 6: 延期, 7: 已上线}
  },
  list: {
    type: Array,
    default: []
  }
});

/** 
 * list default
  {
   "remarks" : [],
    "explain" : [ 
        "提出问题"
    ],
    "operate" : [],
    "account" : [],
    "document" : null,
    "mailTo" : [],
    "persion" : [],
    "example" : [],
    "updateTime" : null,
    "endTime" : null,
    "startTime" : null,
    "status" : 1,
    "type" : 1,
    "title" : "项目复盘",
    "onlySign" : "REVIEW",
    "primaryKey" : 10036
  }
*/

export default mongoose.model('ToolFlow', ToolFlowSchema);