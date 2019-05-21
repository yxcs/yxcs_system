<template>
  <div class="layout__wrap">
    <Top />
    <router-view/>
    <Bottom />
  </div>
</template>

<script>
import Top from '@/components/Top'
import Bottom from '@/components/Bottom'
export default {
  name: 'MainLayout',
  components: {
    Top,
    Bottom
  }
}
</script>
<style scoped>
  .layout__wrap {
    min-height: 100%;
  }
</style>
