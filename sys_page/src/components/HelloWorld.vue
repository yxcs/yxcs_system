<template>
  <div class="scroll-view">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="scroll-wrap">
      <div class="scroll-child"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      busy: false
    }
  },
  props: {
    msg: String
  },
  methods: {
    loadMore() {
      console.log('------------more------------')
      console.log(this.busy)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-view {
  height: 600px;
  overflow: hidden;
}
.scroll-wrap {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.scroll-child {
  width: 500px;
  height: 2000px;
}
</style>
