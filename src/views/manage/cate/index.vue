<template>
  <div class="content">
    <el-row style="margin-bottom: 20px" type="flex" justify="space-between" align="middle">
      <el-col :span="12">
        <h3 style="margin:0">分类管理</h3>
      </el-col>

      <el-col :span="12" style="text-align: end; margin-right: 90px">
        <el-button type="primary" size="mini" @click="addCate">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 分类列表 -->
    <el-tree v-loading="loading" :data="cateData" :props="defaultProps" default-expand-all>
      <template slot-scope="{ data }">
        <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
          <el-col>
            <span>{{ data.title }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex">
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown size="small" @command="choose">
                  <span>操作 <i class="el-icon-arrow-down" /></span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="operate(data.id,'add')">新增</el-dropdown-item>
                    <el-dropdown-item :command="operate(data.id,'emit')">编辑</el-dropdown-item>
                    <el-dropdown-item :command="operate(data.id,'del')">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-tree>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" @close="close">
      <el-form ref="cate" :model="cateForm" :rules="cateVerify" label-width="80px">
        <el-form-item label="分类" prop="title">
          <el-input v-model="cateForm.title" />
        </el-form-item>

        <el-form-item label="标识" prop="mark">
          <el-input v-model="cateForm.mark" />
        </el-form-item>

        <el-form-item label="级别" prop="pid">
          <el-select v-model="cateForm.pid" placeholder="请选择指定的分类" style="width:100%">
            <el-option v-for="(item, index) in cateList" :key="index" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="cateForm.description" />
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
  getAllCateAPI,
  getCateAPI,
  addCateAPI,
  delCateAPI,
  updateCateAPI
} from '@/api/cate'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      cateData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      loading: false,
      title: '新增分类',
      DialogVisible: false,
      // 分类信息
      cateForm: {
        title: '',
        mark: '',
        pid: '',
        description: ''
      },
      // 分类校验
      cateVerify: {
        title: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '分类名称限制为 1 ~ 10 个字符',
            trigger: 'blur'
          }
        ],
        mark: [
          { required: true, message: '分类标识不能为空' },
          { min: 1, max: 10, message: '分类标识限制为 1 ~ 10 个字符' }
        ],
        pid: [{ required: true, message: '分类级别不能为空' }],
        description: [
          { required: true, message: '分类描述不能为空' },
          { min: 1, max: 50, message: '分类描述限制为 1 ~ 50 个字符' }
        ]
      },
      // 分类列表
      cateList: []
    }
  },
  created() {
    this.getAllCateAPI()
  },
  methods: {
    // 取消
    close() {
      // 重置数据
      this.cateForm = {
        title: '',
        mark: '',
        pid: '',
        description: ''
      }

      // 重置检验
      this.$refs.cate.resetFields()

      // 关闭弹出框
      this.DialogVisible = false
    },
    // 操作
    operate(id, type) {
      return {
        id: id,
        type: type
      }
    },
    // 选择
    choose({ id, type }) {
      // 点击哪个获取哪个的id
      this.cateForm.pid = id

      if (type === 'add') {
        this.title = '新增子分类'
        this.DialogVisible = true
      } else if (type === 'emit') {
        this.title = '编辑分类'
        this.DialogVisible = true

        // 编辑分类
        this.updateCateAPI(id)
      } else if (type === 'del') {
        // 删除分类
        this.delCateAPI(id)
      }
    },
    // 新增根分类
    addCate() {
      this.title = '新增分类'
      this.DialogVisible = true

      this.cateForm.pid = 0
    },
    // 获取全部分类列表
    async getAllCateAPI() {
      this.loading = true

      const { data, success } = await getAllCateAPI()

      if (success) {
        // 将数据转换为树形结构  分类列表
        this.cateData = transListToTreeData(data, 0)

        this.cateList = [{ title: '根节点', id: 0, pid: 0 }, ...data]
      }

      this.loading = false
    },
    // 删除分类
    async delCateAPI(id) {
      const { message, success } = await delCateAPI({ id })

      if (success) {
        this.$message.success('删除分类成功')

        // 获取最新数据
        this.getAllCateAPI()
      } else {
        this.$message.error(message)
      }
    },
    // 编辑回显分类数据
    async updateCateAPI(id) {
      const { data, message, success } = await getCateAPI(id)

      if (success) {
        this.cateForm = data
      } else {
        this.$message.error(message)
      }
    },
    // 确定按钮
    async btnOk() {
      if (this.title === '新增分类' || this.title === '新增子分类') {
        // 新增分类
        const { message, success } = await addCateAPI(this.cateForm)

        if (success) {
          this.$message.success('新增分类成功')

          // 获取最新数据
          this.getAllCateAPI()
        } else {
          this.$message.error(message)
        }
      } else if (this.title === '编辑分类') {
        // 编辑分类
        const { message, success } = await updateCateAPI(this.cateForm)
        if (success) {
          this.$message.success('编辑分类成功')

          // 获取最新数据
          this.getAllCateAPI()
        } else {
          this.$message.error(message)
        }
      }

      // 关闭弹框 重置数据
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin: 50px 100px;
  padding: 50px 130px !important;
}

::v-deep .el-tree > .is-focusable > .el-tree-node__content > span:nth-child(1) {
  color: #727cf5;
}

::v-deep
  .el-tree
  > .is-focusable
  > .el-tree-node__content
  > .el-row--flex
  > .el-col-24
  > span {
  color: #727cf5;
  font-size: 15px;
}
::v-deep .el-tree-node__content:hover {
  background-color: #f9f9fa;
}

::v-deep .el-tree > .is-focusable .el-col-24 {
  font-size: 14px;
}

// 提示框标题背景
::v-deep .el-dialog__header {
  background-color: #727cf5;
  padding-bottom: 17px;
}

::v-deep .el-dialog__title {
  color: #fff !important;
}

::v-deep .el-dialog__body {
  padding: 30px 40px 0px 0;
}
::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>
