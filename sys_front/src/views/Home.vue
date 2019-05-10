<template>
  <div class="wrap">
    <div class="carousel">
      <el-image :src="src">
        <div slot="placeholder" class="image-slot">
        </div>
      </el-image>
    </div>
    <div class="list">
      <div class="li">
        afd
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      src: 'https://yxcs.github.io/img/head-img.jpg'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .carousel {
    width: 750px;
    height: 187px;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 20px;
  }
  .image-slot {
    width: 750px;
    height: 187px;
    background: url('../assets/img-holder.png') no-repeat;
    background-size: 90px 90px;
    background-position: center center;
  }
</style>
