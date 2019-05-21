<template>
  <div class="article__wrap">
    <div class="article__item">
      <div class="post-list-thumb">
        <div class="post-thumb-desc">
          <p class="time"><i class="el-icon-time"></i>发布于 2017-04-09</p>
          <div class="post-title"><router-link to="/test"><h3>ASky主题（19年2月21日更新1.7）</h3></router-link></div>
          <div class="post-desc"><i class="el-icon-lollipop"></i> 1.4k 热度 <i class="el-icon-chat-line-round"></i> 条评论 <i class="el-icon-share"></i>分享</div>
          <div class="post-text">前方迷途太多 坚持就有突破 正确做事就会越来越广阔   工作里怪事真多奇葩围绕着我今天必须吐 ...</div>
          <div class="post-more"><i class="el-icon-more"></i></div>
        </div>
        <div class="post-thumb-img">
          <img src="http://img.skyarea.cn/wp-content/uploads/2017/04/wallpaper.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleBlock',
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
