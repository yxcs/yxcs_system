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

<style>
html,body {
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #efefef;
}
#app {
  height: 100%;
}
a {
  text-decoration: none;
  color: #333;
}
</style>
