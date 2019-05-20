<template>
  <div class="wrap">
    <div class="article__header">
      <div class="article__header--title">{{detail.title}}</div>
      <div class="article__header--info">
        <img src="../assets/login.png" alt="">
        <span>{{detail.authorName}}</span> ·
        <span>{{detail.createAt}}</span> ·
        <span>{{detail.readCount}} 次阅读</span>
      </div>
    </div>
    <div class="article__content">
      <mavon-editor v-html="detail.content" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="false" :boxShadow="false" @change="changeData" />
    </div>
    <div class="article_tags">
      <p>
        <i class="el-icon-price-tag"></i>
        <router-link :to="`source/${detail.source}`">{{detail.sourceTxt}}</router-link>
        <router-link :to="`source/${detail.type}`">{{detail.typeTxt}}</router-link>
        <template v-for="item in detail.tags">
          <router-link :key="item.key" :to="`tags/${item.key}`">{{item.value}}</router-link>
        </template>
      </p>
    </div>
    <div v-if="false" class="article__page">
      <div>
        <img src="http://img.skyarea.cn/wp-content/uploads/2018/06/Xing_Kong.jpg" />
        <div @click="goPre" class="page left">
          <div class="desc">Previous Post</div>
          <div class="title">一个伪iPhone8宣传PPT</div>
        </div>
      </div>
      <div>
        <img src="http://img.skyarea.cn/wp-content/uploads/2018/07/7adcd8bf27e3a2c4bd96aaf33f2ad0d6.jpg" alt="">
        <div @click="goNext" class="page right">
          <div class="desc">Next Post</div>
          <div class="title">参观春春新居</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { markdown } from 'markdown'
import http from '../services/article'
import tool from '../utils/tool'
export default {
  name: 'Article',
  data() {
    return {
      defaultData: "preview",
      detail: {}
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    changeData(value, render) {
      console.log(value, render)
    },
    getDetail () {
      const id = this.$route.params.id || null
      http.getArticleDetails({id}).then(res => {
        const detail = res.data.data
        detail.content = markdown.toHTML(detail.content)
        detail.createAt = tool.formatTime(detail.createAt, 3)
        detail.sourceTxt = tool.blogSource[''+detail.source]
        detail.typeTxt = tool.blogType[''+detail.type]
        detail.tags = detail.subType.map(item => {
          return {
            key: item,
            value: tool.blogType[''+item]
          }
        })
        this.detail = detail
      })
    },
    goPre () {

    },
    goNext () {

    }
  }
}
</script>

<style scoped>
  .article__header {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-image: url('http://img.skyarea.cn/wp-content/uploads/2018/07/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-origin: border-box;
  }
  .article__header--title {
    width: 780px;
    font-size: 32px;
    color: #fff;
    font-weight: bold;
    border-bottom: 1px solid #fff;
  }
  .article__header--info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 780px;
    padding: 20px 0;
    color: #fff;
    font-size: 14px;
  }
  .article__header--info img {
    width: 35px;
    height: 35px;
    margin-right: 15px;
  }
  .article__header--info span {
    padding: 0 5px;
  }

  .article__content {
    width: 800px;
    margin: 40px auto 0;
  }

  .article_tags {
    width: 800px;
    padding: 10px 0;
    border-bottom: 1px dashed #ddd;
    border-top: 1px dashed #ddd;
    margin: 30px auto;
    height: 42px;
  }
  .article_tags p {
    line-height: 42px;
  }
  .article_tags a {
    font-size: 13px;
    color: #B3B3B3;
    margin-right: 5px;
  }
  .article__page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 780px;
    padding: 20px 10px;
    margin: 40px auto;
    cursor: pointer;
  }
  .article__page > div {
    position: relative;
    width: 50%;
    height: 150px;
    overflow: hidden;
  }
  .article__page > div img {
    width: 100%;
    height: 100%;
    transition: all ease 1s;
  }
  .article__page > div:hover img {
    transform: scale(1.1, 1.1);
  }
  .article__page .page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .article__page .page.left {
    text-align: left;
  }
  .article__page .page.left .desc {
    margin-top: 20px;
    margin-left: 30px;
  }
  .article__page .page.left .title {
    margin-top: 10px;
    margin-left: 30px;
    color: #fff;
  }
  .article__page .page.right {
    text-align: right;
  }
  .article__page .page.right .desc {
    margin-top: 20px;
    margin-right: 30px;
  }
  .article__page .page.right .title {
    margin-top: 10px;
    margin-right: 30px;
    color: #fff;
  }
</style>
