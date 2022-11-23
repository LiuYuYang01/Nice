<template>
  <div class="content">
    <h2 class="title text-gradient">资源库</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane label="图片" name="image">
        <el-row type="flex" justify="space-between" class="head">
          <el-col>
            <h2>图片</h2>
          </el-col>

          <el-col :span="2" style="width:8.33333%">
            <el-button type="primary" size="small" style="width:100px">新建分组</el-button>
          </el-col>
        </el-row>

        <el-row class="main">
          <el-col :span="2" class="grouping">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wenjianleixing-biaozhuntu-wenjianjia" />
            </svg>

            <p>代码分组</p>
          </el-col>

          <el-col :span="2" class="grouping">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wenjianleixing-suolvetu-wenjianjia" />
            </svg>

            <p>未命名分组</p>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="视频" name="video">视频</el-tab-pane>
      <el-tab-pane label="文件" name="file">文件</el-tab-pane>
      <el-tab-pane label="其他" name="other">其他</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Material',
  data() {
    return {
      activeName: 'image'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  margin: 50px 100px;
  padding: 50px !important;

  > .title {
    margin: 0;
    margin-bottom: 20px;
  }

  .head {
    align-items: center;
  }

  .main {
    .grouping {
      text-align: center;
      cursor: pointer;

      svg {
        width: 70%;
        height: 70px;
      }

      p {
        margin: 0;
        margin-top: 5px;
        color: #333;
        font-size: 13px;
        transition: all 0.3s;
      }

      &:hover p{
        color: #727cf5;
      }
    }
  }
}
</style>
