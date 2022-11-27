<template>
  <div class="content">
    <h3 class="title text-gradient">轮播图管理</h3>
    <el-row>
      <el-col :span="9">
        <!-- 添加轮播图 -->
        <el-form ref="form" :model="bannerConfig" label-width="80px" style="margin-top:15px">
          <el-form-item label="标题">
            <el-input v-model="bannerConfig.title" />
          </el-form-item>

          <el-form-item label="副标题">
            <el-input v-model="bannerConfig.deputyTitle" />
          </el-form-item>

          <el-form-item label="轮播图">
            <el-input v-model="bannerConfig.image" />

            <!-- 上传成功后显示刚刚上传的图片 -->
            <div v-if="banner.length === 0">
              <!-- 上传轮播图 -->
              <el-upload class="upload-demo" action="#" :http-request="upload" :file-list="fileList" :on-change="changeFile" :on-exceed="exceed" :before-upload="beforeUpload" :limit="1" drag>
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg / png文件，且不超过 <b>500kb</b></div>
              </el-upload>
              <el-progress v-if="is_percent" :percentage="percent" />
            </div>

            <!-- 图片 -->
            <div v-else class="banner">
              <img :src="banner" alt="" class="banner">

              <!-- 功能 -->
              <div class="function">
                <i class="el-icon-view" @click="preview" />
                <i class="el-icon-download" />
                <i class="el-icon-delete" />
              </div>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="onSubmit">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="12" style="margin-left:120px">
        <!-- 轮播图列表 -->
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.time }}</template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="200" />
          <el-table-column prop="deputyTitle" width="300" label="副标题" />
          <el-table-column prop="image" width="400" label="轮播图" />
        </el-table>

        <!-- 操作 -->
        <el-row type="flex" justify="end" style="margin-top:20px">
          <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </el-row>
      </el-col>

      <!-- 图片预览 -->
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img width="100%" :src="banner" alt="">
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { dateFormat } from '@/filter'
export default {
  data() {
    return {
      cos: null,
      // 轮播图设置
      bannerConfig: {
        title: '',
        deputyTitle: '',
        image: ''
      },
      // 轮播图列表数据
      tableData: [
        {
          time: '2022-10-19',
          title: '追求理想与现实的平衡！',
          deputyTitle: 'Pursue the balance between ideal and reality!',
          image: 'http://liuyuyang.net/img/banner.jpg'
        },
        {
          time: '2022-10-18',
          title: '不断改善，成为最佳！',
          deputyTitle: 'Keep improving and become the best!',
          image: 'http://liuyuyang.net/img/banner.jpg'
        },
        {
          time: '2022-10-17',
          title: '前途未必光明坦荡，但一定充满渴望！',
          deputyTitle:
            'The future may not be bright and open, but it must be full of desire!',
          image: 'http://liuyuyang.net/img/banner.jpg'
        }
      ],
      fileList: [],
      // 多选框
      multipleSelection: [],
      // 进度条进度
      percent: 0,
      // 是否显示进度条
      is_percent: false,
      // 图片
      banner: '',
      // 图片预览
      dialogVisible: false
    }
  },
  mounted() {
    this.cos = new COS({
      SecretId: 'AKIDWwriLexHTjmbFvW0JQUbLt1LRJPK4a8X',
      SecretKey: 'IOUZaP3Tiy4GOPDoDQVu8BFVcWFn8HCS'
    })
  },
  methods: {
    // 表单提交
    onSubmit() {
      console.log('submit!')
    },
    // 获取被选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val
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
      const maxSize = 50 * 1024 * 1024
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
            this.bannerConfig.image = this.banner
          }
        }
      )
    },
    // 图片预览
    preview() {
      this.dialogVisible = true
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
</style>
