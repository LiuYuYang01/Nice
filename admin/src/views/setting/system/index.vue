<template>
  <div class="content">
    <el-row type="flex" justify="space-between">
      <el-col :span="5" class="nav">
        <div :class="{item: 'item', active: index === 1 ? 'active' : ''}" @click="index = 1">
          <h4>系统配置</h4>
          <p>Token、系统安全等配置</p>
        </div>

        <div :class="{item: 'item', active: index === 2 ? 'active' : ''}" @click="index = 2">
          <h4>用户配置</h4>
          <p>用户注册、默认身份等配置</p>
        </div>

        <div :class="{item: 'item', active: index === 3 ? 'active' : ''}" @click="index = 3">
          <h4>文件配置</h4>
          <p>对象存储、文件上传等配置</p>
        </div>

        <div :class="{item: 'item', active: index === 4 ? 'active' : ''}" @click="index = 4">
          <h4>文章配置</h4>
          <p>文章审核、自动保存等配置</p>
        </div>
      </el-col>

      <el-col :span="18" class="info">
        <el-form ref="form" :model="configForm" label-width="80px" style="padding:50px; padding-top: 65px; width:600px">
          <!-- 系统配置 -->
          <div v-if="index === 1">
            <div class="title text-gradient">系统配置</div>

            <el-form-item label="Token">
              <el-input v-model="token" disabled style="width: 70%;" />
            </el-form-item>

            <el-form-item label="编辑器">
              <el-radio v-model="configForm.system.editor" :label="1">富文本</el-radio>
              <el-radio v-model="configForm.system.editor" :label="2">MarkDown</el-radio>
            </el-form-item>
          </div>

          <!-- 用户配置 -->
          <div v-if="index === 2">
            <div class="title text-gradient">用户配置</div>

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
          </div>

          <!-- 文件配置 -->
          <div v-if="index === 3">
            <div class="title text-gradient">文件配置</div>

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
              <el-input v-model="configForm.file.fileLimits" size="small" placeholder="请填写文件上传MB最大限制" style="width: 64%" />
            </el-form-item>

            <el-form-item label="文件格式">
              <el-checkbox-group v-model="configForm.file.format">
                <div>
                  <el-checkbox label="jpg/jpeg/png/gif">图片文件（jpg jpeg png gif）</el-checkbox>
                </div>
                <div>
                  <el-checkbox label="mp3/mp4/mov/avi">多媒体文件（mp3 mp4 mov avi）</el-checkbox>
                </div>
                <div>
                  <el-checkbox label="txt/doc/xls/ppt/pdf/zip/rar">常用档案文件（txt doc xls ppt pdf zip rar）</el-checkbox>
                </div>
                <div>
                  <el-checkbox :label="configForm.file.otherFormat">
                    其他格式：
                    <el-input v-model="configForm.file.otherFormat" size="small" style="width: 70%" />
                  </el-checkbox>
                </div>
              </el-checkbox-group>

              <p class="prompt">
                <i class="el-icon-bell" style="margin-right:5px" />多个格式以 / 隔开
              </p>
            </el-form-item>
          </div>

          <!-- 文章配置 -->
          <div v-if="index === 4">
            <div class="title text-gradient">文章配置</div>

            <el-form-item label="文章审核">
              <el-radio v-model="configForm.article.is_audit" :label="1">是</el-radio>
              <el-radio v-model="configForm.article.is_audit" :label="2">否</el-radio>
            </el-form-item>
          </div>

          <el-row type="flex" justify="space-between" style="width:300px">
            <!-- 保存配置 -->
            <el-button type="primary" size="small" style="padding: 9px 30px;" @click="saveConfig">
              <i class="el-icon-edit-outline" /> 保存配置
            </el-button>

            <!-- 导入配置 -->
            <el-upload
              class="upload-demo import"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-change="openFile"
              style="margin-left: 10px;"
            >
              <el-button size="small" type="success">
                <i class="el-icon-tickets" /> 导入配置
              </el-button>
            </el-upload>

            <!-- 导出配置 -->
            <el-button size="small" style="margin-left:10px" @click="exportConfig">
              <i class="el-icon-coin" /> 导出配置
            </el-button>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog title="系统配置" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="export">
        <p class="prompt"><i class="el-icon-warning" /> 请把以下 JSON 配置代码保存</p>

        <!-- 内容 -->
        <div class="con">
          <p>{{ JSON.stringify(configForm) }}</p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import { updateSystemAPI, getConfigAPI } from '@/api/setting'
