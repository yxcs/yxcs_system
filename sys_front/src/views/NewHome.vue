<template>
  <div class="wrap">
    <div class="fixed__header">
      <div class="fixed__header--avatar">
        <img src="../assets/login.png" alt="用户头像">
      </div>
      <div class="fixed__header--group">
        <div class="fixed__header--nav">asfdssdf</div>
        <div class="fixed__header--menu">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <div class="fixed__header--user"><i class="el-icon-user"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewHome",
  data() {
    return {};
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.fixed__header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  -webkit-box-shadow: 0px 1px 5px 2px #ccc;
     -moz-box-shadow: 0px 1px 5px 2px #ccc;
          box-shadow: 0px 1px 5px 2px #ccc;
}
.fixed__header--avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
  margin: 0 40px;
}
.fixed__header--avatar img {
  width: 100%;
  height: 100%;
}
.fixed__header--group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 40px;
}
.fixed__header--user {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.fixed__header--group i {
  font-size: 30px;
}
.fixed__header--menu {
  
}
</style>
