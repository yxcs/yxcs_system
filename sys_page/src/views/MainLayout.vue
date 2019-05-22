<template>
  <div class="layout__wrap">
    <router-view/>
    <Bottom />
  </div>
</template>

<script>
import Bottom from '@/components/Bottom'
export default {
  name: 'MainLayout',
  components: {
    Bottom
  }
}
</script>
<style scoped>
  .layout__wrap {
    min-height: 100%;
  }
</style>
