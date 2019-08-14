<template>
  <div class="article__wrap">
    <template v-for="(item, index) in list">
      <div :key="item._id" class="article__item">
        <div :class="['post-list-thumb', index % 2 ? 'right' : 'left']">
          <div class="post-thumb-desc">
            <p class="time"><i class="el-icon-time"></i>发布于 {{item.createAt}}</p>
            <div class="post-title"><router-link :to="`/article/${item._id}`"><h3>{{item.title}}</h3></router-link></div>
            <div class="post-desc">
              <i class="el-icon-lollipop"></i> {{item.readCount}} 热度 
              <router-link :to="`/article/${item._id}`"> <i class="el-icon-ice-cream"></i> {{item.typeTxt}}  </router-link>
              <router-link :to="`/article/${item._id}`"> <i class="el-icon-share"></i>分享</router-link>
            </div>
            <div class="post-text">{{item.abstract}}</div>
            <div class="post-more"><router-link :to="`/article/${item._id}`"><i class="el-icon-more"></i></router-link></div>
          </div>
          <div class="post-thumb-img">
            <router-link :to="`/article/${item._id}`"><img :src="item.coverImg" alt=""></router-link>
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
        max-height: 260px;
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
