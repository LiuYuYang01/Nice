<template>
  <div class="content">
    <h3 class="title text-gradient">轮播图管理</h3>
    <el-row>
      <el-col :span="9">
        <!-- 新增轮播图 -->
        <el-form ref="bannerForm" :model="bannerForm" :rules="bannerVerify" label-width="80px" style="margin-top:15px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="bannerForm.title" />
          </el-form-item>

          <el-form-item label="副标题" prop="deputyTitle">
            <el-input v-model="bannerForm.deputyTitle" />
          </el-form-item>

          <el-form-item label="轮播图" prop="image">
            <el-input v-model="bannerForm.image" @blur="imageBlur(bannerForm.image)" />

            <!-- 上传成功后显示刚刚上传的图片 -->
            <div v-if="banner.length === 0">
              <!-- 上传轮播图 -->
              <el-upload class="upload-demo" action="#" :http-request="upload" :file-list="fileList" :on-change="changeFile" :on-exceed="exceed" :before-upload="beforeUpload" :limit="1" drag>
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg / png文件，且不超过 <b>5M</b></div>
              </el-upload>
              <el-progress v-if="is_percent" :percentage="percent" />
            </div>

            <!-- 图片 -->
            <div v-else class="banner">
              <img v-image="require('@/assets/default.png')" :src="banner" alt="" class="banner">

              <!-- 功能 -->
              <div class="function">
                <!-- 预览图片 -->
                <i class="el-icon-view" @click="preview" />

                <!-- 下载图片 -->
                <a :href="banner" :download="banner" target="view_window">
                  <i class="el-icon-download" />
                </a>

                <!-- 删除图片 -->
                <i class="el-icon-delete" @click="delBanner" />
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="btnOk">{{ title }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12" style="margin-left:120px">
        <!-- 轮播图列表 -->
        <el-table ref="selectTable" :data="bannerData" tooltip-effect="dark" style="width: 100%" border>
          <el-table-column prop="title" label="标题" width="200" align="center" />
          <el-table-column prop="deputyTitle" width="300" label="副标题" align="center" />
          <el-table-column prop="image" width="270" label="轮播图" align="center">
            <a slot-scope="{ row }" :href="row.image" target="_blank" class="imageUrl">{{ row.image }}</a>
          </el-table-column>
          <el-table-column prop="date" label="日期" width="150" sortable align="center">
            <template slot-scope="{ row }">{{ row.date | dateFormat }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" style="color:#4fb985" @click="view(row.id)">查看</el-button>
              <el-button type="text" size="small" @click="emit(row.id)">编辑</el-button>
              <el-button type="text" size="small" style="color:#F56C6C" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 图片预览 -->
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img v-image="require('@/assets/default.png')" width="100%" :src="banner" alt="">
      </el-dialog>

      <el-dialog title="图片预览" :visible.sync="dialogImage">
        <img v-image="require('@/assets/default.png')" width="100%" :src="viewImage" alt="">
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { dateFormat } from '@/filter'
import {
  addBannerAPI,
  delBannerAPI,
  updateBannerAPI,
  getBannerAPI,
  getAllBannerAPI
} from '@/api/banner'
export default {
  data() {
    return {
      cos: null,
      title: '新增轮播图',
      // 轮播图设置
      bannerForm: {
        title: '',
        deputyTitle: '',
        image: '',
        date: ''
      },
      // 轮播图列表数据
      bannerData: [],
      bannerVerify: {
        title: [
          { required: true, message: '轮播图标题不能为空' },
          { min: 1, max: 30, message: '轮播图标题限制为 1 ~ 30 个字符' }
        ],
        deputyTitle: [
          { required: true, message: '轮播图副标题不能为空' },
          { min: 1, max: 100, message: '轮播图副标题限制为 1 ~ 100 个字符' }
        ],
        image: [
          { required: true, message: '轮播图不能为空' },
          { min: 1, max: 300, message: '轮播图限制为 1 ~ 300 个字符' }
        ]
      },
      fileList: [],
      // 进度条进度
      percent: 0,
      // 是否显示进度条
      is_percent: false,
      // 图片
      banner: '',
      viewImage: '',
      // 图片预览
      dialogVisible: false,
      dialogImage: false
    }
  },
  created() {
    this.getAllBannerAPI()
  },
  mounted() {
    this.cos = new COS({
      SecretId: 'AKIDWwriLexHTjmbFvW0JQUbLt1LRJPK4a8X',
      SecretKey: 'IOUZaP3Tiy4GOPDoDQVu8BFVcWFn8HCS'
    })
  },
  methods: {
    // 初始化
    format() {
      this.title = '新增轮播图'
      this.banner = ''
      this.bannerForm = {
        title: '',
        deputyTitle: '',
        image: '',
        date: ''
      }
      this.fileList = []
      this.$refs.bannerForm.resetFields()
    },
    // 获取轮播图列表
    async getAllBannerAPI() {
      const { data, message, success } = await getAllBannerAPI()

      if (success) {
        this.bannerData = data
      } else {
        this.$message.error(message)
      }
    },
    // 查看轮播图
    async view(id) {
      const { data, message, success } = await getBannerAPI(id)

      if (success) {
        this.viewImage = data.image
      } else {
        this.$message.error(message)
      }

      this.dialogImage = true
    },
    // 编辑轮播图
    async emit(id) {
      this.title = '编辑轮播图'

      const { data, message, success } = await getBannerAPI(id)

      if (success) {
        this.bannerForm = data
        this.banner = data.image
      } else {
        this.$message.error(message)
      }
    },
    // 删除轮播图
    async del(id) {
      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { message, success } = await delBannerAPI({ id })

          if (success) {
            this.$message.success('删除成功')
            this.getAllBannerAPI()
            // 初始化
            this.format()
          } else {
            this.$message.error(message)
          }

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
    },
    // 新增 or 编辑
    async btnOk() {
      if (this.title === '新增轮播图') {
        this.$refs.bannerForm.validate(async(isOk) => {
          if (isOk) {
            const { message, success } = await addBannerAPI(this.bannerForm)

            if (success) {
              this.$message.success('新增成功')

              // 获取最新数据
              this.getAllBannerAPI()
              // 初始化
              this.format()
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
      } else if (this.title === '编辑轮播图') {
        this.$refs.bannerForm.validate(async(isOk) => {
          if (isOk) {
            const { message, success } = await updateBannerAPI(this.bannerForm)

            if (success) {
              this.$message.success('编辑成功')

              this.getAllBannerAPI()
              // 初始化
              this.format()
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
    // 图片表单失去焦点触发
    imageBlur(val) {
      this.banner = val
    },
    // 文件超出
    exceed() {
      this.$message.error('最多只能上传一张轮播图')
    },
    // 文件发生变化
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item)
    },
    // 上传图片之前校验一下
    beforeUpload(file) {
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
            this.banner = 'http://' + data.Location
            this.bannerForm.image = this.banner
          }
        }
      )
    },
    // 图片预览
    preview() {
      this.dialogVisible = true
    },
    // 重选图片
    delBanner() {
      this.banner = ''
      this.fileList = []
      this.bannerForm.image = ''
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

::v-deep .el-tabs--top {
  padding: 50px;
  background-color: #fff !important;
}

.el-upload {
  width: 100%;
}
.upload-demo {
  margin-top: 10px;
  width: 100%;
}
.el-upload__tip {
  margin-top: -10px;
  height: 30px;
}
::v-deep .el-upload {
  width: 100%;
}
::v-deep .el-upload .el-upload-dragger {
  width: 100%;
}
::v-deep .el-textarea textarea {
  height: 70px;
}

// 滚动条的宽度
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}
// 滚动条的滑块
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #eee;
  border-radius: 3px;
}

// 进度条
::v-deep .el-progress-bar {
  padding-right: 50px;
  margin-right: -50px;
}

.banner {
  position: relative;

  img {
    width: 100%;
    margin-top: 10px;
    border-radius: 5px;
    vertical-align: middle;
  }

  .function {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    width: 58%;
    opacity: 0;
    transition: all 0.3s;
    z-index: 999;

    i {
      color: #fff;
      font-size: 30px;
      margin: 0 20px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        color: #727cf5;
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 96%;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s;
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
  }

  &:hover .function {
    opacity: 1;
  }
}

::v-deep .el-dialog__body {
  padding: 20px 20px;
}

.imageUrl {
  transition: all 0.3s;
}
.imageUrl:hover {
  color: #727cf5;
}

::v-deep .el-table .cell {
  display: -webkit-box !important;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

::v-deep .el-table__fixed-right {
  height: 100% !important;
}
</style>
