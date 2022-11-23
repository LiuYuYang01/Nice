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

            <!-- 上传轮播图 -->
            <el-upload class="upload-demo" drag action="#" :http-request="upload" multiple>
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
              <div slot="tip" class="el-upload__tip">只能上传jpg / png文件，且不超过 <b>500kb</b></div>
            </el-upload>
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
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      // 多选框
      multipleSelection: []
    }
  },
  methods: {
    // 表单提交
    onSubmit() {
      console.log('submit!')
    },
    toggleSelection(rows) {
      console.log(rows)
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 获取被选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 上传轮播图
    upload(file) {
      console.log(file, 22)
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
</style>
