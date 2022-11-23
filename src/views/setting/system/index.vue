<template>
  <div class="content">
    <el-row>
      <el-col :span="9">
        <el-form ref="form" :model="configForm" label-width="80px" style="padding:50px">
          <el-collapse v-model="activeName">
            <el-collapse-item title="系统配置" name="1">
              <el-form-item label="Token">
                <el-input v-model="configForm.token" disabled />
              </el-form-item>

              <el-form-item label="编辑器">
                <el-radio v-model="configForm.editor" label="1">富文本</el-radio>
                <el-radio v-model="configForm.editor" label="2">MarkDown</el-radio>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="用户配置" name="2">
              <el-form-item label="用户注册">
                <el-radio v-model="configForm.is_enroll" label="1">关闭</el-radio>
                <el-radio v-model="configForm.is_enroll" label="2">开启</el-radio>
              </el-form-item>

              <el-form-item label="默认身份">
                <el-select v-model="configForm.identity" size="small" placeholder="请选择">
                  <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> -->
                  <el-option label="管理员" value="1" />
                  <el-option label="作者" value="2" />
                  <el-option label="用户" value="3" />
                  <el-option label="游客" value="4" />
                </el-select>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="OSS配置" name="3">
              <el-form-item label="Bucket">
                <el-input v-model="configForm.bucket" />
              </el-form-item>

              <el-form-item label="AccessKeyId">
                <el-input v-model="configForm.accessKeyId" />
              </el-form-item>

              <el-form-item label="AccessKeySecret">
                <el-input v-model="configForm.accessKeySecret" />
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <el-form-item style="margin-top:30px">
            <el-button type="primary" style="width: 100%" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      tabPosition: 'top',
      // 站点配置
      configForm: {
        token: '',
        editor: '2',
        is_enroll: '1',
        identity: '3',
        bucket: '',
        accessKeyId: '',
        accessKeySecret: ''
      },
      activeName: ['1']
    }
  },
  created() {
    this.configForm.token = getToken()
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 50px 100px;
  padding: 0 !important;
}

::v-deep .el-tabs--top {
  padding: 50px;
  background-color: #fff !important;
}

::v-deep .el-tabs__header {
  margin: 0 0 5px;
}

// 更新token按钮
::v-deep .el-input-group__append,
.el-input-group__prepend {
  padding: 0 15px;
}
::v-deep .el-collapse {
  border-top: none;
}
::v-deep .el-collapse-item__content {
  padding: 0;
  padding-top: 10px;
}

::v-deep .el-collapse-item__header {
  font-size: 16px;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}
</style>
