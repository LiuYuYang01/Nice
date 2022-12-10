<template>
  <div class="content">
    <el-tabs v-model="activeName">
      <!-- 搜索 -->
      <el-row type="flex" justify="space-between">
        <el-row>
          <div />
        </el-row>

        <!-- 搜索框 -->
        <el-row>
          <el-input v-model="search" size="small" placeholder="请输入关键词" class="input-with-select" style="width:300px;margin-bottom:20px">
            <el-button slot="append" size="small" type="primary" icon="el-icon-search" class="searchButton" style="height:33px" />
          </el-input>
        </el-row>
      </el-row>

      <el-tab-pane name="comments">
        <span slot="label"><i class="el-icon-s-grid" /> 评论列表</span>

        <!-- 评论列表 -->
        <el-table ref="multipleTable" v-loading="loading" border :data="commentsData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="用户" width="130" align="center" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" width="200" align="center" show-overflow-tooltip />
          <el-table-column label="评论内容" width="300" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <a href="javascript:;" class="hoverTitle" @click="showContent(row.content)">{{ row.content }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="article" label="文章标题" width="250" align="center" show-overflow-tooltip />

          <el-table-column label="评论时间" width="200" align="center">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="emit(row.id)">编辑</el-button>
              <!-- <el-button type="text" size="small" style="color:#49b984">回复</el-button> -->
              <el-button type="text" size="small" style="color:#F56C6C" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" justify="space-between" style="margin-top:40px">
          <el-col>
            <el-dropdown trigger="click" @command="sift">
              <el-button size="mini">
                筛选<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

          <el-col :span="9">
            <el-pagination background layout="prev, pager, next" :total="100" />
          </el-col>
        </el-row>
      </el-tab-pane>

      <!-- 审核 -->
      <el-tab-pane name="draft">
        <span slot="label">
          <i class="el-icon-c-scale-to-original" /> 待审核
          <el-badge :value="auditData.length" />
        </span>

        <!-- 审核列表 -->
        <el-table ref="multipleTable" border :data="auditData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="用户" width="130" align="center" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" width="200" align="center" show-overflow-tooltip />
          <el-table-column label="评论内容" width="300" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <a href="javascript:;" class="hoverTitle" @click="showContent(row.content)">{{ row.content }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="article" label="文章标题" width="250" align="center" show-overflow-tooltip />

          <el-table-column label="评论时间" width="200" sortable align="center">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="pass(row.id)">通过</el-button>
              <!-- <el-button type="text" size="small" style="color:#49b984">回复</el-button> -->
              <el-button type="text" size="small" style="color:#F56C6C" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" justify="space-between" style="margin-top:40px">
          <el-col>
            <el-dropdown trigger="click" @command="sift">
              <el-button size="mini">
                筛选<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>

          <el-col :span="9">
            <el-pagination background layout="prev, pager, next" :total="100" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- 查看评论详情 -->
    <el-dialog title="评论详情" class="reviewDetails" :visible.sync="commentsDialog" :show-close="false" width="20%">
      <el-row>
        <el-col :span="6" style="margin-bottom:20px;width:100%;line-height:20px">{{ commentsInfo }}</el-col>
      </el-row>
    </el-dialog>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" @close="close">
      <el-form ref="comment" v-loading="dialogLoading" :model="commentForm" :rules="commentVerify" label-width="80px">
        <el-form-item label="用户" prop="name">
          <el-input v-model="commentForm.name" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="commentForm.email" />
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input v-model="commentForm.content" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="btnOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  delCommentAPI,
  updateCommentAPI,
  auditCommentAPI,
  batchDelCommentAPI,
  getCommentAPI,
  getAllCommentAPI
} from '@/api/comment'
export default {
  data() {
    return {
      search: '',
      activeName: 'comments',
      // 评论列表
      commentsData: [],
      // 审核列表
      auditData: [],
      DialogVisible: false,
      replyDialog: false,
      title: '',
      commentForm: {
        name: '',
        email: '',
        content: '',
        article: ''
      },
      // 评论校验
      commentVerify: {
        name: [
          { required: true, message: '评论者名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '评论者名称限制为 1 ~ 10 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '评论者邮箱不能为空' },
          { min: 1, max: 50, message: '评论者邮箱限制为 1 ~ 50 个字符' }
        ],
        content: [
          { required: true, message: '评论内容不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '评论内容限制为 1 ~ 100 个字符',
            trigger: 'blur'
          }
        ],
        article: [
          { required: true, message: '评论文章不能为空', trigger: 'blur' }
        ]
      },
      // 评论详情框
      commentsDialog: false,
      // 评论信息
      commentsInfo: '',
      loading: false,
      dialogLoading: false,
      // 选中的评论
      selectComment: []
    }
  },
  created() {
    this.getAllCommentAPI()
  },
  methods: {
    // 取消
    close() {
      // 重置数据
      this.commentForm = {
        name: '',
        email: '',
        content: '',
        article: ''
      }

      // 重置检验
      this.$refs.comment.resetFields()

      // 关闭弹出框
      this.DialogVisible = false
    },
    // 获取评论列表
    async getAllCommentAPI() {
      this.loading = true

      const { data, message, success } = await getAllCommentAPI()
      if (success) {
        // 评论列表
        const commentsData = []
        // 待审核
        const auditData = []

        // 过滤
        data.forEach((item) => {
          // 筛选出is_audit的状态，0代表待审核  1代表审核通过
          if (item.is_audit) {
            // 审核通过的评论
            commentsData.push(item)
          } else {
            // 待审核的评论
            auditData.push(item)
          }
        })

        this.commentsData = commentsData
        this.auditData = auditData
      } else {
        this.$message.error(message)
      }

      this.loading = false
    },
    // 通过评论
    async pass(id) {
      const { message, success } = await auditCommentAPI({ id, is_audit: 1 })

      if (success) {
        this.$message.success('该评论已通过审核')

        // 获取最新数据
        this.getAllCommentAPI()
      } else {
        this.$message.error(message)
      }
    },
    // 删除评论
    async del(id) {
      this.$confirm('你确定要删除该评论吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { message, success } = await delCommentAPI({ id })

          if (success) {
            this.$message.success('删除成功')

            // 获取最新数据
            this.getAllCommentAPI()
          } else {
            this.$message.error(message)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 评论回显
    async emit(id) {
      this.dialogLoading = true

      this.title = '编辑评论'
      this.DialogVisible = true

      const { data, message, success } = await getCommentAPI(id)

      if (success) {
        this.commentForm = data
      } else {
        this.$message.error(message)
      }

      this.dialogLoading = false
    },
    // 提交按钮
    async btnOk() {
      // 修改评论
      const { message, success } = await updateCommentAPI({
        ...this.commentForm,
        is_audit: 1
      })

      if (success) {
        this.$message.success('修改评论成功')

        // 获取最新数据
        this.getAllCommentAPI()
        // 初始化
        this.close()
      } else {
        this.$message.error(message)
      }
    },
    // 获取被复选框选中的评论
    handleSelectionChange(arr) {
      this.selectComment = arr.map((item) => item.id)
    },
    // 筛选
    async sift(type) {
      if (type === 'del') {
        this.$confirm('你确定要删除这些评论吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            const { message, success } = await batchDelCommentAPI({
              ids: this.selectComment.join(',')
            })
            if (success) {
              this.$message.success('批量删除成功')

              this.getAllCommentAPI()
            } else {
              this.$message.error(message)
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 弹出评论详情
    showContent(info) {
      this.commentsInfo = info
      this.commentsDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 50px 100px;
  padding: 50px !important;
}

/* 内容居中 */
.el-table__body td {
  text-align: center;
}

// 表格滚动条
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}
// 滚动条的滑块
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

.el-switch {
  width: 120px;
}

::v-deep .el-table__fixed-right {
  height: 100% !important;
}

// 搜索按钮
.searchButton {
  color: #fff !important;
  background-color: #727cf5 !important;
  border: 1px solid #727cf5 !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

::v-deep .el-input__inner {
  width: 100% !important;
}

::v-deep .el-dialog__body {
  padding-bottom: 0px;
}

.hoverTitle:hover {
  color: #727cf5;
  transition: 0.3s;
}

::v-deep .reviewDetails .el-dialog__body {
  padding: 20px 20px 0 !important;
}
::v-deep .reviewDetails .el-dialog__header {
  padding: 8px 20px 6px;
}
::v-deep .reviewDetails .el-dialog__title {
  font-size: 15px;
}

::v-deep .el-button+.el-button{
  margin-left: 20px;
}
</style>
