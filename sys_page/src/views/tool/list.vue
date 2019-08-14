<template>
  <div class="article__wrap">
    <Top />
    工具
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const Top = () => import('@/components/Top')
export default {
  name: 'ToolList',
  data () {
    return {
      list: []
    }
  },
  components: {
    Top
  },
  mounted () {
    this.setNavType('toolList')
  },
  methods: {
    ...mapMutations('global', [
      'setNavType'
    ]),
  }
}
</script> 
<style lang="scss" scoped>
.article__content {
  width: 760px;
  padding: 20px;
  margin: 40px auto;
  border: 1px solid rgba(0,0,0,0.08);
  min-height: 400px;
}
</style>
