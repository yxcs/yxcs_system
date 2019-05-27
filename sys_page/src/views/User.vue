<template>
  <div class="user__wrap">
    <Top />
    <div class="user__info">
      <div class="user__info--msg">
        <img :src="user.avatar" />
        <div class="user__info--desc">
          <p class="user-name">{{user.username}}</p>
          <p v-if="user.slogan" class="user-slogan">{{user.slogan}}</p>
        </div>
      </div>
      <div v-if="user.notice" class="user__info--notice">
        <div class="notice">
          <p class="notice-desc">{{user.notice}}</p>
          <p class="notice-time"><i class="el-icon-time"></i>发布于 {{user.noticeAt}}</p>
        </div>
        <img :src="user.avatar" />
      </div>
    </div>
    <div class="user__works">
      <template v-for="item in list">
        <div :key="item._id" class="user__works--item">
          <div class="line"><hr /></div>
          <div class="user__works--msg">
            <router-link :to="`/article/${item._id}`"><img :src="item.coverImg" alt=""></router-link>
            <div>
              <p class="title"><router-link :to="`/article/${item._id}`">{{item.title}}</router-link> <span><i class="el-icon-time"></i>发布于 {{item.createAt}}</span></p>
              <p class="desc">{{item.abstract}}</p>
            </div>
          </div>
          <div class="more"><router-link :to="`/article/${111}`"><i class="el-icon-more"></i></router-link></div>
        </div>
      </template>
    </div>
    <div v-if="total > list.length" class="pagination" @click="nexPage()">下一页</div>
  </div>
</template>

<script>
const Top = () => import('@/components/Top')
import { mapMutations } from 'vuex'
import tool from '../utils/tool'
export default {
  name: 'User',
  data () {
    return {
      id: '',
      user: {},
      page: {
        limit: 10,
        current: 1
      },
      total: 0,
      list: []
    }
  },
  components: {
    Top
  },
  mounted () {
    this.setNavType('')
    this.id = this.$route.params.id
    this.getUerMsg(this.id)
  },
  methods: {
    ...mapMutations('global', [
      'setNavType'
    ]),
    getUerMsg (id) {
      this.$http.login.getUserById({id}).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const user = res.data.data
          user.noticeAt = user.noticeAt && tool.formatTime(user.noticeAt, 3)
          this.user = user
          this.getList()
        }
      })
    },
    getList(page) {
      const params = {
        where: {
          authorId: this.id
        },
        limit: this.page.limit,
        current: page || this.page.current
      }
      this.page.current = 1
      this.$http.article.getArticleList(params).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          this.total = res.data.total
          const list = res.data.data.map(item => {
            item.createAt = tool.formatTime(item.createAt, 3)
            item.typeTxt = tool.blogType[''+item.type]
            return item
          })
          this.list = this.list.concat(list)
        }
      })
    },
    nexPage() {
      this.page.current += 1;
      this.getList(this.page.current)
    }
  }
}
</script>
<style lang="scss" scoped>
  .user__info {
    width: 760px;
    padding: 40px 20px;
    margin: 0 auto;

    .user__info--msg {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 66px;
      padding-bottom: 40px;
      border-bottom: 1px solid #eee;
      img {
        width: 66px;
        height: 66px;
        border-radius: 33px;
      }
      
      .user__info--desc {
        padding-left: 20px;
        p {
          padding: 0;
          margin: 0;
        }
        .user-name {
          font-weight: bold;
          font-size: 20px;
          line-height: 1.2;
          margin-bottom: 5px;
        }
        .user-slogan {
          font-size: 15px;
          color: rgba(0,0,0,.66);
        }
      }
    }

    .user__info--notice {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 50px;
      .notice {
        width: 600px;
        min-height: 60px;
        margin-right: 30px;
        padding: 15px 30px;
        line-height: 30px;
        border: 1px dashed #E0E0E0;
        background: #FBFBFB;
        letter-spacing: 1px;
        .notice-desc {
          font-size: 16px;
          color: rgba(0,0,0,.6);
        }
        .notice-time {
          text-align: right;
          font-size: 12px;
          color: #989898;
          vertical-align: middle;
          i {
            margin-right: 10px;
            font-size: 20px;
          }
        }
      }
      img {
        width: 64px;
        height: 64px;
        border-radius: 32px;
      }
    }
  }

  .user__works {
    width: 800px;
    margin: 0 auto;
    padding-top: 50px;
    a:hover {
      opacity: 0.8;
    }
    .user__works--item {
      margin-top: 10px;
    }
    .line {
      width: 240px;
      overflow: hidden;
      margin: 0 auto 40px;
      hr {
        background: #EFEFEF;
      }
    }
    .user__works--msg {
      height: 100px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        margin: 0;
        padding: 0;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin-right: 20px;
      }

      .title {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
        a {
          display: inline-block;
          width: 510px;
          overflow: hidden;
        }
        span {
          float: right;
          font-size: 12px;
          color: #989898;
          letter-spacing: 0;
        }
        i {
          margin-right: 8px;
        }
      }

      .desc {
        line-height: 30px;
        font-size: 15px;
        font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
        color: rgba(0,0,0,.66);
        letter-spacing: 0;
      }
    }
    .more {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      padding-bottom: 30px;
      i {
        font-size: 26px;
      }
    }
  }

  .pagination {
    width: 118px;
    padding: 13px 35px;
    border: 1px solid #D6D6D6;
    border-radius: 50px;
    color: #ADADAD;
    text-align: center;
    margin: 40px auto;
    cursor: pointer;
    transition: .5s all;

    &:hover {
      color: #409EFF;
      border-color: #409EFF;
    }
  }
</style>
