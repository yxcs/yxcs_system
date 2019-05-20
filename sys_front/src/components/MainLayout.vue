<template>
  <div id="wrap" class="wrap" ref="scroll">
   <div id="full__bg">
      <div 
        @mouseover="mouseOverHeader"
        :class="['fixed__header', isHeaderShow?'':'opacity']"
        :style="{'top': headerTop}">
        <div class="fixed__header--avatar">
          <img src="../assets/login.png" alt="用户头像">
        </div>
        <div class="fixed__header--group">
          <div v-if="isShowNav" class="fixed__header--nav">
            <template v-for="item in navs">
              <div :key="item.url">
                <router-link :to="item.url">{{item.txt}}</router-link>
              </div>
            </template>
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
      <router-view></router-view>
      <Bottom />
   </div>
   <div v-if="isShowGoTop" class="back-top" @click="goBackTop"></div>
  </div>
</template>

<script>
import Top from './Top'
import Bottom from './Bottom'
import tool from '../utils/tool'
export default {
  name: 'MainLayout',
  data () {
    return {
      isShowNav: false,
      isHeaderShow: false,
      isShowQrcode: false,
      isLoading: false,
      bgHeight: '80px',
      qrcodeStyle: {
        opacity: 1,
        display: 'block'
      },
      scrollY: 0,
      headerTop: '0px',
      isShowGoTop: false,
      navs: tool.navs
    }
  },
  mounted () {
    this.bgHeight = document.body.clientHeight + 'px'
    this.$nextTick(_ => {
      this._initScroll()
    })
  },
  components: {
    Bottom
  },
  methods: {
    showNav () {
      this.isShowNav = !this.isShowNav
    },
    _initScroll () {
      const wrap = document.getElementById('wrap')
      if (!wrap) return false
      wrap.removeEventListener('scroll', _ => {})
      wrap.addEventListener('scroll', e => {
        const top = e.target.scrollTop
        if (top < 80) {
          this.isHeaderShow = false
          this.isShowNav = false
        } else if (top >= 80) {
          this.headerTop = '-80px'
        }
        if (this.scrollY > top) {
          this.isHeaderShow = true
          this.headerTop = '0px'
        } else {
          this.isHeaderShow = false
          this.isShowNav = false
          this.headerTop = '-80px'
        }

        if (top > parseInt(this.bgHeight, 10)) {
          this.isShowGoTop = true
        } else {
          this.isShowGoTop = false
        }

        // if (wrap.scrollHeight <= wrap.clientHeight + wrap.scrollTop + 40) {
        //   console.log('加载更多')
        // }

        this.scrollY = top
      })
    },
    mouseOverHeader () {
      this.isHeaderShow = true
    },
    mouseLeaveHeader () {
      this.isHeaderShow = false
      this.isShowNav = false
    },
    goBackTop () {
      document.getElementById('full__bg').scrollIntoView()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes main {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.wrap {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
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

.full__bg {
  position: relative;
  z-index: 88;
  background: url("../assets/b761af3c3e1ec310aa56021bb93d110f.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  transition: all ease 1s;
}
.full__bg::before {
  content: " ";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("../assets/grid.png");
}
.full__bg--content {
  position: absolute;
  top: 49%;
  left: 50%;
  width: 800px;
  text-align: center;
  transform: translate(-50%, -50%);
}
.full__bg--content .full__bg--avatar {
  height: 130px;
}
.full__bg--avatar img {
  width: 120px;
  height: 120px;
  padding: 5px;
  border-radius: 50%;
  box-shadow: inset 0 0 10px #000;
  -webkit-transition: all ease 1s;
  transition: all ease 1s;
}
.full__bg--avatar img:hover {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
.full__bg--info {
  width: 60%;
  margin: auto;
  font-size: 14px;
  color: #eaeadf;
  background: rgba(0, 0, 0, 0.5);
  padding: 15px 25px;
  margin-top: 22px;
  font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei",
    SimSun, sans-serif;
  letter-spacing: 0;
  line-height: 30px;
  border-radius: 50px;
}
.full__bg--icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.full__bg--icon a > div {
  margin: 0 10px;
  background: url("../assets/social_icon.png") no-repeat;
  height: 18px;
  width: 18px;
  padding: 7px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 100%;
}
.full__bg--icon .weixin {
  position: relative;
  background-position: center -485px;
}
.full__bg--icon .qrcode {
  position: absolute;
  top: 40px;
  left: -70px;
  width: 160px;
  height: 160px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  display: none;
  z-index: 90;
  position: absolute;
  border-radius: 8px;
  transition: 0.7s all ease;
}
.full__bg--icon .qrcode img {
  width: 150px;
  height: 150px;
  padding: 5px;
  margin: 0 0 0 0;
  background: none;
  border-radius: 10%;
  border-width: medium;
  box-shadow: 0 0 10px #fff;
}
.full__bg--icon .qq {
  background-position: center -5px;
}
.full__bg--icon .github {
  background-position: center -125px;
}

.content__wrap {
  width: 780px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
}
.content__notice {
  padding: 20px;
  border: 1px dashed #e6e6e6;
  font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei",
    SimSun, sans-serif;
  color: #969696;
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: 15px;
  line-height: 1.5;
  margin-top: 30px;
  background: #fbfbfb;
}
.content__gallery--title,
.content__list--title {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ececec;
}
.content__gallery--title i {
  font-size: 18px;
}
.content__gallery--img {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content__gallery--img > div {
  position: relative;
  width: 32%;
  height: 160px;
  background: url("../assets/img-holder.png") no-repeat;
  background-position: center center;
}
.content__gallery--img > div img {
  width: 100%;
  height: 100%;
}
.content__gallery--img .gallery__animation {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0081cc;
  opacity: 0;
  transition: 0.7s all ease;
}
.content__gallery--img .title {
  background-color: #3f3f3f;
  font-weight: bold;
  color: white;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px;
  margin-top: -10px;
  opacity: 0;
  transition: 0.7s all ease;
  -webkit-transition: 0.7s all ease;
  -moz-transition: 0.7s all linear;
  -o-transition: 0.7s all ease;
  -ms-transition: 0.7s all ease;
  visibility: hidden;
}
.content__gallery--img > div:hover .gallery__animation {
  opacity: 0.4;
}
.content__gallery--img > div:hover .title {
  visibility: visible;
  opacity: 0.8;
  margin-top: 0;
}
.content__list::after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.content__list--item {
  float: left;
  width: 100%;
  height: auto;
  position: relative;
  margin: 20px 0 60px;
  padding: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  background-color: #ffffff;
  box-sizing: border-box;
  transition: all ease .6s;
}
.content__list--item.t1 .content__list--info {
  float: left;
  padding-right: 30px;
}
.content__list--item.t1 .content__list--img {
  float: left;
  text-align: right;
}
.content__list--item.t2 .content__list--info {
  float: right;
  text-align: right;
   padding-left: 30px;
}
.content__list--item.t2 .content__list--img {
  float: right;
}
.content__list--info {
  width: 45%;
  box-sizing: border-box;
}
.content__list--img {
  width: 55%;
  box-sizing: border-box;
}
.content__list--img a {
  display: inline-block;
  width: 384px;
  height: 260px;
  overflow: hidden;
}
.content__list--img img {
  width: 384px;
  height: 260px;
  animation: main 1s;
  transition: all ease-in-out 1s;
}
.content__list--item a:hover {
  color: #0081cc;
}
.content__list--item .time {
  color: #888;
  font-size: 12px;
}
.content__list--item .title {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.content__list--item .info {
  color: #888;
  font-size: 12px;
  margin-bottom: 20px;
}
.content__list--item .desc {
  display: inline-block;
  text-align: justify;
  font-size: 14px;
  word-break: break-all;
}
.content__list--item .desc p {
  line-height: 26px;
  margin-bottom: 1.5em;
}
.content__list--item .more {
  font-size: 30px;
}
.content__list--item:hover {
  box-shadow: 0px 1px 6px #ccc,
              0px -1px 5px #ccc,
              1px 0px 5px #ccc,
              -1px 0px 5px #ccc;
}
.content__list--item:hover .content__list--img img {
  transform: scale(1.1, 1.1);
}

.back-top {
  position: fixed;
  right: 1%;
  bottom: 6%;
  z-index: 999;
  width: 60px;
  height: 60px;
  background: url('../assets/gotop.png') no-repeat center;
  background-size: contain;
  opacity: .85;
}
.back-top:hover {
  opacity: 1;
}
</style>
