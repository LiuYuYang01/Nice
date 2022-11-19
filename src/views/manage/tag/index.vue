<template>
  <div class="content">
    <h3 class="title">标签管理</h3>
    <el-row type="flex" justify="space-between">
      <el-col :span="9">
        <!-- 添加标签 -->
        <el-form ref="tag" :model="tagForm" :rules="tagVerify" label-width="80px" style="margin-top:15px">
          <el-form-item label="标签" prop="name">
            <el-input v-model="tagForm.name" />
          </el-form-item>

          <el-form-item label="标识" prop="mark">
            <el-input v-model="tagForm.mark" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tableData" style="width: 100%;margin: 50px 0 0 30px;">
          <el-table-column label="ID" width="50" prop="id" />
          <el-table-column label="标签" width="100" prop="title" align="center" />
          <el-table-column label="标识" width="100" prop="mark" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <el-button size="mini" @click="emit(row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 标签列表 -->
      <el-col :span="12">
        <div id="tagsList" ref="tagsList">
          <a v-for="(item,index) in arr" :key="index" href="#" :title="item.title">{{ item.title }}</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图设置
      tagForm: {
        name: '',
        mark: ''
      },
      tagVerify: {
        name: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '标签名称限制为1 ~ 10 个字符', trigger: 'blur' }
        ],
        mark: [
          { required: true, message: '标签标识不能为空', trigger: 'blur' },
          { min: 1, max: 10, message: '标签标识限制为1 ~ 10 个字符', trigger: 'blur' }
        ]
      },
      arr: [
        { title: '大前端' },
        { title: '大前端' },
        { title: '大前端' },
        { title: '大前端' }
      ],
      tableData: [
        {
          id: 1,
          title: '大前端',
          mark: 'dqd'
        },
        {
          id: 1,
          title: '大前端',
          mark: 'dqd'
        },
        {
          id: 1,
          title: '大前端',
          mark: 'dqd'
        },
        {
          id: 1,
          title: '大前端',
          mark: 'dqd'
        },
        {
          id: 1,
          title: '大前端',
          mark: 'dqd'
        }
      ]
    }
  },
  mounted() {
    const { tagsList } = require('./tags')
    tagsList(this.$refs.tagsList)
  },
  methods: {
    // 表单提交
    onSubmit() {
      console.log('submit!')
    },
    // 编辑标签
    emit(id) {
      console.log(id)
    },
    // 删除标签
    del(id) {
      console.log(id)
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

// 3D标签栏
#tagsList {
  position: relative;
  top: 45%;
  width: 100%;
  margin: 0 auto;

  a {
    position: absolute;
    top: 0px;
    left: 0px;
    font-family: Microsoft YaHei;
    color: #727cf5;
    font-weight: bold;
    text-decoration: none;
    padding: 3px 6px;

    &:hover {
      color: #727cf5;
      letter-spacing: 2px;
    }
  }
}
</style>
