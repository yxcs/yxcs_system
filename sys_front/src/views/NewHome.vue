<template>
  <div>
    <div id="full__bg" class="full__bg" :style="{'height': bgHeight}">
      <div class="full__bg--content">
        <div class="full__bg--avatar">
          <router-link to="/">
            <img src="../assets/login.png">
          </router-link>
        </div>
        <div class="full__bg--info">真正的英雄主义，是认清生活的真相后还依然热爱它。</div>
        <div class="full__bg--icon">
          <a href="#">
            <div @mouseover="isShowQrcode = true" @mouseout="isShowQrcode = false" class="weixin">
              <div class="qrcode" :style="isShowQrcode ? qrcodeStyle : ''">
                <img src="http://img.skyarea.cn/wp-content/uploads/2018/07/weixin-1.jpg">
              </div>
            </div>
          </a>
          <a href="#">
            <div class="qq"></div>
          </a>
          <a href="#">
            <div class="github"></div>
          </a>
        </div>
      </div>
    </div>
    <div class="content__wrap">
      <div class="content__notice">
        <i class="el-icon-message-solid"></i>更新到1.6，接下来进入慢更新节奏。最后还是poiplayer好看.....
      </div>
      <div class="content__gallery">
        <div class="content__gallery--title">
          <i class="el-icon-chat-dot-square"></i>聚焦
        </div>
        <div class="content__gallery--img">
          <div>
            <img src="http://img.skyarea.cn/wp-content/uploads/2018/09/Dong_Jiang_Hu_-_Wu_77.jpg">
            <div class="gallery__animation">
              <div class="title">江东一日游</div>
            </div>
          </div>
          <div>
            <img src="http://img.skyarea.cn/wp-content/uploads/2018/09/Dong_Jiang_Hu_-_Wu_77.jpg">
            <div class="gallery__animation">
              <div class="title">江东一日游</div>
            </div>
          </div>
          <div>
            <img src="http://img.skyarea.cn/wp-content/uploads/2018/09/Dong_Jiang_Hu_-_Wu_77.jpg">
            <div class="gallery__animation">
              <div class="title">江东一日游</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content__list">
        <div class="content__list--title">
          <i class="el-icon-notebook-2"></i>Posts
        </div>
        <template v-for="i in 10">
          <div :key="i" :class="['content__list--item', i%2?'t1':'t2']">
            <div class="content__list--info">
              <div class="time">
                <i class="el-icon-time"></i> 发布于 2017-04-09{{i}}
              </div>
              <div class="title">
                <router-link to="/"><h3>ASky主题（19年2月21日更新1.7）</h3></router-link>
              </div>
              <div class="info">
                <i class="el-icon-view"></i> 116.68k 热度
                <i class="el-icon-chat-line-round"></i> 524 条评论
                <router-link to="/">
                  <i class="el-icon-files"></i> 分享
                </router-link>
              </div>
              <div class="desc">
                <p>最新版本说明 ASky1.7更新--2019-02-21 不太记得改了些什么了，记得的写在下面了，总之就和博主现在用的一样一样的，1. ...</p>
              </div>
              <div class="more">
                <router-link to="/">
                  <i class="el-icon-more"></i>
                </router-link>
              </div>
            </div>
            <div class="content__list--img">
              <router-link to="/">
                <img src="http://img.skyarea.cn/wp-content/uploads/2017/04/wallpaper.jpg" alt>
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
export default {
  name: 'NewHome',
  data () {
    return {
      bgHeight: '80px'
    }
  },
  mounted () {
    this.bgHeight = document.body.clientHeight + 'px'
  },
  methods: {
    goBackTop () {
      document.getElementById('full__bg').scrollIntoView()
    }
  }
}
</script>

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
</style>
