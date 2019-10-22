<template>
  <div class="mark__wrap">
    <div class="mark__type">
      <el-radio-group v-model="type" size="small" @change="menuChange">
        <template v-for="item in menus">
          <el-radio-button :key="item.type" :label="item.type">{{item.name}}</el-radio-button>
        </template>
      </el-radio-group>
    </div>
    <div class="mark__content">
      <template v-for="item in list">
        <div :key="item._id" class="mark__content--item" @click="goto(item.linkTo)">
          <div class="img"><img alt="封面图片" :src="item.coverImg" /></div>
          <div class="desc">
            <div class="title">{{item.title}}</div>
            <div class="source">{{item.source}}</div>
            <div class="type"><el-tag size="small">{{item.sourceType | sourceTxt}}</el-tag> <el-tag size="small" type="info">{{item.type | typeTxt}}</el-tag></div>
          </div>
        </div>
      </template>
    </div>
    <div class="page">
        <Pagination
          background
          layout="prev, pager, next"
          :total="pager.total"
          :page-size="pager.limit"
          @current-change="getListByPage">
        </Pagination>
      </div>
  </div>
</template>

<script>
import { RadioGroup, RadioButton, Pagination, Tag } from 'element-ui'
const sourceTxt = {
  bookmark: '书签',
  toutiao: '头条',
  weixin: '公众号',
  shequ: '社区'
}
const typeTxt = {
  1: '面试',
  2: '资源',
  3: '小程序',
  4: '微信',
  5: '移动端',
  6: 'github',
  7: '服务器',
  8: '文档',
  9: '学习',
  10: '掘金',
  11: 'cnodejs',
  12: '其他'
}
export default {
  name: 'ToolMark',
  data () {
    return {
      menus: [
        {
          type: 'all',
          name: '全部'
        }, {
          type: 'bookmark',
          name: '书签'
        }, {
          type: 'toutiao',
          name: '头条'
        }, {
          type: 'weixin',
          name: '公众号'
        }, {
          type: 'shequ',
          name: '社区'
        }
      ],
      type: '',
      list: [],
      pager: {
        limit: 100,
        current: 1,
        total: 0
      }
    }
  },
  components: {
    'el-radio-group': RadioGroup,
    'el-radio-button': RadioButton,
    Pagination,
    'el-tag': Tag
  },
  mounted () {
    const type = this.$route.params.type || ''
    if (type) {
      this.type = type
      this.getList(type)
    }
  },
  methods: {
    menuChange (e) {
      this.$router.history.push(`/tool/mark/${e}`)
      this.getList(e)
    },
    getList (type) {
      const params = {
        where: {},
        limit: this.pager.limit,
        current: this.pager.current
      }
      if (type !== 'all') {
        params.where = {sourceType: type}
      }
      this.$http.tool.getBookmarkList(params).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          this.list = res.data.data
          this.pager.total = res.data.total
        }
      })
    },
    getListByPage (index = 1) {
      this.pager.current = index
      this.$nextTick(() => {
        this.getList(this.type)
      })
    },
    goto (url) {
      window.open(url)
    }
  },
  filters: {
    sourceTxt (v) {
      return sourceTxt[v]
    },
    typeTxt (v) {
      return typeTxt[v]
    }
  }
}
</script> 
<style lang="scss" scoped>
.mark__wrap {
  min-width: 800px; 
}
.mark__type {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}
.mark__content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px;
}
.mark__content--item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 360px;
  height: 120px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.1);
  margin: 10px;
  cursor: pointer;
}
.mark__content--item:hover {
  box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.2);
}
.mark__content--item img {
  width: 120px;
  height: 80px;
}
.mark__content--item .desc {
  width: 200px;
  box-sizing: border-box;
  padding-left: 10px;
}
.mark__content--item .title {
  width: 190px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.mark__content--item .source {
  font-size: 12px;
  padding: 6px 0;
}
.mark__content--item .type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.page {
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}
</style>
