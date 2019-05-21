<template>
  <div class="home__wrap">
    <div class="home__lsit--title"><h1 class="main-title"><i class="el-icon-chat-dot-square"></i>Posts</h1></div>
    <ArticleBlock />
  </div>
</template>

<script>
import ArticleBlock from '@/components/ArticleBlock'
export default {
  name: 'Home',
  components: {
    ArticleBlock
  }
}
</script>
<style lang="scss" scoped>
  .home__wrap {
    position: relative;
    min-height: 400px;
    width: 1100px;
    margin: 0 auto;
    background: #fff;
    .home__lsit--title {
      padding: 10px 20px;
      color: #666;
      font-weight: 400;
      border-bottom: 1px dashed #ececec;
      h1 {
        font-size: 16px;
      }
      i {
        font-size: 20px;
      }
    }
  }
</style>
