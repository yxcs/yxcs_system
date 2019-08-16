<template>
  <div class="article__wrap">
    <Top />
    <div class="tool__wrap">
      <div class="tool__block" v-for="item in list" :key="item.id">
        <div class="tool__block--title">{{item.title}}</div>
        <div class="tool__block--item">
          <template v-for="sItem in item.sub">
            <div :key="sItem.type" :class="['item', sItem.bg]" @click="goTo(sItem.url)">{{sItem.name}}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Top = () => import('@/components/Top')
export default {
  name: 'ToolMark',
  data () {
    return {}
  },
  components: {
    Top
  },
  mounted () {
  },
  methods: {
  }
}
</script> 
<style lang="scss" scoped>
</style>
