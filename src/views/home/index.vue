<template>
  <div class="content">
    <h2 class="title">Hello! 新一代CMS管理系统 </h2>

    <!-- 可视化图表 -->
    <el-row class="chart" type="flex" justify="space-between">
      <!-- 今日访问量 -->
      <el-col :span="6">
        <h3>今日访问量</h3>
        <visits />
      </el-col>

      <!-- 新增用户 -->
      <el-col :span="6">
        <h3>今日新增用户</h3>
        <user />
      </el-col>

      <!-- 待办 -->
      <el-col :span="6">
        <h3>今日待办</h3>
        <!-- 待办 -->
        <div class="toBeDone">
          <div class="item">
            <span>待审评论</span>
            <h4>53</h4>
          </div>

          <div class="item">
            <span>待审文章</span>
            <h4>16</h4>
          </div>

          <div class="item">
            <span>待审帖子</span>
            <h4>25</h4>
          </div>

          <div class="item">
            <span>待审用户</span>
            <h4>9</h4>
          </div>
        </div>
      </el-col>

      <!-- 作者寄语 -->
      <el-col :span="6">
        <h3>作者寄语</h3>
        <p class="message">
          <span style="color:#727cf5">Nice</span> 是一款新一代的CMS管理系统，在未来不仅仅是CMS🎉
          <br>
          我们一直坚持以极致的交互带给你不一样的体验，复杂的功能留给我们，简单的体验留给用户🪄
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import visits from './visits'
import user from './user'
export default {
  name: 'Home',
  components: {
    visits,
    user
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 50px;
  padding-top: 40px;
  background-color: #f9f9f9;

  .title {
    margin: 0;
    margin-bottom: 30px;
  }

  .message {
    margin: 50px 30px;
    line-height: 30px;
    font-size: 15px;
  }
}
.chart {
  h3 {
    margin: 0;
  }
  .el-col {
    width: 24.1%;
    height: 250px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

    h3 {
      position: relative;
      top: 30px;
      left: 30px;
    }

    .toBeDone {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      height: 170px;
      margin-top: 50px;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 43%;
        margin: 0 10px 10px 0;
        text-align: center;
        background-color: #f8f8f8;

        &:nth-of-type(2n) {
          margin-right: 0;
        }

        span {
          font-size: 13px;
          color: #333;
          margin-bottom: 10px;
        }

        h4 {
          margin: 0;
          font-size: 25px;
          color: #727cf5;
        }
      }
    }
  }
}
</style>
