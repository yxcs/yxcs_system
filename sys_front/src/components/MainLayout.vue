<template>
  <div class="wrap">
    <Top />
    <div class="banner" :style="{'height': bdHeight}">
      <div class="grid">
        <div class="grid-content">
          <div class="gird-avatar">
            <img src="../assets/login.png" alt="用户名">
          </div>
          <div class="gird-title">真正的英雄主义，是认清生活的真相后还依然热爱它。</div>
          <div class="top-social">
            <div class="weixin"></div>
            <div class="qq"></div>
            <div class="wangyimusic"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="pad"></div>
  </div>
</template>

<script>
import Top from '@/components/Top'
export default {
  name: 'MainLayout',
  data () {
    return {
      bdHeight: '400px'
    }
  },
  components: {
    Top
  },
  mounted () {
    this.bdHeight = document.body.clientHeight + 'px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .banner {
    width: 100%;
    background: url('../assets/b761af3c3e1ec310aa56021bb93d110f.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
  }
  .grid {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 200px;
    background: url('../assets/grid.png');
  }
  .grid-content {
    width: 760px;
  }
  .gird-avatar {
    display: flex;
    justify-content: center;
    height: 140px;
  }
  .gird-avatar img {
    width: 130px;
    height: 130px;
    box-shadow: inset 0 0 10px #000;
    padding: 5px;
    border-radius: 65px;
  }
  .gird-title {
    width: 60%;
    margin: 22px auto 0;
    font-size: 14px;
    color: #EAEADF;
    background: rgba(0, 0, 0, 0.5);
    padding: 15px 25px;
    font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
    letter-spacing: 0;
    line-height: 30px;
    border-radius: 50px;
    text-align: center;
  }
  .top-social {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .top-social > div {
    width: 18px;
    height: 18px;
    padding: 7px;
    margin: 0 5px;
    background: url('../assets/social_icon.png') no-repeat;
    background-position: center -485px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }
  .top-social .weixin {
    background-position: center -485px;
  }
  .top-social .qq {
    background-position: center -5px;
  }
  .top-social .wangyimusic {
    background-position: center -445px;
  }
  .pad {
    height: 800px;
    background: #fff;
  }
</style>
