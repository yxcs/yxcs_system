<template>
  <div class="article__wrap">
    <div class="article__top">
      <div class="article__top--abstract">
        <div class="article__top--title">ASky主题（19年2月21日更新1.7）</div>
        <div class="article__top--line"></div>
        <div class="article__top--desc">
          <div class="avatar"><img src="../assets/logo.png" /></div>
          <div>keith<span>·</span>2017-04-09<span>·</span>120.55k 次阅读</div>
        </div>
      </div>
    </div>
    <div class="article__content">
      <div v-html="msg"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from "highlight.js"
import '../utils/markdown.css'
export default {
  name: 'ArticlesDetail',
  data () {
    return {
      msg: '#### 撒地方撒范德萨发的\n#### 撒地方撒范德萨发的\n```javascript\n \/\/ 测试 \n console.log(111)\n alert(234324);\nfor(var i=0;i<10;i++){\n  console.log(i);\n}\n```\n'
    }
  },
  mounted () {
    // this.msg = markdown.parse(this.msg)
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
      }
    );
    this.msg = marked(this.msg)
    this.msg = this.msg.replace(/<pre>/ig, '<pre class="hljs">')
    console.log(this.msg)
  },
  components: {
    // VueMarkdown
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
  .hljs {
    font-size: 14px;
  }
}
</style>
