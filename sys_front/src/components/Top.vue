<template>
  <div class="wrap">
    <div class="avatar-small">
      <router-link to="/"><img src="../assets/login.png" /></router-link>
    </div>
    <div class="menu">
      <div v-if="navShow">nav</div>
      <div @click="changeNav" :class="['show-nav', navShow ? 'show' : '']">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      <div class="icon"><i class="el-icon-search"></i></div>
      <div class="icon"><i class="el-icon-user"></i></div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Top',
  data () {
    return {
      bgUrl: 'https://raw.githubusercontent.com/yxcs/static_images/master/others/blog_banner.jpg',
      src: 'https://yxcs.github.io/img/avatar.jpg',
      nav: [
        {id: 'home', name: '首页', link: '/home'},
        {id: 'frontend', name: '前端', link: '/frontend'},
        {id: 'backend', name: '后端', link: '/backend'},
        {id: 'tool', name: '工具', link: '/tool'},
        {id: 'essay', name: '杂文', link: '/essay'},
        {id: 'timeline', name: '时间轴', link: '/timeline'}
      ],
      navShow: false
    }
  },
  methods: {
    changeNav() {
      this.navShow = !this.navShow;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    background: rgba(255,255,255,0);
    box-shadow: 0 0 1px rgba(0,0,0,.15);
  }
  .avatar-small {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    overflow: hidden;
    margin: 0 30px;
  }
  .avatar-small img {
    width: 100%;
    height: 100%;
  }
  .avatar-small img:hvoer {
    
  }
  .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 75px;
    padding-right: 30px;
  }
  .show-nav {
    position: relative;
    margin-left: 20px;
    display: block;
    width: 30px;
    height: 33px;
    cursor: pointer;
    z-index: 999;
  }
  .line1,
  .line2,
  .line3 {
    position: absolute;
    top: 7px;
    left: 50%;
    width: 26px;
    margin-left: -15px;
    height: 2px;
    background: #666;
    -webkit-transition: all .2s ease;
            transition: all .2s ease;
  }
  .line1 {
    top: 15px;
  }
  .line3 {
    top: 25px;
  }
  .show .line1 {
    top: 18px;
    -webkit-transform: rotateZ(45deg);
            transform: rotateZ(45deg);
  }
  .show .line3 {
    top: 18px;
    -webkit-transform: rotateZ(-45deg);
            transform: rotateZ(-45deg);
  }
  .show .line2 {
    display: none;
  }
  .menu .icon {
    width: 27px;
    height: 27px;
    margin-left: 20px;
  }
  .menu .icon i {
    font-size: 26px;
  }
</style>
