<template>
  <div class="content">
    <h2 class="title text-gradient">资源库</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="默认" name="default">默认</el-tab-pane>
      <el-tab-pane label="图片" name="image">图片</el-tab-pane>
      <el-tab-pane label="视频" name="video">视频</el-tab-pane>
      <el-tab-pane label="文件" name="file">文件</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Material',
  data() {
    return {
      activeName: 'default'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 50px 100px;
  padding: 50px !important;

  .title{
    margin: 0;
    margin-bottom: 20px;
  }
}
</style>
