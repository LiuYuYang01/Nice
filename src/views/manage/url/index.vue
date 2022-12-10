<template>
  <div class="content">
    <div class="list">
      <div v-for="item in linkList" :key="item.id" class="item">
        <a :href="item.url" target="_blank">
          <img v-image="require('@/assets/Nice/icon2.jpg')" :src="item.icon" alt="">
          <h4>{{ item.title }}</h4>
          <span class="mailbox">{{ item.email }}</span>
          <p>{{ item.description }}</p>
        </a>

        <!-- 操作 -->
        <div class="operate">
          <i class="el-icon-edit-outline" @click="updateLinkAPI(item.id)" />
          <i class="el-icon-delete" @click="delLinkAPI(item.id)" />
        </div>
      </div>

      <!-- 新增友联 -->
      <div class="item" @click="add">
        <i class="el-icon-plus" />
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%" @close="close">
      <el-form ref="link" v-loading="loading" :model="linkForm" :rules="linkVerify" label-width="80px">
        <el-form-item label="名称" prop="title">
          <el-input v-model="linkForm.title" />
        </el-form-item>

        <el-form-item label="链接" prop="url">
          <el-input v-model="linkForm.url" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="linkForm.email" />
        </el-form-item>

        <el-form-item label="图标" prop="icon">
          <el-input v-model="linkForm.icon" />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="linkForm.description" />
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
import { addLinkAPI, delLinkAPI, updateLinkAPI, getLinkAPI, getAllLinkAPI } from '@/api/link'
export default {
  data() {
    return {
      loading: false,
      linkList: [],
      title: '',
      DialogVisible: false,
      // 友联
      linkForm: {
        title: '',
        url: '',
        email: '',
        icon: '',
        description: ''
      },
      // 友联校验
      linkVerify: {
        title: [
          { required: true, message: '友联名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '友联名称限制为 1 ~ 10 个字符',
            trigger: 'blur'
          }
        ],
        url: [
          { required: true, message: '友联链接不能为空' },
          { min: 1, max: 50, message: '友联链接限制为 1 ~ 50 个字符' }
        ],
        email: [
          { required: true, message: '友联邮箱不能为空' },
          { min: 1, max: 50, message: '友联邮箱限制为 1 ~ 50 个字符' }
        ],
        icon: [{ required: true, message: '友联图标不能为空' }],
        description: [
          { required: true, message: '友联描述不能为空' },
          { min: 1, max: 50, message: '友联描述限制为 1 ~ 50 个字符' }
        ]
      }
    }
  },
  created() {
    this.getAllLinkAPI()
  },
  methods: {
    // 取消
    close() {
      // 重置数据
      this.linkForm = {
        title: '',
        url: '',
        email: '',
        icon: '',
        description: ''
      }

      // 重置检验
      this.$refs.link.resetFields()

      // 关闭弹出框
      this.DialogVisible = false
    },
    // 获取友联列表
    async getAllLinkAPI() {
      const { data, message, success } = await getAllLinkAPI()
      if (success) {
        this.linkList = data
      } else {
        this.$message.error(message)
      }
    },
    // 新增
    add() {
      this.title = '新增友联'
      this.DialogVisible = true
    },
    // 修改友联
    async updateLinkAPI(id) {
      this.loading = true

      this.title = '编辑友联'
      this.DialogVisible = true

      const { data, message, success } = await getLinkAPI(id)
      if (success) {
        this.linkForm = data
      } else {
        this.$message.error(message)
      }

      this.loading = false
    },
    // 删除友联
    async delLinkAPI(id) {
      this.$confirm('你确定要删除该友联吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { message, success } = await delLinkAPI({ id })

          if (success) {
            // 获取最新数据
            this.getAllLinkAPI()
            this.$message.success('删除友联成功')
          } else {
            this.$message.error(message)
          }
        })
    },
    // 提交
    async btnOk() {
      // 新增友联
      if (this.title === '新增友联') {
        const { message, success } = await addLinkAPI(this.linkForm)
        if (success) {
          this.$message.success('新增友联成功')
          // 初始化
          this.close()
          // 获取最新数据
          this.getAllLinkAPI()
        } else {
          this.$message.error(message)
        }
      } else if (this.title === '编辑友联') {
        // 编辑友联
        const { message, success } = await updateLinkAPI(this.linkForm)
        if (success) {
          this.$message.success('编辑友联成功')
          this.close()
          this.getAllLinkAPI()
        } else {
          this.$message.error(message)
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

  // 友联列表
  .list {
    overflow: hidden;
    // width: 1110px;
    margin: 0 auto;

    .item {
      overflow: hidden;
      position: relative;
      float: left;
      width: 200px;
      min-height: 280px;
      padding: 20px;
      padding-bottom: 10px;
      margin: 5px 20px 15px 5px;
      border-radius: 5px;
      box-shadow: 0 1px 4px rgb(121 122 243 / 20%);
      text-align: center;

      .mailbox {
        font-size: 13px;
        color: #666;
      }

      a {
        display: inline-block;
        height: 200px;
      }

      p {
        color: #333;
        font-size: 15px;
        font-family: "黑体";
        // 超出省略
        display: -webkit-box !important;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }

      h4 {
        margin: 10px 0;
        color: #444;
        transition: all 0.3s;
      }

      img {
        position: relative;
        width: 50%;
        border-radius: 50%;
        z-index: 1;
      }

      .operate {
        position: absolute;
        bottom: 15px;
        right: 20px;
        font-size: 20px;

        i {
          margin-left: 20px;
          cursor: pointer;

          &:nth-child(1) {
            color: #727cf5;
          }

          &:nth-child(2) {
            color: #f56c6c;
          }
        }
      }

      &:hover h4 {
        color: #727cf5;
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: #727cf5;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
      }

      &:nth-child(5n) {
        margin-right: 0;
      }

      // 最后一个样式单独设置
      &:last-child::after {
        display: none;
      }
      &:last-child {
        font-size: 50px;
        line-height: 230px;
        color: #e2e2e2;
        transition: all 0.3s;
        cursor: pointer;
      }
      &:last-child:hover {
        color: #727cf5;
      }
    }
  }
}
</style>
