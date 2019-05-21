<template>
  <div class="bottom__wrap">
    <p>Copyright © 2019 | Powered by 小鱼儿 | Go to <a href="https://github.com/yxcs">Github</a></p>
  </div>
</template>

<script>
export default {
  name: 'Bottom'
}
</script>
<style lang="scss" scoped>
  .bottom__wrap {
    margin-top: 20px;
    height: 60px;
    line-height: 60px;
    background: #111;
    font-size: 13px;
    color: #666;
    text-align: center;
    a {
      color: #666;
    }
    a:hover {
      text-decoration: underline;
    }
  }
</style>
