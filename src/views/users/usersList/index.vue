<template>
  <div class="content">
    <!-- 搜索 -->
    <el-row type="flex" justify="space-between">
      <!-- 添加用户 -->
      <el-row>
        <el-button type="primary" size="small" @click="addUser">添加用户</el-button>
      </el-row>

      <!-- 搜索框 -->
      <el-row>
        <el-input v-model="search" size="small" placeholder="请输入需要查询的用户相关信息" class="input-with-select" style="width:300px;margin-bottom:20px">
          <el-button slot="append" size="small" type="primary" icon="el-icon-search" class="searchButton" style="height:33px" />
        </el-input>
      </el-row>
    </el-row>

    <!-- 用户列表信息 -->
    <el-table v-loading="loading" :data="userData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="id" label="ID" align="center" sortable width="100" />

      <el-table-column prop="avatar" label="头像" align="center" width="100">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" :src="scope.row.avatar | imageNull" />
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" align="center" width="180" />

      <!-- <el-table-column prop="identity" label="身份" align="center" width="180" :formatter="identityFilter" /> -->

      <el-table-column prop="nickname" label="名称" align="center" width="180" />

      <el-table-column prop="email" label="邮箱" align="center" sortable width="180" />

      <el-table-column prop="state" label="状态" align="center" sortable width="150">
        <template slot-scope="{row}">
          <el-row>
            <!-- {{ row }} -->
            <el-switch v-model="row.state" active-text="off" inactive-text="on" style="width: 105px;justify-content:space-between" />
          </el-row>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="创建日期" align="center" sortable width="180">
        <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="{row}">
          <el-row type="flex" justify="center">
            <el-button type="text" size="small" @click="handleClick(row)">查看</el-button>
            <el-button type="text" size="small" @click="updateUser(row.id)">编辑</el-button>
            <el-button type="text" size="small" style="color:#F56C6C" @click="delUser(row.id)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex" justify="end" style="margin-top:40px">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </el-row>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" :before-close="close">
      <el-form ref="user" :model="usersForm" :rules="usersVerify" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="usersForm.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="usersForm.password" type="password" />
        </el-form-item>

        <!-- <el-form-item label="身份" prop="identity">
          <el-select v-model="usersForm.identity" placeholder="请选择用户的身份" style="width:100%">
            <el-option label="用户" value="用户" />
            <el-option label="作者" value="作者" />
            <el-option label="管理员" value="管理员" />
          </el-select>
        </el-form-item> -->

        <el-form-item label="名称" prop="nickname">
          <el-input v-model="usersForm.nickname" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="usersForm.email" />
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
  getAllUsersAPI,
  getUsersAPI,
  addUsersAPI,
  delUsersAPI,
  updateUsersAPI
} from '@/api/user'
export default {
  data() {
    return {
      search: '',
      userData: [],
      title: '新增用户',
      DialogVisible: false,
      // 用户信息
      usersForm: {
        username: '',
        password: '',
        // identity: '',
        nickname: '',
        email: '',
        date: ''
      },
      // 用户校验
      usersVerify: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '用户名限制为 6 到 16 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 30,
            message: '用户密码限制为 6 到 30 个字符',
            trigger: 'blur'
          }
        ],
        nickname: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '用户名称限制为 1 ~ 10 个字符' }
        ],
        email: [
          { required: true, message: '用户邮箱不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '用户邮箱限制为 1 ~ 50 个字符' }
        ]
      },
      loading: false,
      // 用户身份组
      identity: [
        {
          id: 1,
          name: '超级管理员'
        },
        {
          id: 2,
          name: '作者'
        },
        {
          id: 3,
          name: '用户'
        },
        {
          id: 4,
          name: '游客'
        }
      ]
    }
  },
  created() {
    this.getAllUsersAPI()
  },
  methods: {
    // 取消
    close() {
      // 重置数据
      this.usersForm = {
        username: '',
        password: '',
        identity: '',
        nickname: '',
        email: ''
      }

      // 重置检验
      this.$refs.user.resetFields()

      // 关闭弹出框
      this.DialogVisible = false
    },
    // 获取全部数据
    async getAllUsersAPI() {
      this.loading = true

      const { data, success } = await getAllUsersAPI()

      if (success) {
        this.userData = data
      }

      this.loading = false
    },
    // 新增用户
    addUser() {
      this.DialogVisible = true
    },
    // 删除用户
    delUser(id) {
      this.$confirm('你确定要删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { message, success } = await delUsersAPI({ id })
          if (success) {
            this.$message.success(message)

            // 获取最新数据
            this.getAllUsersAPI()
          } else {
            this.$message.error(message)
          }
        })
    },
    // 编辑用户
    async updateUser(id) {
      const { data, success, message } = await getUsersAPI(id)

      if (success) {
        this.title = '修改用户'
        this.DialogVisible = true
        this.usersForm = data
      } else {
        this.$message.error(message)
      }
    },
    // 确定
    btnOk() {
      this.$refs.user.validate(async(isOk) => {
        if (isOk) {
          if (this.title === '新增用户') {
            // 创建时间
            this.usersForm.dateCreated = new Date()

            const { message, success } = await addUsersAPI(this.usersForm)

            if (success) {
              this.$message.success(message)
              // 关闭弹框 并 清空数据 && 校验
              this.close()
              // 获取最新数据
              this.getAllUsersAPI()
            } else {
              this.$message.error(message)
            }
          } else if (this.title === '修改用户') {
            console.log(2)
            const { message, success } = await updateUsersAPI(this.usersForm)
            if (success) {
              this.$message.success('修改用户成功')
              this.close()
              this.getAllUsersAPI()
            } else {
              this.$message.error(message)
            }
          }
        }
      })
    },
    // 过滤用户身份
    identityFilter({ identity }) {
      for (const key in this.identity) {
        const id = this.identity[key].id
        if (id === identity) {
          return this.identity[key].name
        }
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

// 提示框标题背景
::v-deep .el-dialog__header {
  background-color: #727cf5;
  padding-bottom: 17px;
}

::v-deep .el-dialog__title {
  color: #fff !important;
}

::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #fff !important;
}

::v-deep .el-input__inner {
  width: 100% !important;
}

::v-deep .el-dialog__body {
  padding: 30px 40px 0px 10px;
}
</style>
