<template>
  <div class="wrap">
    <div class="cover-img" :style="{backgroundImage: `url(${bgUrl})`}">
      <div class="avatar">
        <el-image :src="src">
          <img src="../assets/img-holder.png" />
        </el-image>
      </div>
      <div class="solgan">抓不住的似水流年，留不住的曾经少年</div>
    </div>
    <div class="nav">
      <template v-for="item in nav">
        <div class="nav-item" :key="item.id">
          <router-link :to="item.link">{{item.name}}</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
export default {
  name: "Top",
  data() {
    return {
      bgUrl: 'https://raw.githubusercontent.com/yxcs/static_images/master/others/blog_banner.jpg',
      src: 'https://yxcs.github.io/img/avatar.jpg',
      nav: [
        {id: 'home', name: '首页', link: '/home'},
        {id: 'frontend', name: '前端', link: '/frontend'},
        {id: 'backend', name: '后端', link: '/backend'},
        {id: 'tool', name: '工具', link: '/tool'},
        {id: 'essay', name: '杂文', link: '/essay'},
        {id: 'timeline', name: '时间轴', link: '/timeline'},
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 180px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #fff;
}
.avatar {
  width: 80px;
  height: 80px;
  border: 2px solid #fff;
  border-radius: 80px;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.solgan {
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
}

.nav {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ebebeb;
  border-bottom: 2px solid #e1e1e1;
  margin-bottom: 20px;
  background: #fff;
}
.nav-item {
  margin: 0 5px;
  width: 70px;
  height: 60px;
}
.nav-item a {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  font-weight: 200;
}
.nav-item a:hover {
  color: #E6A23C;
}
</style>
