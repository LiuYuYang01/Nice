<template>
  <div class="content">
    <el-tabs :tab-position="tabPosition">
      <!-- 个人设置 -->
      <el-tab-pane label="个人设置">
        <el-row>
          <el-col :span="8">
            <el-form ref="myForm" :model="mySettings" :rules="myVerify" :label-position="labelPosition" label-width="80px" style="margin-top:15px">
              <el-form-item>
                <el-upload class="avatar-uploader" action="#" :http-request="upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="mySettings.avatar" :src="mySettings.avatar" class="avatar">
                  <span v-if="mySettings.avatar"><i class="el-icon-edit-outline" /> 修改</span>

                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                  <el-progress v-if="is_percent" :percentage="percent" />
                </el-upload>
              </el-form-item>

              <el-form-item label="用户名">
                <el-input v-model="mySettings.username" disabled />
              </el-form-item>

              <el-form-item label="名称" prop="nickname">
                <el-input v-model="mySettings.nickname" />
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                <el-input v-model="mySettings.email" />
              </el-form-item>

              <el-form-item label="个性签名" prop="signature">
                <el-input v-model="mySettings.signature" type="textarea" placeholder="请输入你的个性签名" maxlength="50" autosize show-word-limit />
              </el-form-item>

              <el-form-item style="margin-top: 20px;">
                <el-button type="primary" style="width: 100%" @click="btnOk('my')">
                  <i class="el-icon-edit-outline" /> 保存
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 安全设置 -->
      <el-tab-pane label="安全设置">
        <el-row>
          <el-col :span="8">
            <el-form ref="safeForm" :model="safeSettings" :rules="safeVerify" :label-position="labelPosition" label-width="80px" style="margin-top:15px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="safeSettings.username" />
              </el-form-item>

              <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="safeSettings.newPwd" type="password" />
              </el-form-item>

              <el-form-item label="原密码" prop="oldPwd">
                <el-input v-model="safeSettings.oldPwd" type="password" />
              </el-form-item>

              <el-form-item style="margin-top: 20px;">
                <el-button type="primary" style="width: 100%" @click="btnOk('safe')">
                  <i class="el-icon-edit-outline" /> 保存
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { dateFormat } from '@/filter'
import { getUser, setUser } from '@/utils/auth'
import { updateInfoUsersAPI, safeUsersAPI, getUsersAPI } from '@/api/user'
export default {
  data() {
    return {
      tabPosition: 'top',
      labelPosition: 'top',
      id: 0,
      // 个人设置
      mySettings: {
        avatar: '', // 头像
        username: '', // 用户名
        nickname: '', // 名称
        email: '', // 邮箱
        signature: '' // 个性签名
      },
      // 个人信息校验
      myVerify: {
        nickname: [
          { required: true, message: '你的名称不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '你的名称限制为 1 ~ 10 个字符' }
        ],
        email: [
          { required: true, message: '你的邮箱不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '你的邮箱限制为 1 ~ 50 个字符' }
        ],
        signature: [
          { required: true, message: '你的个性签名不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '你的个性签名限制为 1 ~ 50 个字符' }
        ]
      },
      // 安全设置
      safeSettings: {
        username: '',
        newPwd: '',
        oldPwd: ''
      },
      // 安全信息校验
      safeVerify: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '用户名限制为 6 到 16 个字符',
            trigger: 'blur'
          }
        ],
        newPwd: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码限制为 6 ~ 16 个字符',
            trigger: 'blur'
          }
        ],
        oldPwd: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码限制为 6 ~ 16 个字符',
            trigger: 'blur'
          }
        ]
      },
      percent: 0, // 进度条
      is_percent: false // 进度条是否显示
    }
  },
  mounted() {
    this.id = JSON.parse(getUser()).id

    this.getUserInfo()

    this.cos = new COS({
      SecretId: 'AKIDWwriLexHTjmbFvW0JQUbLt1LRJPK4a8X',
      SecretKey: 'IOUZaP3Tiy4GOPDoDQVu8BFVcWFn8HCS'
    })
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const { data, message, success } = await getUsersAPI(this.id)

      if (success) {
        const { id, avatar, username, nickname, email, signature } = data
        this.mySettings = { id, avatar, username, nickname, email, signature }
        this.safeSettings = { id, username }
      } else {
        this.$message.error(message)
      }
    },
    // 个人信息修改
    async btnOk(val) {
      if (val === 'my') {
        this.$refs.myForm.validate(async(isOk) => {
          if (isOk) {
            // 个人信息设置
            const { message, success } = await updateInfoUsersAPI(this.mySettings)

            this.userCookies()

            if (success) {
              this.$message.success('修改用户信息成功')
              // 刷新
              location.reload()
            } else {
              this.$message.error(message)
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: '表单校验失败！'
            })
          }
        })
      } else if (val === 'safe') {
        this.$refs.safeForm.validate(async(isOk) => {
          if (isOk) {
            // 安全设置
            const { message, success } = await safeUsersAPI(this.safeSettings)

            if (success) {
              this.$message.success('修改安全信息成功')
              // 刷新
              location.reload()
            } else {
              this.$message.error(message)
            }
          } else {
            this.$notify.error({
              title: '错误',
              message: '表单校验失败！'
            })
          }
        })
      }
    },
    // 将最新的用户信息存到Cookies
    userCookies() {
      const obj = JSON.parse(getUser())

      for (const k in obj) {
        if (this.mySettings[k]) {
          obj[k] = this.mySettings[k]
        }
      }

      setUser(JSON.stringify(obj))
    },
    handleAvatarSuccess(res, file) {
      console.log(file)
      this.mySettings.avatar = URL.createObjectURL(file.raw)
    },
    // 检验图片
    beforeAvatarUpload(file) {
      const types = [
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/bmp',
        'image/png'
      ]

      if (!types.includes(file.type)) {
        this.$message.error('只支持上传以下格式：jpg jpeg png gif bmp')
        return false
      }

      // 限制最大上传
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片的最大限制为5MB')
        return false
      }

      return true
    },
    // 上传图片
    // 上传轮播图
    upload(params) {
      // 用当前时间 + 4位随机数作为图片名称可以避免图片名称重复
      const suffix = params.file.type.split('/')[1] // 后缀
      const name =
        dateFormat(params.file.lastModifiedDate)
          .split(':')
          .join('')
          .split('-')
          .join('')
          .split(' ')
          .join('') +
        random() +
        '.' +
        suffix

      function random() {
        return Math.floor(Math.random() * (10000 - 1 + 1)) + 1
      }

      this.cos.putObject(
        {
          // 存储桶
          Bucket: 'liuyuyang-1258623920',
          // 地域
          Region: 'ap-nanjing',
          // 文件名
          Key: 'Nice-' + name,
          // 上传文件对象
          Body: params.file,
          StorageClass: 'STANDARD',
          // 进度条
          onProgress: (params) => {
            this.is_percent = true
            this.percent = params.percent * 100

            // 上传完毕之后自动清零并关闭进度条
            if (this.percent === 100) {
              setTimeout(() => {
                this.percent = 0
                this.is_percent = false
              }, 1500)
            }
          }
        },
        (err, data) => {
          console.log(err || data)

          if (!err && data.statusCode === 200) {
            this.mySettings.avatar = 'http://' + data.Location
          }
        }
      )
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

::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
}

::v-deep .el-form-item {
  margin-bottom: 10px;
}

::v-deep .el-textarea textarea {
  min-height: 80px !important;
}

.avatar-uploader {
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 118px;
  height: 118px;
  border-radius: 50%;
  line-height: 118px;
  text-align: center;
  background-color: #f9f9f9;
}
.avatar {
  display: block;
  width: 118px;
  height: 118px;
  border-radius: 50%;
}
</style>
