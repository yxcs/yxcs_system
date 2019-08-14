<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
html,body {
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #fff;
}
#app {
  height: 100%;
}
a {
  text-decoration: none;
  color: #333;
}
::-webkit-scrollbar {
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
::selection {
  background: #444444;
  color: #fff;
}

/* 列表样式 */
.home__wrap {
  position: relative;
  min-height: 600px;
  width: 800px;
  margin: 0 auto;
  .home__list--title {
    padding: 10px 20px;
    color: #666;
    font-weight: 400;
    border-bottom: 1px dashed #ececec;
    background: #fff;
    h1 {
      font-size: 16px;
    }
    i {
      font-size: 18px;
      margin-right: 6px;
    }
  }
}
</style>
