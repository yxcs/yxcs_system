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
  ::-webkit-scrollbar{
    width: 10px;
    height: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
</style>
