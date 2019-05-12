<template>
  <div class="wrap">
    <Top />
    <router-view></router-view>
  </div>
</template>

<script>
import Top from './Top'
export default {
  name: 'MainLayout',
  data () {
    return {
      bdHeight: '400px'
    }
  },
  components: {
    Top
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
