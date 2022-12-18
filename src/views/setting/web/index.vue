<template>
  <div class="content">
    <el-tabs :tab-position="tabPosition">
      <!-- 站点配置 -->
      <el-tab-pane label="站点配置">
        <el-row>
          <el-col :span="8">
            <el-form ref="form" :model="siteConfig" :label-position="labelPosition" label-width="80px" style="margin-top:15px">
              <el-form-item label="域名">
                <el-input v-model="siteConfig.url" disabled />

                <!-- <span class="info"><i class="el-icon-bell" />1231231</span> -->
              </el-form-item>

              <el-form-item label="LOGO">
                <el-input v-model="siteConfig.logo" />
              </el-form-item>

              <el-form-item label="标题">
                <el-input v-model="siteConfig.title" />
              </el-form-item>

              <el-form-item label="副标题">
                <el-input v-model="siteConfig.deputyTitle" />
              </el-form-item>

              <el-form-item label="关键词">
                <el-input v-model="siteConfig.keyword" />
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="siteConfig.description" type="textarea" placeholder="请输入站点描述内容" maxlength="50" autosize show-word-limit />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" style="width: 100%" @click="onSubmit">
                  <i class="el-icon-edit-outline" style="margin-right:5px" />保存
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 主题配置 -->
      <el-tab-pane label="主题设置">
        <el-row>
          1
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: 'top',
      labelPosition: 'top',
      // 站点配置
      siteConfig: {
        url: '',
        logo: '',
        title: '',
        deputyTitle: '',
        keyword: '',
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
  padding: 0 !important;
}

::v-deep .el-tabs--top{
  padding: 50px;
  background-color: #fff !important;
}

::v-deep .el-form--label-top .el-form-item__label{
  padding: 0;
}

::v-deep .el-form-item{
  margin-bottom: 10px;
}

::v-deep .el-textarea textarea{
  min-height: 80px !important;
}
</style>
