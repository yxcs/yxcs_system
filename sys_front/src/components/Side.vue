<template>
  <div class="wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通知</span>
      </div>
      <div class="notice">
        <p>主题Snippet v1.2.1版本已经上线！欢迎更新~ </p>
        <p>主题下载：Snippet主题 </p>
        <p>主题使用：常见使用问题  </p>
        <p>接受贡献，包括不限于提交问题与需求，修复代码。欢迎Pull Request</p>
        <p>支持主题：Star一下</p>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>联系</span>
      </div>
      <div class="concat">
        <el-button type="info" icon="el-icon-lollipop" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="info" icon="el-icon-chat-dot-round" circle></el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div> 
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签</span>
      </div>
      <div class="tags">
        <el-tag class="tag" v-for="tag in 10" :key="'tag'+tag">标签{{tag}}</el-tag>
      </div> 
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Side'
}
</script>

<style scoped>
  .box-card {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .box-card p {
    line-height: 26px;
  }
  .tag {
    margin: 5px;
  }
</style>
