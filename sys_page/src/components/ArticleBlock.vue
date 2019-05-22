<template>
  <div class="article__wrap">
    <template v-for="i in 10">
      <div :key="i" class="article__item">
        <div :class="['post-list-thumb', i % 2 ? 'left' : 'right']">
          <div class="post-thumb-desc">
            <p class="time"><i class="el-icon-time"></i>发布于 2017-04-09</p>
            <div class="post-title"><router-link to="/test"><h3>ASky主题（19年2月21日更新1.7）</h3></router-link></div>
            <div class="post-desc">
              <i class="el-icon-lollipop"></i> 1.4k 热度 
              <router-link to="/test"> <i class="el-icon-ice-cream"></i> 前端  </router-link>
              <router-link to="/test"> <i class="el-icon-share"></i>分享</router-link>
            </div>
            <div class="post-text">前方迷途太多 坚持就有突破 正确做事就会越来越广阔   工作里怪事真多奇葩围绕着我今天必须吐 ...</div>
            <div class="post-more"><router-link to="/test"><i class="el-icon-more"></i></router-link></div>
          </div>
          <div class="post-thumb-img">
            <router-link to="/test"><img src="http://img.skyarea.cn/wp-content/uploads/2017/04/wallpaper.jpg" alt=""></router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ArticleBlock',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .article__item {
    padding: 20px;
    background: #fff;
    margin-bottom: 40px;
    margin-top: 20px;
    border: 1px solid rgba(0,0,0,0.06);
    transition: 0.5s all;
    &:hover {
      box-shadow: 1px 1px 10px 3px rgba(0,0,0,0.1);
    }
    &:hover .post-thumb-img img {
      transform: scale(1.1);
    }
  }
  .post-list-thumb {
    &:after {
      display: block;
      clear: both;
      content: "";
      visibility: hidden;
      height: 0;
    }
    &>div {
      float: left;
    }
    .post-thumb-img {
      text-align: right;
    }
    &.left>div {
      float: left;
    }
    &.left .post-thumb-img {
      text-align: right;
    }
    &.right>div {
      float: right;
    }
    &.right .post-thumb-img {
      text-align: left;
    }
    .post-thumb-desc {
      width: 45%;
    }
    .post-thumb-img {
      width: 55%;
      a {
        display: inline-block;
        width: 90%;
        height: 100%;
        overflow: hidden;
      }
      img {
        transition: .5s all;
        width: 100%;
        height: auto;
      }
    }
    .time {
      color: #888;
      font-size: 12px;
      margin: 6px 0 0 0;
      i {
        margin-right: 6px;
      }
    }
    .post-title {
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      a {
        color: #504E4E;
      }
    }
    .post-desc {
      color: #888;
      font-size: 12px;
      a {
        color: #888;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .post-text {
      display: inline-block;
      text-align: justify;
      font-size: 14px;
      word-break: break-all;
      margin-top: 6px;
      line-height: 24px;
      color: #888;
    }
    .post-more {
      margin-top: 10px;
    }
    .post-more i {
      font-size: 24px;
    }
  }
</style>
