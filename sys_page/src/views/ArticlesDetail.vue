<template>
  <div class="article__wrap">
    <div class="article__top">
      <div class="article__top--abstract">
        <div class="article__top--title">{{detail.title}}</div>
        <div class="article__top--line"></div>
        <div class="article__top--desc">
          <div class="avatar"><img src="../assets/logo.png" /></div>
          <div>{{detail.authorName}}<span>·</span>{{detail.createAt}}<span>·</span>{{detail.readCount}} 次阅读</div>
        </div>
      </div>
    </div>
    <div class="article__content vhtml">
      <div v-html="detail.content"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from "highlight.js"
import '../utils/markdown.css'
import tool from '../utils/tool'
export default {
  name: 'ArticlesDetail',
  data () {
    return {
      id: '',
      detail: {}
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if (!this.id) {
      this.$router.history.push('/test')
    }
    this.getDetail(this.id)
  },
  methods: {
    getDetail(id) {
      this.$http.article.getArticleDetails({id}).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const detail = res.data.data
          marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function(code) {
              return hljs.highlightAuto(code).value;
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
          })
          detail.content = marked(detail.content)
          detail.content = detail.content.replace(/<pre>/ig, '<pre class="hljs">')
          detail.createAt = tool.formatTime(detail.createAt, 3)
          this.detail = detail
        }
      })
    }
  }
}
</script> 
<style lang="scss" scoped>
@keyframes lineWidth {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.article__top {
  height: 300px;
  background-image: url('../assets/bg_img.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .article__top--abstract {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    width: 800px;
    margin: 0 auto;
    .article__top--title {
      font-size: 32px;
      margin: 0;
      color: #FFFFFF;
      font-weight: 500;
      width: 80%;
      padding: 0;
      border: 0;
    }
    .article__top--line {
      width: 100%;
      height: 1px;
      overflow: hidden;
      font-size: 0;
      background: #fff;
      margin: 10px 0;
      animation: lineWidth 2.5s;
      animation-fill-mode: forwards;
    }
    .article__top--desc {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #fff;
      font-size: 13px;
      padding-bottom: 20px;
      span {
        padding: 0 10px;
      }
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.article__content {
  width: 760px;
  padding: 20px;
  margin: 40px auto;
  border: 1px solid rgba(0,0,0,0.08);
  min-height: 400px;
}
</style>
