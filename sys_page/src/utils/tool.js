const menu = [
  {url: '/home', title: '首页', page: 'home'},
  {url: '/front', title: '前端', page: 'front'},
  {url: '/back', title: '后端', page: 'back'},
  {url: '/interview', title: '面试', page: 'interview'},
  {url: '/draft', title: '杂文', page: 'draft'},
  {url: '/tool', title: '工具', page: 'toolList'},
]

const formatTime = (dateTime, type = 1) => {
  const dt = new Date(dateTime);
  const y = dt.getFullYear();
  let m = dt.getMonth() + 1;
  let d = dt.getDate();
  let H = dt.getHours();
  let M = dt.getMinutes();
  let S = dt.getSeconds();
  if (m < 10) {
    m = `0${m}`;
  }
  if (d < 10) {
    d = `0${d}`;
  }
  if (H < 10) {
    H = `0${H}`;
  }
  if (M < 10) {
    M = `0${M}`;
  }
  if (S < 10) {
    S = `0${S}`;
  }
  if (type === 1) {
    return `${y}-${m}-${d} ${H}:${M}:${S}`
  } else if (type === 2) {
    return `${y}年${m}月${d}日 ${H}:${M}:${S}`
  } else if (type === 3) {
    return `${y}-${m}-${d}`
  }

  return `${y}年${m}月${d}日`
}

const blogType = {
  '1': '前端',
  '2': '后端',
  '3': '面试',
  '4': '杂文',
  '11': 'js',
  '12': 'css',
  '13': 'html',
  '14': 'react',
  '15': 'vue',
  '16': 'jquery',
  '101': '其他',
  '21': 'node',
  '22': 'express',
  '23': 'koa',
  '24': 'php',
  '25': '搭建',
  '26': '配置',
  '201': '其他',
  '31': '面经',
  '32': '问题',
  '33': '常识',
  '301': '其他',
  '41': '散文',
  '42': '连载',
  '43': '记录',
  '401': '其他'
}
const blogTypeObj = [
  {
    key: '1',
    name: '前端',
    subType: [
      {key: '11', name: 'js'},
      {key: '12', name: 'css'},
      {key: '13', name: 'html'},
      {key: '14', name: 'react'},
      {key: '15', name: 'vue'},
      {key: '16', name: 'jquery'},
      {key: '101', name: '其他'},
    ]
  }, {
    key: '2',
    name: '后端',
    subType: [
      {key: '21', name: 'node'},
      {key: '22', name: 'express'},
      {key: '23', name: 'koa'},
      {key: '24', name: 'php'},
      {key: '25', name: '搭建'},
      {key: '26', name: '配置'},
      {key: '201', name: '其他'},
    ]
  }, {
    key: '3',
    name: '面试',
    subType: [
      {key: '31', name: '面经'},
      {key: '32', name: '问题'},
      {key: '33', name: '常识'},
      {key: '301', name: '其他'},
    ]
  }, {
    key: '4',
    name: '杂文',
    subType: [
      {key: '41', name: '散文'},
      {key: '42', name: '连载'},
      {key: '43', name: '记录'},
      {key: '401', name: '其他'},
    ]
  }
]
const blogSource = {
  '1': '原创',
  '2': '转载'
}

export default {
  menu,
  formatTime,
  blogType,
  blogTypeObj,
  blogSource
}