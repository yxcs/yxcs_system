<template>
  <div class="article__wrap">
    <Top />
    <div class="tool__wrap">
      <div class="tool__block" v-for="item in list" :key="item.id">
        <div class="tool__block--title">{{item.title}}</div>
        <div class="tool__block--item">
          <template v-for="sItem in item.sub">
            <div :key="sItem.type" :class="['item', sItem.bg]" @click="goTo(sItem.url)">{{sItem.name}}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const Top = () => import('@/components/Top')
export default {
  name: 'ToolList',
  data () {
    return {
      bgs: ['c_aac9ce', 'c_b6b4c2', 'c_c9bbc8', 'c_e5c1cd', 'c_f3dbcf', 'c_c6a477', 'c_ecd59f', 'c_d3e7ee', 'c_abd1dc', 'c_7097ab'],
      list: [
        {
          id: 'bookmark',
          title: '书签汇总',
          sub: [
            {
              bg: 'c_ecd59f',
              type: 'all',
              name: '全部',
              url: '/tool/mark/all'
           }, {
              bg: 'c_aac9ce',
              type: 'bookmark',
              name: '书签',
              url: '/tool/mark/bookmark'
           }, {
              bg: 'c_b6b4c2',
              type: 'toutiao',
              name: '头条',
              url: '/tool/mark/toutiao'
           }, {
              bg: 'c_c9bbc8',
              type: 'weixin',
              name: '公众号',
              url: '/tool/mark/weixin'
           }, {
              bg: 'c_e5c1cd',
              type: 'shequ',
              name: '社区',
              url: '/tool/mark/shequ'
           }
          ]
        }, {
          id: 'projectFlow',
          title: '项目流程管理',
          sub: [
           {
              bg: 'c_f3dbcf',
              type: 'projectFlow',
              name: '项目流程',
              url: 'http://manage.oyxco.com/tool/project'
           }
          ]
        }
      ]
    }
  },
  components: {
    Top
  },
  mounted () {
    this.setNavType('toolList')
  },
  methods: {
    ...mapMutations('global', [
      'setNavType'
    ]),
    goTo (url = '/home') {
      if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
        window.open(url, '_blank')
      } else {
        this.$router.history.push(url)
      }
    }
  }
}
</script> 
<style lang="scss" scoped>
.tool__wrap {
  width: 760px;
  padding: 20px;
  margin: 40px auto;
  border: 1px solid rgba(0,0,0,0.08);
  min-height: 400px;
}
.tool__block {
  margin-top: 40px;
}
.tool__block--title {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 20px;
}
.tool__block--item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.tool__block--item .item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 212px;
  height: 200px;
  border-radius: 6px;
  color: #fff;
  box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.1);
  margin: 20px;
  cursor: pointer;
}
.tool__block--item .item:hover {
  box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.2);
}
.tool__block--item .item.c_aac9ce {
  background-color: #aac9ce;
}
.tool__block--item .item.c_b6b4c2 {
  background-color: #b6b4c2;
}
.tool__block--item .item.c_c9bbc8 {
  background-color: #c9bbc8;
}
.tool__block--item .item.c_e5c1cd {
  background-color: #e5c1cd;
}
.tool__block--item .item.c_f3dbcf {
  background-color: #f3dbcf;
}
.tool__block--item .item.c_c6a477 {
  background-color: #c6a477;
}
.tool__block--item .item.c_ecd59f {
  background-color: #ecd59f;
}
.tool__block--item .item.c_d3e7ee {
  background-color: #d3e7ee;
}
.tool__block--item .item.c_abd1dc {
  background-color: #abd1dc;
}
.tool__block--item .item.c_7097ab {
  background-color: #7097ab;
}
</style>
