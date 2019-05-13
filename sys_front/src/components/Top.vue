<template>
  <div @mouseover="mouseOverHeader"
    :class="['fixed__header', isHeaderShow?'':'opacity']"
    :style="{'top': headerTop}">
    <div class="fixed__header--avatar">
      <img src="../assets/login.png" alt="用户头像">
    </div>
    <div class="fixed__header--group">
      <div v-if="isShowNav" class="fixed__header--nav">
        <div>
          <router-link to="/">首页</router-link>
        </div>
        <div>
          <router-link to="/">前端</router-link>
        </div>
        <div>
          <router-link to="/">后端</router-link>
        </div>
        <div>
          <router-link to="/">工具</router-link>
        </div>
        <div>
          <router-link to="/">杂文</router-link>
        </div>
      </div>
      <div @click="showNav" :class="['fixed__header--menu', isShowNav ? 'close' : '']">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      <div class="fixed__header--user">
        <i class="el-icon-user"></i>
      </div>
    </div>
  </div>
</template>

<script>
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
    changeNav () {
      this.navShow = !this.navShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
.fixed__header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 80px;
  background-color: rgba(255, 255, 255, 1);
  transition: all ease 1s;
  /* -webkit-box-shadow: 0px 1px 5px 2px #ccc;
     -moz-box-shadow: 0px 1px 5px 2px #ccc;
         box-shadow: 0px 1px 5px 2px #ccc; */
}
.fixed__header.opacity {
  background-color: rgba(255, 255, 255, 0);
}
.fixed__header--avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
  margin: 0 40px;
}
.fixed__header--avatar img {
  width: 100%;
  height: 100%;
}
.fixed__header--group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 40px;
}
.fixed__header--user {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.fixed__header--group i {
  font-size: 30px;
  margin-top: 10px;
}
.fixed__header--menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 26px;
  margin-left: 30px;
}
.fixed__header--menu > div {
  width: 30px;
  height: 2px;
  background: #666;
}
.fixed__header--menu.close .line1 {
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  transform: rotateZ(45deg) translate(6px, 10px);
}
.fixed__header--menu.close .line2 {
  visibility: hidden;
}
.fixed__header--menu.close .line3 {
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  transform: rotateZ(-45deg) translate(6px, -10px);
}
.fixed__header--nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.fixed__header--nav > div {
  height: 50px;
  line-height: 50px;
}
.fixed__header--nav a {
  display: inline-block;
  height: 100%;
  padding: 0 20px;
  font-size: 14px;
  transition: color 0.2s ease-out, border 0.2s ease-out, opacity 0.2s ease-out;
}
.fixed__header--nav a:hover {
  color: royalblue;
}
</style>
