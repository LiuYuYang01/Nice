<template>
  <div class="content">
    <h3 class="title text-gradient">标签管理</h3>
    <el-row type="flex" justify="space-between">
      <el-col :span="9">
        <!-- 新增标签 -->
        <el-form ref="tag" v-loading="tag_loading" :model="tagForm" :rules="tagVerify" label-width="80px" style="margin-top:15px">
          <el-form-item label="标签" prop="title">
            <el-input v-model="tagForm.title" />
          </el-form-item>

          <el-form-item label="标识" prop="mark">
            <el-input v-model="tagForm.mark" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="btnOk">{{ operate }}</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tagList" style="width: 100%; margin: 50px 0 0 30px;">
          <el-table-column label="ID" width="50" prop="id" />
          <el-table-column label="标签" width="100" prop="title" align="center" />
          <el-table-column label="标识" width="100" prop="mark" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button size="mini" @click="updateTagAPI(row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="delTagAPI(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin-top:20px">
          <el-pagination small layout="prev, pager, next" :total="50" />
        </el-row>
      </el-col>

      <!-- 标签列表 -->
      <el-col :span="12">
        <tags3D v-if="tagData.length" :tag-data="tagData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  addTagAPI,
  delTagAPI,
  updateTagAPI,
  getTagAPI,
  getAllTagAPI
} from '@/api/tag'
export default {
  data() {
    return {
      operate: '新增标签',
      tagForm: {
        title: '',
        mark: ''
      },
      tagVerify: {
        title: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '标签名称限制为1 ~ 10 个字符',
            trigger: 'blur'
          }
        ],
        mark: [
          { required: true, message: '标签标识不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '标签标识限制为1 ~ 10 个字符',
            trigger: 'blur'
          }
        ]
      },
      tagData: [],
      tagList: [],
      tag_loading: false
    }
  },
  mounted() {
    this.getAllTagAPI()
  },
  methods: {
    // 表单提交
    onSubmit() {
      console.log('submit!')
    },
    // 编辑标签
    async updateTagAPI(id) {
      this.tag_loading = true

      this.operate = '编辑标签'

      const { data, message, success } = await getTagAPI(id)
      if (success) {
        this.tagForm = data
        this.title = '新增标签'
      } else {
        this.$message.error(message)
      }

      this.tag_loading = false
    },
    // 删除标签
    async delTagAPI(id) {
      this.$confirm('你确定要删除该标签吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { message, success } = await delTagAPI({ id })

          if (success) {
            // 获取最新数据
            this.getAllTagAPI()
            this.$message.success('删除标签成功')
          } else {
            this.$message.error(message)
          }
        })
    },
    // 获取标签列表
    async getAllTagAPI() {
      this.tag_loading = true

      const { data, message, success } = await getAllTagAPI()

      if (success) {
        this.tagList = data
        this.tagData = data
      } else {
        this.$message.error(message)
      }

      this.tag_loading = false
    },
    // 提交
    async btnOk() {
      if (this.operate === '新增标签') {
        const { message, success } = await addTagAPI(this.tagForm)
        if (success) {
          // 编辑完成后清空内容
          this.tagForm = {
            title: '',
            mark: ''
          }

          // 获取最新数据
          this.getAllTagAPI()
          this.$message.success('新增标签成功')
        } else {
          this.$message.error(message)
        }

        this.$refs.tag.resetFields()
      } else if (this.operate === '编辑标签') {
        const { message, success } = await updateTagAPI(this.tagForm)
        if (success) {
          this.tagForm = {
            title: '',
            mark: ''
          }

          // 还原为新增状态
          this.operate = '新增标签'

          this.getAllTagAPI()

          this.$message.success('修改标签成功')
        } else {
          this.$message.error(message)
        }

        this.$refs.tag.resetFields()
      }
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
