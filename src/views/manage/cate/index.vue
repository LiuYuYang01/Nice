<template>
  <div class="content">
    <el-row style="margin-bottom: 20px" type="flex" justify="space-between" align="middle">
      <el-col :span="12">
        <h3 style="margin:0">分类管理</h3>
      </el-col>

      <el-col :span="12" style="text-align: end; margin-right: 90px">
        <el-button type="primary" size="mini">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 分类列表 -->
    <el-tree :data="cateData" :props="defaultProps" default-expand-all>
      <template slot-scope="{ data }">
        <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
          <el-col>
            <span>{{ data.label }}</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex">
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown size="small" @command="operate">
                  <span>操作 <i class="el-icon-arrow-down" /></span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="add">新增</el-dropdown-item>
                    <el-dropdown-item command="emit">编辑</el-dropdown-item>
                    <el-dropdown-item command="del">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-tree>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%">
      <el-form ref="cate" :model="cate" :rules="cateVerify" label-width="80px">
        <el-form-item label="分类" prop="name">
          <el-input v-model="cate.name" />
        </el-form-item>

        <el-form-item label="标记" prop="mark">
          <el-input v-model="cate.mark" />
        </el-form-item>

        <el-form-item label="级别" prop="level">
          <el-select v-model="cate.level" placeholder="请选择指定的分类" style="width:100%">
            <el-option v-for="(item, index) in cateList" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="cate.description" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateData: [
        {
          label: '大前端',
          children: [
            {
              label: 'HTML'
            },
            {
              label: 'CSS'
            },
            {
              label: 'JavaScript'
            }
          ]
        },
        {
          label: '前端框架',
          children: [
            {
              label: 'Vue'
            },
            {
              label: 'React'
            },
            {
              label: 'Angular'
            },
            {
              label: 'Node'
            }
          ]
        },
        {
          label: '生活随笔'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      title: '新增分类',
      DialogVisible: false,
      // 分类信息
      cate: {
        name: '',
        mark: '',
        level: '',
        description: ''
      },
      // 分类校验
      cateVerify: {
        name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '分类名称长度在 1 到 15 个字符',
            trigger: 'blur'
          }
        ],
        mark: [
          { required: true, message: '分类标记不能为空' },
          { min: 1, max: 10, message: '分类标记长度在 1 ~ 10 个字符' }
        ],
        level: [{ required: true, message: '分类级别不能为空' }],
        description: [
          { required: true, message: '分类描述不能为空' },
          { min: 1, max: 50, message: '分类描述长度在 1 ~ 50 个字符' }
        ]
      },
      // 分类列表
      cateList: [
        { name: '根节点' },
        { name: '大前端' },
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'JavaScript' },
        { name: '前端框架' },
        { name: 'Vue' },
        { name: 'React' },
        { name: 'Angular' },
        { name: 'Node' },
        { name: '生活随笔' }
      ]
    }
  },
  methods: {
    // 操作
    operate(type) {
      if (type === 'add') {
        this.DialogVisible = true
      }
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
::v-deep .el-dialog__headerbtn .el-dialog__close{
  color: #fff;
}
</style>
