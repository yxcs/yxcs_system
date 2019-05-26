<template>
  <div class="user__wrap">
    <Top />
    <div class="user__info">
      <div class="user__info--msg">
        <img src="../assets/avatar.png" />
        <div class="user__info--desc">
          <p class="user-name">Kitty Cat</p>
          <p class="user-slogan">真正的英雄主义，是认清生活的真相后还依然热爱它</p>
        </div>
      </div>
      <div class="user__info--notice">
        <div class="notice">
          <p class="notice-desc">真正的英雄主义，是认清生活的真相后还依然热爱它</p>
          <p class="notice-time"><i class="el-icon-time"></i>发布于 2019-08-09</p>
        </div>
        <img src="../assets/avatar.png" />
      </div>
    </div>
    <div class="user__works">
      <template v-for="i in 10">
        <div :key="i" class="user__works--item">
          <div class="line"><hr /></div>
          <div class="user__works--msg">
            <router-link :to="`/article/${111}`"><img src="../assets/avatar.png" alt=""></router-link>
            <div>
              <p class="title"><router-link to="/article/00">ASky 1.8修改记录</router-link> <span><i class="el-icon-time"></i>发布于 2019-03-03</span></p>
              <p class="desc">1.7更新得比较草率，1.8还是做下记录…… 增加文章目录——主功能从小猫博客取得，优化正则格式，调整前端表达优化数据统计——但还是无法分辩出真访客和机器人...</p>
            </div>
          </div>
          <div class="more"><router-link :to="`/article/${111}`"><i class="el-icon-more"></i></router-link></div>
        </div>
      </template>
    </div>
    <div class="pagination">下一页</div>
  </div>
</template>

<script>
const Top = () => import('@/components/Top')
import { mapMutations } from 'vuex'
export default {
  name: 'User',
  components: {
    Top
  },
  mounted () {
    this.setNavType('user')
  },
  methods: {
    ...mapMutations('global', [
      'setNavType'
    ]),
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
