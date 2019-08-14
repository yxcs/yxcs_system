<template>
  <div class="wrap">
    <Top />
    <div ref="home" class="home__wrap">
      <div class="home__list--title"><h1 class="main-title"><i class="el-icon-s-comment"></i>全部</h1></div>
      <ArticleBlock :list="list"/>
      <div class="page">
        <Pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          @current-change="getList">
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'element-ui'
const Top = () => import('@/components/Top')
const ArticleBlock = () => import('@/components/ArticleBlock')
import { mapMutations } from 'vuex'
import tool from '../utils/tool'
export default {
  name: 'Home',
  data () {
    return {
      page: {
        limit: 10,
        current: 1
      },
      total: 0,
      list: []
    }
  },
  components: {
    Top,
    ArticleBlock,
    Pagination
  },
  mounted () {
    this.setNavType('home')
    this.getList()
  },
  methods: {
    ...mapMutations('global', [
      'setNavType'
    ]),
    getList(index) {
      const params = {
        where: {},
        limit: this.page.limit,
        current: index || 1
      }
      this.page.current = 1
      this.$http.article.getArticleList(params).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          if (index) {
            this.$refs.home.scrollIntoView()
          }
          this.total = res.data.total
          this.list = res.data.data.map(item => {
            item.createAt = tool.formatTime(item.createAt, 3)
            item.typeTxt = tool.blogType[''+item.type]
            return item
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .page {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
  }
</style>
