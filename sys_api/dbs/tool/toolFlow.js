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
    default: 1 // {1: prd准备 [10000-10007], 2: 详设中[1008-10013], 3: 开发中[10014-10018], 4: 联调中[10019-10021], 5: 测试中[10022-10026], 6: 上线[10027-10032] 7: 上线后文档更新处理, 101: 延期, 102: 已上线,最终状态， 103: 取消项目，最终状态}
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