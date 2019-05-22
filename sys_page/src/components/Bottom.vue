<template>
  <div :class="['bottom__wrap', getFooterFixed ? 'fixed' : '']">
    <p>Copyright © 2019 | Powered by 小鱼儿 | Go to <a href="https://github.com/yxcs">Github</a></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Bottom',
  computed: {
    ...mapGetters('global', [
      'getFooterFixed'
    ])
  }
}
</script>
<style lang="scss" scoped>
  .bottom__wrap {
    height: 60px;
    line-height: 60px;
    background: #111;
    font-size: 13px;
    color: #666;
    text-align: center;
    p {
      margin: 0;
    }
    a {
      color: #666;
    }
    a:hover {
      text-decoration: underline;
    }
  }
  .bottom__wrap.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
