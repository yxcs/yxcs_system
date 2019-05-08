<template>
  <div class="wrap">
    <Top />
    <div class="main">
      <div class="left">
        <router-view/>
      </div>
      <div class="right">
        <Side />
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Top from '@/components/Top'
import Bottom from '@/components/Bottom'
import Side from '@/components/Side'
export default {
  name: 'MainLayout',
  data () {
    return {
      
    }
  },
  components: {
    Top,
    Bottom,
    Side
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    width: 1140px;
    margin: 0 auto 20px auto;
    min-width: 600px;
  }
  .main:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
  .main .left,
  .main .right {
    float: left;
  } 
  .left {
    width: 750px;
    margin-right: 30px;
  }
  .right {
    width: 360px;
  }
</style>
