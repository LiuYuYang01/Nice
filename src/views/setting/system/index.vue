<template>
  <div class="content">
    <el-row>
      <el-col :span="10">
        <el-form ref="form" :model="configForm" label-width="80px" style="padding:50px">
          <el-collapse v-model="activeName">
            <el-collapse-item title="系统配置" :name="1">
              <el-form-item label="Token">
                <el-input v-model="configForm.system.token" disabled />
              </el-form-item>

              <el-form-item label="编辑器">
                <el-radio v-model="configForm.system.editor" :label="1">富文本</el-radio>
                <el-radio v-model="configForm.system.editor" :label="2">MarkDown</el-radio>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="用户配置" :name="2">
              <el-form-item label="用户注册">
                <el-radio v-model="configForm.user.is_enroll" :label="1">关闭</el-radio>
                <el-radio v-model="configForm.user.is_enroll" :label="2">开启</el-radio>
              </el-form-item>

              <el-form-item label="默认身份">
                <el-select v-model="configForm.user.identity" size="small" placeholder="请选择">
                  <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" /> -->
                  <el-option label="管理员" :value="1" />
                  <el-option label="作者" :value="2" />
                  <el-option label="用户" :value="3" />
                  <el-option label="游客" :value="4" />
                </el-select>
              </el-form-item>
            </el-collapse-item>

            <el-collapse-item title="文件配置" :name="3">
              <el-form-item label="存储方式">
                <el-radio v-model="configForm.file.is_storage" :label="1">本地存储</el-radio>
                <el-radio v-model="configForm.file.is_storage" :label="2">对象存储</el-radio>
              </el-form-item>

              <!-- 对象存储 -->
              <div v-if="configForm.file.is_storage === 2">
                <el-form-item label="Bucket">
                  <el-input v-model="configForm.bucket" />
                </el-form-item>

                <el-form-item label="SecretId">
                  <el-input v-model="configForm.accessKeyId" />
                </el-form-item>

                <el-form-item label="SecretKey">
                  <el-input v-model="configForm.accessKeySecret" />
                </el-form-item>
              </div>

              <el-form-item label="文件限制">
                <el-input v-model="configForm.file.fileLimits" size="small" placeholder="请填写文件上传MB最大限制" />
              </el-form-item>

              <el-form-item label="文件格式">
                <el-checkbox-group v-model="configForm.file.format">
                  <div>
                    <el-checkbox :label="1">图片文件（jpg jpeg png gif）</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox :label="2">多媒体文件（mp3 mp4 mov avi）</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox :label="3">常用档案文件（txt doc xls ppt pdf zip rar）</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox :label="4">
                      其他格式：
                      <el-input v-model="configForm.file.otherFormat" size="small" style="width: 102%" />
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
                <p class="prompt">
                  <i class="el-icon-bell" style="margin-right:5px" />多个格式以空格隔开
                </p>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <el-button type="primary" style="width: 100%;margin-top:20px" @click="onSubmit">
            <i class="el-icon-edit-outline" style="margin-right:5px" />保存配置
          </el-button>
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
        system: {
          token: '',
          editor: 2
        },
        user: {
          is_enroll: 1,
          identity: 3
        },
        file: {
          is_storage: 1,
          bucket: '',
          accessKeyId: '',
          accessKeySecret: '',
          fileLimits: '',
          format: [3, 4],
          otherFormat: 'html css js'
        }
      },
      activeName: [1]
    }
  },
  created() {
    this.configForm.system.token = getToken()
  },
  methods: {
    onSubmit() {
      console.log(this.configForm.format)
    }
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

::v-deep .el-collapse-item:last-child .el-collapse-item__header {
  border-bottom: none;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}

.prompt {
  margin: 0px;
  line-height: 20px;
  color: #cfcfcf;
  font-size: 12px;
  text-align: end;
}
</style>
