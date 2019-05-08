<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body,div,ul,li,p{margin: 0;padding: 0;}
  body {
    color: #505050;
    background: #ebebeb;
    position: relative;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","WenQuanYi Micro Hei","Microsoft YaHei UI","Microsoft YaHei",sans-serif;
  }
  a {
    color: #505050;
    text-decoration: none;
  }
</style>
