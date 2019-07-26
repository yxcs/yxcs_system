import Pro from '../dbs/tool/toolProject';
// import Flow from '../dbs/tool/toolFlowOld';
import Flow from '../dbs/tool/toolFlow';

const list = [
  {
      "remarks": [],
      "explain": [
          "提出问题"
      ],
      "operate": [],
      "account": [],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "项目复盘",
      "onlySign": "REVIEW",
      "primaryKey": 10036
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": [],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 0,
      "type": 2,
      "title": "首周运营观察报告",
      "onlySign": "REPORT",
      "primaryKey": 10035
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": [
          "http://wiki.biyao.com",
          "BY_account"
      ],
      "document": [
          "http://wiki.biyao.com/pages/viewpage.action?pageId=2589810"
      ],
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "更新前端各分支文档",
      "onlySign": "UPDATE_CONFLUENCE",
      "primaryKey": 10034
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": [
          "http://192.168.99.65",
          "BY_acount"
      ],
      "document": [
          "http://192.168.99.65/svn/biyao-web/公共支撑/项目管理/"
      ],
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "更新文档",
      "onlySign": "UPDATE_DOCUMENT",
      "primaryKey": 10033
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [
          "待处理工单进行工单最后确认"
      ],
      "account": [
          "http://mytask.biyao.com",
          "BY_account"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "确认上线邮件",
      "onlySign": "CONFIRM_ORDR_MAIL",
      "primaryKey": 10032
  },
  {
      "remarks": [],
      "explain": [
          "在公司，第二天不用来",
          "在家，第二天下午来"
      ],
      "operate": [],
      "account": [],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "跟上线",
      "onlySign": "FOLLOW_SEND_VERSION",
      "primaryKey": 10031
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": [],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 0,
      "type": 2,
      "title": "上线跟进人员",
      "onlySign": "CONFIRM_VERSION_PERSION",
      "primaryKey": 10030
  },
  {
      "remarks": [],
      "explain": [
          "发工单ID",
          "描述工单内容",
          "@相关负责人",
          "查看工单状态"
      ],
      "operate": [],
      "account": [],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [
          "\n          图片\n          工单ID： 00012\n          709上线，一起拼V2.1上线发版工单，请领导审批\n          @前端主管、@技术主管\n        "
      ],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "必要技术企业群发送工单审批",
      "onlySign": "SEND_TO_RATIFY",
      "primaryKey": 10029
  },
  {
      "remarks": [],
      "explain": [
          "工单填写范例"
      ],
      "operate": [
          "领导审批",
          "运维发版"
      ],
      "account": [
          "http://mytask.biyao.com",
          "BY_account"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [
          "\n          标题：【老客专项1.1&一起拼2.1】cms.biyao.com\n          工单描述：\n            发版项目名：cms系统\n            项目域名：cms.biyao.com\n            系统版本：V1.3.19\n            发版目标：双子座\n            版本号：cms.biyao.com_v1.3.19_visitorgemini_20190719110509.tar.gz\n            提测内容：\n              老客专项1.1&一起拼2.1  合并主干\n          选择审批人：前端主管、技术主管\n          选择测试人员：~~\n          选择环境：上线环境【武清、ARK等】\n          SVN版本：主干\n          计划操作时间：发版排期时间，运维发版时间\n          是否修改配置文件：无\n          是否关联SQL工单：无\n          是否为紧急BUG修复工单： 否\n        "
      ],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "上线工单",
      "onlySign": "MAIN_VERSION",
      "primaryKey": 10028
  },
  {
      "remarks": [],
      "explain": [
          "找自己最后的包和测试给的最后的包对照"
      ],
      "operate": [],
      "account": [
          "http://jenkins.rd.biyao.com/",
          "online",
          "release_svn"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "online发版",
      "onlySign": "SEND_VERSION",
      "primaryKey": 10027
  },
  {
      "remarks": [],
      "explain": [
          "其他上线分支合并到主分支",
          "此项目分支合并到主分支"
      ],
      "operate": [
          "发给对应测试进行发版，不能自己发版"
      ],
      "account": [
          "http://mytask.biyao.com",
          "BY_account"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [
          "\n          标题：【老客专项1.1&一起拼2.1】cms.biyao.com\n          工单描述：\n            发版项目名：cms系统\n            项目域名：cms.biyao.com\n            系统版本：V1.3.19\n            发版目标：双子座\n            版本号：cms.biyao.com_v1.3.19_visitorgemini_20190719110509.tar.gz\n            提测内容：\n              老客专项1.1&一起拼2.1  合并主干\n          选择测试人员：~~\n          选择环境：双子\n          SVN版本：主干\n          计划操作时间：选择当前时间\n          是否修改配置文件：无\n          是否关联SQL工单：无\n          是否为紧急BUG修复工单： 否\n        "
      ],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "提主干测试工单",
      "onlySign": "MERGE_ORDER",
      "primaryKey": 10026
  },
  {
      "remarks": [],
      "explain": [
          "其他上线分支合并到主分支",
          "此项目分支合并到主分支"
      ],
      "operate": [],
      "account": [],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "合并主干",
      "onlySign": "MERGE_MASTER",
      "primaryKey": 10025
  },
  {
      "remarks": [],
      "explain": [
          "查看bug归属",
          "修复bug",
          "填写bug原因处理状态和结果",
          "关闭JIRA",
          "再次提测试工单"
      ],
      "operate": [
          "查看JIRA",
          "更改JIRA状态"
      ],
      "account": [
          "http://192.168.96.165:8080/secure/Dashboard.jspa",
          "BY_account"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "bug修复",
      "onlySign": "DEBUG",
      "primaryKey": 10024
  },
  {
      "remarks": [],
      "explain": [
          "工单填写范例"
      ],
      "operate": [
          "发给对应测试进行发版，不能自己发版"
      ],
      "account": [
          "http://mytask.biyao.com",
          "BY_account"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [
          "\n          标题：【老客专项1.1&一起拼2.1】cms.biyao.com\n          工单描述：\n            发版项目名：cms系统\n            项目域名：cms.biyao.com\n            系统版本：V1.3.19\n            发版目标：双子座\n            版本号：cms.biyao.com_v1.3.19_visitorgemini_20190719110509.tar.gz\n            提测内容：\n              老客专项1.1&一起拼2.1  提测\n          选择测试人员：~~\n          选择环境：双子\n          SVN版本：分支\n          计划操作时间：选择当前时间\n          是否修改配置文件：无\n          是否关联SQL工单：无\n          是否为紧急BUG修复工单： 否\n        "
      ],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "提测工单",
      "onlySign": "TEST_ORDER",
      "primaryKey": 10023
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": [
          "http://jenkins.rd.biyao.com/",
          "dev",
          "Image"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "提测",
      "onlySign": "TEST_VERSION",
      "primaryKey": 10022
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [
          "前后端及时沟通，有问题及时更改"
      ],
      "account": [],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "联调",
      "onlySign": "TEST_API",
      "primaryKey": 10021
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": [
          "http://jenkins.rd.biyao.com/",
          "dev",
          "build"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "联调发版",
      "onlySign": "TEST_API_VERSION",
      "primaryKey": 10020
  },
  {
      "remarks": [],
      "explain": [
          "企业微信发给产品经理"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "联调拆解计划表",
      "onlySign": "SEND_TEST_API_PLAN",
      "primaryKey": 10019
  },
  {
      "remarks": [],
      "explain": [
          "发送到对应人"
      ],
      "operate": [
          "上传自测文档",
          "发送邮件"
      ],
      "account": null,
      "document": null,
      "mailTo": [
          "@qa?",
          "@测试",
          "@产品",
          "@前端开发",
          "@后端开发",
          "抄送：@前端主管"
      ],
      "persion": [],
      "example": [
          "\n          问好：\n          附件为  一起拼V2.1  前端自测文档，请查收！\n          如有问题，随时沟通！\n      \n          谢谢！\n        "
      ],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "发送自测报告",
      "onlySign": "MAIL_TEST_DOC",
      "primaryKey": 10018
  },
  {
      "remarks": [],
      "explain": [
          "仔细测试",
          "前端开发完成时自测",
          "联调完成时自测",
          "提测后时自测"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "自测",
      "onlySign": "TEST_BY_SELF",
      "primaryKey": 10017
  },
  {
      "remarks": [],
      "explain": [
          "对测试用例提出疑问",
          "根据测试用例更改开发bug"
      ],
      "operate": [
          "保存测试用例"
      ],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "测试用例评审",
      "onlySign": "TEST_EXPLAIN",
      "primaryKey": 10016
  },
  {
      "remarks": [],
      "explain": [
          "认真分析逻辑",
          "提高代码质量"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "开发",
      "onlySign": "DEV_CODING",
      "primaryKey": 10015
  },
  {
      "remarks": [],
      "explain": [
          "分支命名规范"
      ],
      "operate": [
          "从主分支拉取新分支"
      ],
      "account": [
          "http://192.168.99.65/svn/pmall/biyao-cms/branches/cms_vue/",
          "http://192.168.99.68/users/sign_in",
          "BY_account"
      ],
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "拉取新分支",
      "onlySign": "PULL_BRANCH",
      "primaryKey": 10014
  },
  {
      "remarks": [],
      "explain": [
          "从后端会议纪要保存后端接口详设"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "后端详设宣讲",
      "onlySign": "BACL_EXPLAIN",
      "primaryKey": 10013
  },
  {
      "remarks": [],
      "explain": [
          "会议纪要邮件范例",
          "附件-更新后的详设文档"
      ],
      "operate": [
          "更新详设文档",
          "发送邮件"
      ],
      "account": null,
      "document": null,
      "mailTo": [
          "@测试",
          "@产品",
          "@前端开发",
          "@后端开发",
          "抄送：@前端主管"
      ],
      "persion": [],
      "example": [
          "\n          Hi，all：\n          问好！\n          附件为本次的详细设计文档\n          以下为CMS- 个人中心改版V1.0-前端详细设计评审 会议总结\n      \n          【会议主题】 CMS-个人中心改版V1.0-前端详细设计评审\n          【会议时间】2019-04-30  16:00-17:00 （周二）\n          【会议地点】12F 必辉\n          【参会人员】 王倩 范桂红 曹保卫 李朋飞\n          【会议内容】\n                  完成 CMS-个人中心改版V1.0-前端详细设计评审                  \n          【会议纪要】\n                - 已确认 @开发 @测试 @曹保卫\n                  1.  添加&编辑滑动图标页，显示终端下方提示文案改为：“请谨慎操作来源枚举值、业务枚举值、路由信息，调整相关信息请同步网关，否则有可能造成无法跳转”\n                  2.  添加&编辑滑动图标页，提交保存成功后，跳转到滑动图标列表页\n          \n          如遇问题请大家及时沟通。\n          谢谢！\n        "
      ],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "发详设会议纪要",
      "onlySign": "MEETING_MINUTE",
      "primaryKey": 10012
  },
  {
      "remarks": [],
      "explain": [
          "宣讲后更改前端详设文档"
      ],
      "operate": [
          "详设确认点记录",
          "更改详设文档"
      ],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "前端详设宣讲",
      "onlySign": "FRONT_EXPLAIN",
      "primaryKey": 10011
  },
  {
      "remarks": [],
      "explain": [
          "邮件范例",
          "附件-详设文档"
      ],
      "operate": [
          "上传详设文档",
          "会议室预定",
          "发送邮件"
      ],
      "account": [
          "http://192.168.99.65",
          "BY_acount"
      ],
      "document": [
          "http://192.168.99.65/svn/biyao-web/公共支撑/项目管理/"
      ],
      "mailTo": [
          "@测试",
          "@产品",
          "@前端开发",
          "@后端开发",
          "抄送：@前端主管"
      ],
      "persion": [],
      "example": [
          "\n          hi，all：\n          邀请大家参加CMS-  个人中心改版V1.0   -前端详细设计评审\n          时间：2019-04-30  16:00-17:00 （周二）\n          地点：12F 必辉\n          附加：详设文档\n        "
      ],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "发详设评审邮件",
      "onlySign": "DESIGN_EMAIL",
      "primaryKey": 10010
  },
  {
      "remarks": [],
      "explain": [
          "详设文档编写+附加接口详设"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "前端详设",
      "onlySign": "FRONT_DESIGN",
      "primaryKey": 10009
  },
  {
      "remarks": [],
      "explain": [
          "发送给后端"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "前端-接口需求详设",
      "onlySign": "API_DESIGN",
      "primaryKey": 10008
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 0,
      "type": 3,
      "title": "新站点提前两天申请服务器和部署",
      "onlySign": "NEW_WEBSITE",
      "primaryKey": 10007
  },
  {
      "remarks": [],
      "explain": [
          "排期表"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "排期",
      "onlySign": "SCHEDULING",
      "primaryKey": 10006
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 0,
      "type": 2,
      "title": "工作量评估",
      "onlySign": "EFFORT_ESTIMATION",
      "primaryKey": 10005
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 0,
      "type": 2,
      "title": "PRD定稿签字",
      "onlySign": "PRD_SIGN",
      "primaryKey": 10004
  },
  {
      "remarks": [],
      "explain": [],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 0,
      "type": 2,
      "title": "PRD初稿宣讲问题反馈及确认",
      "onlySign": "PRD_CONFIRM",
      "primaryKey": 10003
  },
  {
      "remarks": [],
      "explain": [
          "提出所有疑问"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "PRD宣讲",
      "onlySign": "PRD_EXPLAIN",
      "primaryKey": 10002
  },
  {
      "remarks": [],
      "explain": [
          "企业微信发给产品经理"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "PRD问题反馈",
      "onlySign": "PRD_BUG",
      "primaryKey": 10001
  },
  {
      "remarks": [],
      "explain": [
          "获取PRD文档"
      ],
      "operate": [],
      "account": null,
      "document": null,
      "mailTo": [],
      "persion": [],
      "example": [],
      "updateTime": null,
      "endTime": null,
      "startTime": null,
      "status": 1,
      "type": 1,
      "title": "PRD学习",
      "onlySign": "PRD_LEARN",
      "primaryKey": 10000
  }
]
class ToolController {
  constructor() {}

  /** new flow */
  async insertPro (ctx) {
    const { body } = ctx.request
    const pro = new Pro(body);
    const res = await pro.save();
    if (res._id) {
      const params = {
        projectId: res._id,
        projectName: res.name,
        stage: 0,
        status: 1
      }
      params.list = list
      const flow = new Flow(params);
      const flowRes = await flow.save();
      if (flowRes._id) {
        ctx.body = {
          status: 200,
          data: 1,
          message: '添加成功'
        }
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        errorCode: 4002,
        message: '添加出错'
      }
    }
  }

  async updatePro(ctx) {
    const { body } = ctx.request;
    const pro = await Pro.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async deletePro(ctx) {
    const { body } = ctx.request;
    const pro = await Pro.findByIdAndRemove(body.id, {})
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1,
      status: 200
    }
  }

  // 查找
  async getProById(ctx) {
    const { body } = ctx.request;
    let { id, showOpts = {}, options = {} } = body;
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Pro.findById(id, showOpts, options);
    if (data && data._id) {
      ctx.body = {
        status: 200,
        data: data,
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }

  async getProList(ctx) {
    const { body } = ctx.request;
    let { where = {}, limit = 10, current = 1, sort = {'updateAt': -1}} = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    const skipnum = (current - 1) * limit;
    const data = await Pro.find(where).skip(skipnum).limit(limit).sort(sort).exec();
    const count = await Pro.count(where);
    ctx.body = {
      status: 200,
      data: data,
      total: count || 0,
      message: '查找成功'
    }
  }

  async insertFlow (ctx) {
    const { body } = ctx.request
    body.list = list
    const flow = new Flow(body);
    const res = await flow.save();
    if (res._id) {
      ctx.body = {
        status: 200,
        data: 1,
        message: '添加成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        errorCode: 4002,
        message: '添加出错'
      }
    }
  }

  async updateFlow(ctx) {
    const { body } = ctx.request;
    body.params.updateTime = Date.now()
    const flow = await Flow.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async dealFlow(ctx) {
    const { body } = ctx.request;
    const curr = body.params[body.key]
    const pParams = {
      updateAt: Date.now()
    }
    if (curr.status < 3) {
      body.params.stage = curr.primaryKey
      if (curr.status === 2) {
        body.params[body.key].startTime = Date.now()
      }
      pParams.stageTxt = curr.title
      pParams.stage = body.params.stage
    } else {
      if (curr.endTime === 3) {
        body.params.startTime = Date.now()
      }
      body.params.stage = curr.primaryKey + 1
      if (body.params.stage > 10036) {
        body.params.stage = 1
        pParams.stageTxt = '已完成'
      } else {
        for (let key in body.params) {
          if (body.params[key].primaryKey === body.params.stage) {
            pParams.stageTxt = body.params[key].title
          }
        }
      }
      pParams.stage = body.params.stage
    }

    const pro = await Pro.findByIdAndUpdate(body.pId, pParams)
    const flow = await Flow.findByIdAndUpdate(body.id, body.params)
    
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async deleteFlow(ctx) {
    const { body } = ctx.request;
    const flow = await Flow.findByIdAndRemove(body.id, {})
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1,
      status: 200
    }
  }

  // 查找
  async getFlowById(ctx) {
    const { body } = ctx.request;
    let { id, showOpts = {}, options = {} } = body;
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Flow.findById(id, showOpts, options);
    if (data && data._id) {
      ctx.body = {
        status: 200,
        data: data,
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }
  // 根据项目id查找
  async getFlowByProId(ctx) {
    const { body } = ctx.request;
    let { where = {}, showOpts = {}, options = {} } = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Flow.find(where, showOpts, options).exec();
    if (data && data.length) {
      ctx.body = {
        status: 200,
        data: data[0],
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }

  async getFlowList(ctx) {
    const { body } = ctx.request;
    let { where = {}, limit = 10, current = 1, sort = {'updateAt': -1}} = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    const skipnum = (current - 1) * limit;
    const data = await Flow.find(where).skip(skipnum).limit(limit).sort(sort).exec();
    const count = await Flow.count(where);
    ctx.body = {
      status: 200,
      data: data,
      total: count || 0,
      message: '查找成功'
    }
  }
}

export default new ToolController()