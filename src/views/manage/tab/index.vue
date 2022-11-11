<template>
  <div class="content">
    <h3 class="title">友联管理</h3>
    <el-row>
      <el-col :span="9">
        <!-- 添加友联 -->
        <el-form ref="form" :model="urlData" label-width="80px" style="margin-top:15px">
          <el-form-item label="友联名称">
            <el-input v-model="urlData.name" />
          </el-form-item>

          <el-form-item label="友联网址">
            <el-input v-model="urlData.url" />
          </el-form-item>

          <el-form-item label="友联图标">
            <el-input v-model="urlData.image" />
          </el-form-item>

          <el-form-item label="友联描述">
            <el-input v-model="urlData.description" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="onSubmit">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12" style="margin-left:120px">
        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
        <el-divider />
        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图设置
      urlData: {
        name: '',
        url: '',
        image: '',
        description: ''
      }
    }
  },
  methods: {
    // 表单提交
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 50px 100px;
  padding: 50px !important;
}

.title {
  margin: 0;
  margin-bottom: 20px;
}

</style>
