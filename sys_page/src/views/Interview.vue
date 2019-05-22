<template>
  <div class="interview__wrap">
    <div class="interview__list--title"><h1 class="main-title"><i class="el-icon-s-comment"></i>面试</h1></div>
    <ArticleBlock :list="[]"/>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
        :page-size="10"
        @current-change="onPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleBlock from '@/components/ArticleBlock'
export default {
  name: 'Interview',
  components: {
    ArticleBlock
  },
  methods: {
    onPageChange (e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
  .interview__wrap {
    position: relative;
    min-height: 400px;
    width: 800px;
    margin: 0 auto;
    .interview__list--title {
      padding: 10px 20px;
      color: #666;
      font-weight: 400;
      border-bottom: 1px dashed #ececec;
      background: #fff;
      h1 {
        font-size: 16px;
      }
      i {
        font-size: 18px;
        margin-right: 6px;
      }
    }
  }
  .page {
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
  }
</style>
