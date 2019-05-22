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
  background-color: #fff;
}
#app {
  height: 100%;
}
a {
  text-decoration: none;
  color: #333;
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
::selection {
  background: #444444;
  color: #fff;
}
</style>