export default {
  data() {
    return {
      index: 1,
      tabPosition: 'top',
      // 站点配置
      configForm: {
        // 系统配置
        system: {
          editor: 2
        },
        // 用户配置
        user: {
          is_enroll: 1,
          identity: 3
        },
        // 文件配置
        file: {
          is_storage: 1,
          bucket: '',
          accessKeyId: '',
          accessKeySecret: '',
          fileLimits: '5M',
          format: ['txt/doc/xls/ppt/pdf/zip/rar', 'HTML/CSS/JavaScript'],
          otherFormat: 'HTML/CSS/JavaScript'
        },
        // 文章配置
        article: {
          is_audit: 1
        }
      },
      activeName: [1],
      dialogVisible: false
    }
  },
  created() {
    this.token = getToken()
    this.getConfigAPI()
  },
  methods: {
    // 获取配置信息
    async getConfigAPI() {
      const { data, message, success } = await getConfigAPI()

      if (success) {
        this.configForm = JSON.parse(data.config)
      } else {
        this.$message.error(message)
      }
    },
    // 保存配置
    async saveConfig() {
      // 修改系统配置信息
      const { message, success } = await updateSystemAPI(this.configForm)

      if (success) {
        this.getConfigAPI()

        this.$notify({
          title: '成功',
          message: '保存系统配置成功',
          type: 'success'
        })
      } else {
        this.$notify.error({
          title: '警告',
          message
        })
      }
    },
    // 导出配置
    exportConfig() {
      console.log(JSON.stringify(this.configForm))
      var data = JSON.stringify(this.configForm)
      const str = new Blob([data], { type: 'text/plain;charset=utf-8' })
      // 注意这里要手动写上文件的后缀名
      saveAs(str, `setting.txt`)
    },
    handleClose() {},
    // 上传文件
    openFile(file) {
      if (file.status === 'success') {
        var reader = new FileReader()
        reader.onload = async() => {
          if (reader.result) {
            // 解析文件的内容
            console.log(reader.result)

            // 导入系统配置信息
            const { message, success } = await updateSystemAPI(
              JSON.parse(reader.result)
            )

            if (success) {
              this.getConfigAPI()

              this.$notify({
                title: '成功',
                message: '导入系统配置成功',
                type: 'success'
              })

              this.getConfigAPI()
            } else {
              this.$notify.error({
                title: '警告',
                message
              })
            }
          }
        }
        reader.readAsText(file.raw)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 500px;
  padding: 0 !important;
  margin: 50px 100px;
  background-color: transparent;
  box-shadow: none;
}

.nav {
  overflow: hidden;
  width: 22.83333%;
  padding: 10px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70px;
    padding-left: 20px;
    transition: all 0.3s;
    cursor: pointer;

    h4 {
      margin: 0;
      margin-bottom: 10px;
      font-weight: 400;
      color: #1f2225;
    }

    p {
      margin: 0;
      font-size: 12px;
      color: #666;
    }

    &:hover {
      background-color: #f8f8f8;
    }
  }

  .active {
    background-color: #eaecff !important;
  }

  .active h4,
  .active p {
    color: #727cf5 !important;
  }
}

.info {
  position: relative;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .title {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 700;
    font-size: 20px;
  }

  .prompt {
    margin: 0px;
    line-height: 20px;
    color: #cfcfcf;
    font-size: 12px;
  }
}

::v-deep .el-dialog__body {
  padding: 0 20px 0px 20px;
  line-height: 25px;
}

// 导出
.export {
  .prompt {
    display: flex;
    align-items: center;
    color: #666;

    i {
      color: #727cf5;
      font-size: 20px;
      margin-right: 5px;
    }
  }

  .con {
    padding: 20px 40px;
    border-radius: 5px;
    color: #8a8a8a;
    background-color: #f8f8f8;
  }
}
</style>
