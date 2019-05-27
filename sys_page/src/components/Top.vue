<template>
  <div class="top__wrap">
    <div class="top__user">
      <div class="top__user--avatar">
        <router-link to="/test"><img src="../assets/avatar.png" /></router-link>
      </div>
      <div class="top__user--solgan">
        抓不住的逝水流年，留不住的曾经少年
      </div>
    </div>
    <div class="top__nav">
      <div class="top__nav--inner">
        <template v-for="item in menu">
          <div 
            :key="item.page" 
            :class="['nav-item', item.page === getNavType ? 'active': '']">
            <router-link :to="item.url">{{item.title}}</router-link>
          </div>
        </template>
      </div>
      <div :class="['top__nav--user', getNavType === 'user' ? 'active': '']">
        <router-link class="lh60" v-if="isLogin" to="/user"><i class="el-icon-user"></i></router-link>
        <router-link class="lh50" v-else :to="`/login?redirect=${redirect}`"><span>登录</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import tool from '@/utils/tool'
import { mapGetters } from 'vuex'
export default {
  name: 'Top',
  data () {
    return {
      isLogin: false,
      redirect: '/home',
      menu: []
    }
  },
  mounted () {
    this.menu = tool.menu
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    this.isLogin = token && userId
    this.redirect = encodeURIComponent(this.$route.fullPath)
  },
  computed: {
    ...mapGetters('global', [
      'getNavType'
    ]),
  }
}
</script>
<style lang="scss" scoped>
  .top__wrap {
    position: relative;
    height: 360px;
    margin-bottom: 20px;
    .top__user {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300px;
      background-image: url('../assets/bg_img.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;

      .top__user--avatar {
        width: 100px;
        height: 100px;
        border: 2px solid #fff;
        border-radius: 100%;
        overflow: hidden;
        transition: .6s all ease-in-out;
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          transform: rotate(360deg);
        }
      }

      .top__user--solgan {
        margin-top: 20px;
        color: rgba(255,255,255,0.8);
        font-size: 18px;
      }
    }

    .top__nav {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      background: #fff;
      box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.1);

      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        transition: .5s all;
      }
      a:hover {
        background: #91BFEF;
        color: #fff;
      }
      .active a {
        background: #409EFF;
        color: #fff;
      }
      .top__nav--inner {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 720px;
        font-size: 14px;
        .nav-item {
          width: 80px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
      }
      .top__nav--user {
        width: 80px;
        height: 60px;
        text-align: center;
        font-size: 22px;
        a.lh50 {
          line-height: 50px;
        }
         a.lh60 {
          line-height: 60px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
</style>
