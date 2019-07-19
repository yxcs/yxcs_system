import mongoose from '../db.js';
const Schema = mongoose.Schema;

const ToolFlowSchema = new Schema({
  projectId: {
    type: String,
    default: null
  },
  projectName: {
    type: String,
    default: null
  },
  prdLearn: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'PRD_LEARN',
      title: 'PRD学习',
      type: 1,                                      // {1:开启，需手动关闭, 2: 关闭，无需手动关闭, 3: 解释说明类，不可操作}
      status: 1,                                    // {0: clog, 1: pending, 2: fulfilled}
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [
        '获取PRD文档'
      ],
      remarks: []
    }
  },
  prdBug: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'PRD_BUG',
      title: 'PRD问题反馈',
      type: 1,
      status: 1,
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [
        '企业微信发给产品经理'
      ],
      remarks: []
    }
  },
  prdExplain: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'PRD_EXPLAIN',
      title: 'PRD宣讲',
      type: 1,
      status: 1,
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [
        '提出所有疑问'
      ],
      remarks: []
    }
  },
  prdConfirm: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'PRD_CONFIRM',
      title: 'PRD初稿宣讲问题反馈及确认',
      type: 2,
      status: 0,
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [],
      remarks: []
    }
  },
  prdSign: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'PRD_SIGN',
      title: 'PRD定稿签字',
      type: 2,
      status: 0,
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [],
      remarks: []
    }
  },
  effortEstimation: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'EFFORT_ESTIMATION',
      title: '工作量评估',
      type: 2,
      status: 0,
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [],
      remarks: []
    }
  },
  scheduling: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'SCHEDULING',
      title: '排期',
      type: 1,
      status: 1,
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [
        '排期表'
      ],
      remarks: []
    }
  },
  newWebsite: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: { 
        type: String,
        default: 'NEW_WEBSITE'
      },
      title: '新站点提前两天申请服务器和部署',
      type: 3,
      status: 0, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [],
      remarks: []
    }
  },
  apiDesign: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'API_DESIGN',
      title: '前端-接口需求详设',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: ['发送给后端'],
      remarks: []
    }
  },
  frontDesign: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'FRONT_DESIGN',
      title: '前端详设',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: ['详设文档编写+附加接口详设'],
      remarks: []
    }
  },
  designEmail: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'DESIGN_EMAIL',
      title: '发详设评审邮件',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [
        `
          hi，all：
          邀请大家参加CMS-  个人中心改版V1.0   -前端详细设计评审
          时间：2019-04-30  16:00-17:00 （周二）
          地点：12F 必辉
          附加：详设文档
        `
      ],
      persion: [],
      mailTo: [
        '@测试',
        '@产品',
        '@前端开发',
        '@后端开发',
        '抄送：@前端主管'
      ],
      document: 'http://192.168.99.65/svn/biyao-web/公共支撑/项目管理/',
      account: [
        'http://192.168.99.65',
        'BY_acount'
      ],
      operate: [
        '上传详设文档',
        '会议室预定',
        '发送邮件'
      ],
      explain: [
        '邮件范例',
        '附件-详设文档'
      ],
      remarks: []
    }
  },
  frontExplain: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'FRONT_EXPLAIN',
      title: '前端详设宣讲',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [
        '详设确认点记录',
        '更改详设文档'
      ],
      explain: [
        '宣讲后更改前端详设文档'
      ],
      remarks: []
    }
  },
  meetingMinute: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'MEETING_MINUTE',
      title: '发详设会议纪要',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [
        `
          Hi，all：
          问好！
          附件为本次的详细设计文档
          以下为CMS- 个人中心改版V1.0-前端详细设计评审 会议总结
      
          【会议主题】 CMS-个人中心改版V1.0-前端详细设计评审
          【会议时间】2019-04-30  16:00-17:00 （周二）
          【会议地点】12F 必辉
          【参会人员】 王倩 范桂红 曹保卫 李朋飞
          【会议内容】
                  完成 CMS-个人中心改版V1.0-前端详细设计评审                  
          【会议纪要】
                - 已确认 @开发 @测试 @曹保卫
                  1.  添加&编辑滑动图标页，显示终端下方提示文案改为：“请谨慎操作来源枚举值、业务枚举值、路由信息，调整相关信息请同步网关，否则有可能造成无法跳转”
                  2.  添加&编辑滑动图标页，提交保存成功后，跳转到滑动图标列表页
          
          如遇问题请大家及时沟通。
          谢谢！
        `
      ],
      persion: [],
      mailTo: [
        '@测试',
        '@产品',
        '@前端开发',
        '@后端开发',
        '抄送：@前端主管'
      ],
      document: null,
      account: null,
      operate: [
        '更新详设文档',
        '发送邮件'
      ],
      explain: ['会议纪要邮件范例', '附件-更新后的详设文档'],
      remarks: []
    }
  },
  backExplain: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'BACL_EXPLAIN',
      title: '后端详设宣讲',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: ['从后端会议纪要保存后端接口详设'],
      remarks: []
    }
  },
  pullBranch: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'PULL_BRANCH',
      title: '拉取新分支',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://192.168.99.65/svn/pmall/biyao-cms/branches/cms_vue/',
        'http://192.168.99.68/users/sign_in',
        'BY_account'
      ],
      operate: [
        '从主分支拉取新分支'
      ],
      explain: ['分支命名规范'],
      remarks: []
    }
  },
  devCoding: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'DEV_CODING',
      title: '开发',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [
        '认真分析逻辑',
        '提高代码质量'
      ],
      remarks: []
    }
  },
  testExplain: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'TEST_EXPLAIN',
      title: '测试用例评审',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [
        '保存测试用例'
      ],
      explain: [
        '对测试用例提出疑问',
        '根据测试用例更改开发bug'
      ],
      remarks: []
    }
  },
  testBySelf: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'TEST_BY_SELF',
      title: '自测',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [
        '仔细测试',
        '前端开发完成时自测',
        '联调完成时自测',
        '提测后时自测'
      ],
      remarks: []
    }
  },
  mailTestDoc: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'MAIL_TEST_DOC',
      title: '发送自测报告',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [
        `
          问好：
          附件为  一起拼V2.1  前端自测文档，请查收！
          如有问题，随时沟通！
      
          谢谢！
        `
      ],
      persion: [],
      mailTo: [
        '@qa?',
        '@测试',
        '@产品',
        '@前端开发',
        '@后端开发',
        '抄送：@前端主管'
      ],
      document: null,
      account: null,
      operate: [
        '上传自测文档',
        '发送邮件'
      ],
      explain: [
        '发送到对应人'
      ],
      remarks: []
    }
  },
  sendTestApiPlan: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'SEND_TEST_API_PLAN',
      title: '联调拆解计划表',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: null,
      operate: [],
      explain: [
        '企业微信发给产品经理'
      ],
      remarks: []
    }
  },
  testApiVersion: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'TEST_API_VERSION',
      title: '联调发版',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://jenkins.rd.biyao.com/',
        'dev',
        'build'
      ],
      operate: [],
      explain: [],
      remarks: []
    }
  },
  testApi: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'TEST_API',
      title: '联调',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [],
      operate: [
        '前后端及时沟通，有问题及时更改'
      ],
      explain: [],
      remarks: []
    }
  },
  testVersion: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'TEST_VERSION',
      title: '提测',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://jenkins.rd.biyao.com/',
        'dev',
        'Image'
      ],
      operate: [],
      explain: [],
      remarks: []
    }
  },
  testOrder: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'TEST_ORDER',
      title: '提测工单',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [
        `
          标题：【老客专项1.1&一起拼2.1】cms.biyao.com
          工单描述：
            发版项目名：cms系统
            项目域名：cms.biyao.com
            系统版本：V1.3.19
            发版目标：双子座
            版本号：cms.biyao.com_v1.3.19_visitorgemini_20190719110509.tar.gz
            提测内容：
              老客专项1.1&一起拼2.1  提测
          选择测试人员：~~
          选择环境：双子
          SVN版本：分支
          计划操作时间：选择当前时间
          是否修改配置文件：无
          是否关联SQL工单：无
          是否为紧急BUG修复工单： 否
        `
      ],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://mytask.biyao.com',
        'BY_account'
      ],
      operate: [
        '发给对应测试进行发版，不能自己发版'
      ],
      explain: ['工单填写范例'],
      remarks: []
    }
  },
  debug: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'DEBUG',
      title: 'bug修复',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://192.168.96.165:8080/secure/Dashboard.jspa',
        'BY_account'
      ],
      operate: [
        '查看JIRA',
        '更改JIRA状态'
      ],
      explain: [
        '查看bug归属',
        '修复bug',
        '填写bug原因处理状态和结果',
        '关闭JIRA',
        '再次提测试工单'
      ],
      remarks: []
    }
  },
  mergeMaster: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'MERGE_MASTER',
      title: '合并主干',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [],
      operate: [],
      explain: [
        '其他上线分支合并到主分支',
        '此项目分支合并到主分支'
      ],
      remarks: []
    }
  },
  testMainOrder: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'MERGE_ORDER',
      title: '提主干测试工单',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [
        `
          标题：【老客专项1.1&一起拼2.1】cms.biyao.com
          工单描述：
            发版项目名：cms系统
            项目域名：cms.biyao.com
            系统版本：V1.3.19
            发版目标：双子座
            版本号：cms.biyao.com_v1.3.19_visitorgemini_20190719110509.tar.gz
            提测内容：
              老客专项1.1&一起拼2.1  合并主干
          选择测试人员：~~
          选择环境：双子
          SVN版本：主干
          计划操作时间：选择当前时间
          是否修改配置文件：无
          是否关联SQL工单：无
          是否为紧急BUG修复工单： 否
        `
      ],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://mytask.biyao.com',
        'BY_account'
      ],
      operate: [
        '发给对应测试进行发版，不能自己发版'
      ],
      explain: [
        '其他上线分支合并到主分支',
        '此项目分支合并到主分支'
      ],
      remarks: []
    }
  },
  sendVersion: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'SEND_VERSION',
      title: 'online发版',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://jenkins.rd.biyao.com/',
        'online',
        'release_svn'
      ],
      operate: [],
      explain: [
        '找自己最后的包和测试给的最后的包对照'
      ],
      remarks: []
    }
  },
  mainVerison: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'MAIN_VERSION',
      title: '上线工单',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [
        `
          标题：【老客专项1.1&一起拼2.1】cms.biyao.com
          工单描述：
            发版项目名：cms系统
            项目域名：cms.biyao.com
            系统版本：V1.3.19
            发版目标：双子座
            版本号：cms.biyao.com_v1.3.19_visitorgemini_20190719110509.tar.gz
            提测内容：
              老客专项1.1&一起拼2.1  合并主干
          选择审批人：前端主管、技术主管
          选择测试人员：~~
          选择环境：上线环境【武清、ARK等】
          SVN版本：主干
          计划操作时间：发版排期时间，运维发版时间
          是否修改配置文件：无
          是否关联SQL工单：无
          是否为紧急BUG修复工单： 否
        `
      ],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://mytask.biyao.com',
        'BY_account'
      ],
      operate: [
        '领导审批',
        '运维发版'
      ],
      explain: [
        '工单填写范例'
      ],
      remarks: []
    }
  },
  sendToRatify: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'SEND_TO_RATIFY',
      title: '必要技术企业群发送工单审批',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [
        `
          图片
          工单ID： 00012
          709上线，一起拼V2.1上线发版工单，请领导审批
          @前端主管、@技术主管
        `
      ],
      persion: [],
      mailTo: [],
      document: null,
      account: [],
      operate: [],
      explain: [
        '发工单ID',
        '描述工单内容',
        '@相关负责人',
        '查看工单状态'
      ],
      remarks: []
    }
  },
  confirmVersionPersion: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'CONFIRM_VERSION_PERSION',
      title: '上线跟进人员',
      type: 2,
      status: 0, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [],
      operate: [],
      explain: [],
      remarks: []
    }
  },
  followSendVersion: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'FOLLOW_SEND_VERSION',
      title: '跟上线',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [],
      operate: [],
      explain: [
        '在公司，第二天不用来',
        '在家，第二天下午来'
      ],
      remarks: []
    }
  },
  confirmOrderMail: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'CONFIRM_ORDR_MAIL',
      title: '确认上线邮件',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [
        'http://mytask.biyao.com',
        'BY_account'
      ],
      operate: [
        '待处理工单进行工单最后确认'
      ],
      explain: [],
      remarks: []
    }
  },
  updateDocument: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'UPDATE_DOCUMENT',
      title: '更新文档',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: 'http://192.168.99.65/svn/biyao-web/公共支撑/项目管理/',
      account: [
        'http://192.168.99.65',
        'BY_acount'
      ],
      operate: [],
      explain: [],
      remarks: []
    }
  },
  updateConfluence: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'UPDATE_CONFLUENCE',
      title: '更新前端各分支文档',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: 'http://wiki.biyao.com/pages/viewpage.action?pageId=2589810',
      account: [
        'http://wiki.biyao.com',
        'BY_account'
      ],
      operate: [],
      explain: [],
      remarks: []
    }
  },
  report: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'REPORT',
      title: '首周运营观察报告',
      type: 2,
      status: 0, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [],
      operate: [],
      explain: [],
      remarks: []
    }
  },
  review: {
    type: Schema.Types.Mixed,
    default: {
      onlySign: 'REVIEW',
      title: '项目复盘',
      type: 1,
      status: 1, 
      startTime: null,
      endTime: null,
      example: [],
      persion: [],
      mailTo: [],
      document: null,
      account: [],
      operate: [],
      explain: ['提出问题'],
      remarks: []
    }
  }
});

export default mongoose.model('ToolFlow', ToolFlowSchema);