<template>
  <div class="wrap">
    <div class="bg-wrap" :style="{'height': bgHeight}">
      <div class="top-message">
        <div class="top-avatar">
          <img src="../assets/login.png" alt="头像">
        </div>
        <div class="top-slogan">真正的英雄主义，是认清生活的真相后还依然热爱它。</div>
        <div class="top-scoial">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="main-list">
      <div class="notice">ASky更新到1.6，接下来进入慢更新节奏。最后还是poiplayer好看.....</div>
      <div class="top-feature">
        <h1 class="fes-title">
          <i class="el-icon-s-opportunity"></i>聚焦
        </h1>
        <div class="feature-content">
          <li class="feature-1">
            <a href="http://skyarea.cn/everything/1056/" target="_blank">
              <div class="feature-title">
                <div class="foverlay"></div>
                <div class="feature-title-text">东江一游</div>
                <img
                  src="http://img.skyarea.cn/wp-content/uploads/2018/09/Dong_Jiang_Hu_-_Wu_77.jpg"
                >
              </div>
            </a>
          </li>
          <li class="feature-2">
            <a href="http://skyarea.cn/share/466/" target="_blank">
              <div class="feature-title">
                <div class="foverlay"></div>
                <div class="feature-title-text">ASky主题（原Akina-Siren主题）</div>
                <img src="http://img.skyarea.cn/wp-content/uploads/2018/07/jujiao.jpg">
              </div>
            </a>
          </li>
          <li class="feature-3">
            <a href="http://skyarea.cn/myworks/738/" target="_blank">
              <div class="feature-title">
                <div class="foverlay"></div>
                <div class="feature-title-text">一个伪iPhone8宣传PPT</div>
                <img src="http://img.skyarea.cn/wp-content/uploads/2018/08/Xing_Kong.jpg">
              </div>
            </a>
          </li>
        </div>
      </div>
      <div class="content-area">
        <h1 class="main-title"><i class="el-icon-chat-dot-square"></i>Posts</h1>
        <div class="post-list-thumb">
          <div class="post-thumb-desc">
            <p class="time"><i class="el-icon-time"></i>发布于 2017-04-09</p>
            <div class="post-title"><router-link to="/test"><h3>ASky主题（19年2月21日更新1.7）</h3></router-link></div>
            <div class="post-desc"><i class="el-icon-lollipop"></i> 1.4k 热度 <i class="el-icon-chat-line-round"></i> 条评论 <i class="el-icon-share"></i>分享</div>
            <div class="post-text">前方迷途太多 坚持就有突破 正确做事就会越来越广阔   工作里怪事真多奇葩围绕着我今天必须吐 ...</div>
            <div class="post-more"><i class="el-icon-more"></i></div>
          </div>
          <div class="post-thumb-img">
            <img src="http://img.skyarea.cn/wp-content/uploads/2017/04/wallpaper.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      bgHeight: "75px",
      src: "https://yxcs.github.io/img/head-img.jpg"
    };
  },
  mounted() {
    this.bgHeight = document.body.clientHeight + "px";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  overflow: auto;
}
.bg-wrap {
  position: relative;
  width: 100%;
  background: url("../assets/b761af3c3e1ec310aa56021bb93d110f.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.bg-wrap::before {
  content: " ";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/grid.png");
  background-attachment: fixed;
}
.top-message {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 760px;
  margin: 0 auto;
  padding: 200px;
}
.top-avatar {
  width: 140px;
  height: 140px;
  border-radius: 70px;
  overflow: hidden;
}
.top-avatar img {
  width: 130px;
  height: 130px;
  padding: 5px;
  box-shadow: inset 0 0 20px #000;
}
.top-slogan {
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
  text-align: center;
}
.top-scoial {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.top-scoial > div {
  width: 15px;
  height: 15px;
  background-image: url("../assets/social_icon.png");
  background-repeat: no-repeat;
  padding: 7px;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0 5px;
  border-radius: 100%;
}
.top-scoial > div:nth-child(1) {
  background-position: center -485px;
}
.top-scoial > div:nth-child(2) {
  background-position: center -5px;
}
.top-scoial > div:nth-child(3) {
  background-position: center -445px;
}
.top-scoial > div:hover {
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.main-list {
  max-width: 800px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
}
.notice {
  padding: 20px 20px 20px 30px;
  border: 1px dashed #e6e6e6;
  font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei",
    SimSun, sans-serif;
  color: #969696;
  position: relative;
  display: inline-block;
  width: 100%;
  margin-top: 30px;
  background-color: #fbfbfb;
  background-image: url("../assets/notice.png");
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px 20px;
}
.top-feature {
  width: 100%;
  height: auto;
  margin-top: 55px;
  font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei",
    SimSun, sans-serif;
}
.top-feature li {
  width: 32.9%;
  float: left;
  margin: 0 auto;
  position: relative;
  display: block;
}
h1.fes-title,
h1.main-title {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 5px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ececec;
}
.feature-content {
  margin-top: 10px;
  display: inline-block;
  position: relative;
}
li.feature-2 {
  margin-left: 5px;
  margin-right: 5px;
}
.feature-title {
  width: 100%;
  height: 160px;
  position: relative;
  overflow: hidden;
}
.foverlay {
  position: absolute;
  width: 100%;
  height: 160px;
  background: #bbe2db;
  opacity: 0;
  -moz-transition: opacity 0.4s ease-out;
  -o-transition: opacity 0.4s ease-out;
  -webkit-transition: opacity 0.4s ease-out;
  transition: opacity 0.4s ease-out;
}
.feature-title-text {
  font-weight: bold;
  position: absolute;
  width: 100%;
  height: 40px;
  background-color: #3f3f3f;
  color: white;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  top: -10px;
  padding: 10px;
  opacity: 0;
  transition: 0.7s all ease;
  -webkit-transition: 0.7s all ease;
  -moz-transition: 0.7s all linear;
  -o-transition: 0.7s all ease;
  -ms-transition: 0.7s all ease;
  visibility: hidden;
}
.top-feature img {
  height: 160px;
  width: 257px;
}
img {
  height: auto;
  max-width: 100%;
}
.content-area {
  margin-top: 40px;
}
.post-list-thumb {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin: 20px 0 60px;
  padding: 40px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 3px;
  background-color: #FFFFFF;
}
.post-list-thumb > div {
  width: 45%;
}
.post-list-thumb .time {
  color: #888;
  font-size: 12px;
}
.post-list-thumb .time i {
  margin-right: 6px;
}
.post-title {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.post-title a {
  color: #504E4E;
}
.post-desc {
  color: #888;
  font-size: 12px;
}
.post-text {
  display: inline-block;
  text-align: justify;
  font-size: 14px;
  word-break: break-all;
  margin-top: 20px;
  line-height: 24px;
}
.post-more {
  margin-top: 10px;
}
.post-more i {
  font-size: 24px;
}
</style>
