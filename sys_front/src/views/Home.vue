<template>
  <div class="wrap">
    <div class="carousel">
      <el-image :src="src">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
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
  }
  .image-slot {
    line-height: 100%;
    text-align: center;
  }
  .image-slot i {
    width: 120px;
  }
</style>
