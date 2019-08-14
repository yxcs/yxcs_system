<template>
  <div class="article__wrap">
    <SecondTop 
      :title="detail.title"
      :avatar="user.avatar"
      :author-name="detail.authorName"
      :author-id="detail.authorId"
      :create-at="detail.createAt"
      :read-count="detail.readCount" />
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
const SecondTop = () => import('@/components/SecondTop')
export default {
  name: 'ArticlesDetail',
  data () {
    return {
      id: '',
      detail: {},
      user: {}
    }
  },
  components: {
    SecondTop
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
          this.getUserMsg(detail.authorId)
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
    },
    getUserMsg (id) {
      this.$http.login.getUserById({id}).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const user = res.data.data
          this.user = user
        }
      })
    }
  }
}
</script> 
<style lang="scss" scoped>

.article__content {
  width: 760px;
  padding: 20px;
  margin: 40px auto;
  border: 1px solid rgba(0,0,0,0.08);
  min-height: 400px;
}
</style>
