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
              <el-input v-model="configForm.system.token" disabled style="width: 70%;" />
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

          <!-- 保存配置 -->
          <el-button type="primary" style="width: 130px;" size="small" @click="onSubmit">
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
      index: 1,
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
          fileLimits: '5M',
          format: [3, 4],
          otherFormat: 'HTML/CSS/JavaScript'
        },
        article: {
          is_audit: 1
        }
      },
      activeName: [1]
    }
  },
  created() {
    this.configForm.system.token = getToken()
  },
  methods: {
    onSubmit() {}
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
</style>
