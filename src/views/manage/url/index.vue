<template>
  <div class="content">
    <div class="list">
      <div v-for="(item,index) in list" :key="index" class="item">
        <img :src="item.image" alt="">
        <h4 style="color: #444">{{ item.name }}</h4>
        <span class="mailbox">{{ item.mailbox }}</span>
        <p>{{ item.description }}</p>

        <!-- 操作 -->
        <div class="operate">
          <i class="el-icon-edit-outline" />
          <i class="el-icon-delete" />
        </div>
      </div>

      <!-- 添加友联 -->
      <div class="item" @click="add">
        <i class="el-icon-plus" />
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="DialogVisible" width="30%">
      <el-form ref="link" :model="link" :rules="linkVerify" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="link.name" />
        </el-form-item>

        <el-form-item label="链接" prop="url">
          <el-input v-model="link.url" />
        </el-form-item>

        <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model="link.mailbox" />
        </el-form-item>

        <el-form-item label="图标" prop="image">
          <el-input v-model="link.image" />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="link.description" />
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
      list: [
        {
          name: '全栈梦想家',
          image: 'http://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640',
          mailbox: 'liuyuyang1o24@163.com',
          description: '记录一个架构师的诞生'
        },
        {
          name: '小孙同学',
          image: 'https://sunguoqi.com/images/avatar.jpg',
          mailbox: '无邮箱',
          description: '一个理性的浪漫主义者！'
        },
        {
          name: 'Mlldxe s Blog',
          image: 'https://yy.liveout.cn/photo/mlldxe.jpg',
          mailbox: '无邮箱',
          description: '一个不学无术的伪程序猿'
        },
        {
          name: 'Grape',
          image:
            'http://vgrape.com/wp-content/uploads/2021/11/1636502736844.jpg',
          mailbox: 'liuyuyang1o24@163.com',
          description: '一位正在考研的朋友'
        },
        {
          name: '贰猹的小窝',
          image: 'https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg',
          mailbox: '无邮箱',
          description: '用这生命中的每一秒，给自己一个不后悔的未来'
        },
        {
          name: '安知鱼 `Blog',
          image:
            'https://image.anzhiy.cn/adminuploads/1/2022/09/15/63232b7d91d22.jpg',
          mailbox: '无邮箱',
          description: '生活明朗，万物可爱'
        }
      ],
      title: '新增友联',
      DialogVisible: false,
      // 友联
      link: {
        name: '',
        mark: '',
        level: '',
        description: ''
      },
      // 友联校验
      linkVerify: {
        name: [
          { required: true, message: '友联名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '友联名称长度在 1 ~ 10 个字符',
            trigger: 'blur'
          }
        ],
        url: [
          { required: true, message: '友联链接不能为空' },
          { min: 1, max: 50, message: '友联链接长度在 1 ~ 50 个字符' }
        ],
        mailbox: [
          { required: true, message: '友联邮箱不能为空' },
          { min: 1, max: 50, message: '友联邮箱长度在 1 ~ 50 个字符' }
        ],
        image: [{ required: true, message: '友联图标不能为空' }],
        description: [
          { required: true, message: '友联描述不能为空' },
          { min: 1, max: 50, message: '友联描述长度在 1 ~ 50 个字符' }
        ]
      }
    }
  },
  methods: {
    add() {
      this.DialogVisible = true
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
    width: 1110px;
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

// 提示框标题背景
::v-deep .el-dialog__header {
  background-color: #727cf5;
  padding-bottom: 17px;
}
::v-deep .el-dialog__title {
  color: #fff !important;
}
::v-deep .el-dialog__body {
  padding: 30px 40px 0px 10px;
}
::v-deep .el-dialog__headerbtn .el-dialog__close{
  color: #fff;
}
</style>
