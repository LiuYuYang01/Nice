<template>
  <div class="content">
    <el-card class="box-card welcome">
      <div class="userImage">
        <img :src="userInfo && userInfo.avatar || require('@/assets/Nice/icon1.jpg')" alt="">
      </div>

      <div class="info">
        <h2 class="title text-gradient">Hello {{ userInfo && userInfo.nickname || '帅哥、美女' }} ! 欢迎使用 Nice 后台管理系统 </h2>
        <p><i class="el-icon-edit" /> {{ userInfo && userInfo.signature || '也许将会是最强的后台管理系统' }}</p>
      </div>
    </el-card>

    <!-- 可视化图表 -->
    <el-row class="chart" type="flex" justify="space-between">
      <!-- 今日访问量 -->
      <el-col :span="6">
        <h3>今日访问量</h3>
        <visits />
      </el-col>

      <!-- 新增用户 -->
      <el-col :span="6">
        <h3>今日新增用户</h3>
        <user />
      </el-col>

      <!-- 待办 -->
      <el-col :span="6">
        <h3>今日待办</h3>
        <!-- 待办 -->
        <div class="toBeDone">
          <div class="item" @click="$router.push('manage/comment?activeName=audit')">
            <span>待审评论</span>
            <h4>53</h4>
          </div>

          <div class="item" @click="$router.push('manage/article?activeName=audit')">
            <span>待审文章</span>
            <h4>16</h4>
          </div>

          <div class="item">
            <span>待审帖子</span>
            <h4>25</h4>
          </div>

          <div class="item">
            <span>待审用户</span>
            <h4>9</h4>
          </div>
        </div>
      </el-col>

      <!-- 项目介绍 -->
      <el-col :span="6">
        <h3>项目介绍</h3>
        <p class="message">
          <span style="color:#727cf5">Nice</span> 是一款新一代的后台管理系统🎉
          <br>
          我们一直坚持以极致的交互带给你不一样的体验，复杂的功能留给我们，简单的体验留给用户🪄
        </p>
      </el-col>
    </el-row>

    <!-- 功能栏 -->
    <el-row class="function" type="flex" justify="space-between" style="margin-top:20px">
      <!-- 任务 -->
      <el-col :span="6">
        <div class="toDo">
          <!-- 头部 -->
          <div class="head">
            <div class="title">任务栏</div>
            <div class="count">
              <span>已完成：<b style="color:#49b984">{{ finish_ok }}</b></span>
              <span>剩余：<b style="color:#F56C6C">{{ finish_no }}</b></span>
              <span>总：<b style="color:#727cf5">{{ count }}</b></span>
            </div>
          </div>

          <!-- 主体内容 -->
          <div class="list">
            <el-checkbox-group v-model="selectList">
              <el-row class="box">
                <el-col v-for="item in toDoList" :key="item.id">
                  <el-checkbox :label="item.id" :checked="item.state === 1 ? true : false" @change="checked=>checkRow(checked, item)">
                    <span slot-scope :class="{is_select: item.state}">{{ item.label }}</span>
                  </el-checkbox>
                  <i class="el-icon-close remove" />
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>

          <div class="add">
            <el-input v-model="addTask" class="addTask" placeholder="添加任务~" @keyup.enter.native="add" />
            <el-button type="primary" icon="el-icon-check" class="addBtn" @click="add" />
          </div>
        </div>
      </el-col>

      <!-- 评论 -->
      <el-col :span="6">
        <div class="comments">
          <!-- 头部 -->
          <div class="head">
            <div class="title">留言框</div>
          </div>

          <!-- 评论列表 -->
          <div class="list">
            <div v-for="item in commentsList" :key="item.id" class="item">
              <!-- 头像 -->
              <div class="avatar">
                <img :src="item.avatar" alt="">
              </div>

              <!-- 评论者 -->
              <div class="info">
                <div>{{ item.name }}</div>
                <p>{{ item.content }}</p>
              </div>

              <!-- 回复 -->
              <div class="reply">答</div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="image">
          <img :src="require('@/assets/svg/programming.svg')" alt="">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import visits from './visits'
import user from './user'
import { getUser } from '@/utils/auth'
export default {
  name: 'Home',
  components: {
    visits,
    user
  },
  data() {
    return {
      // 用户信息
      userInfo: {},
      // 任务列表
      toDoList: [
        {
          id: 1,
          label: '系统在线更新~',
          state: 0
        },
        {
          id: 2,
          label: '插件、主题应用中心',
          state: 1
        },
        {
          id: 3,
          label: '素材库功能',
          state: 0
        },
        {
          id: 4,
          label: '测试？？',
          state: 0
        },
        {
          id: 5,
          label: '创建组件页面',
          state: 1
        },
        {
          id: 6,
          label: '创建新版本',
          state: 0
        },
        {
          id: 7,
          label: '呵呵！！看起来很酷',
          state: 0
        },
        {
          id: 8,
          label: '构建基于js的应用程序',
          state: 0
        },
        {
          id: 9,
          label: '设计单页主题',
          state: 0
        },
        {
          id: 10,
          label: '测试',
          state: 0
        }
      ],
      // 评论列表
      commentsList: [
        {
          id: 1,
          avatar:
            'https://tse1-mm.cn.bing.net/th/id/OIP-C.MUDE7y9t66yfwUzmFdvNzAAAAA?pid=ImgDet&rs=1',
          name: 'Choresefree',
          content: '我正在做前后端分离，up主的前端太棒了'
        },
        {
          id: 2,
          avatar:
            'https://tse2-mm.cn.bing.net/th/id/OIP-C.SVy-ppvufEvqufbuOmxmuAAAAA?w=204&h=204&c=7&r=0&o=5&dpr=1.5&pid=1.7',
          name: '偷马的斗帝',
          content: '很不错的项目，很纯净，而且还开源'
        },
        {
          id: 3,
          avatar:
            'https://tse1-mm.cn.bing.net/th/id/OIP-C.N381qrfBc_hXIEadt_nq3gAAAA?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7',
          name: '夏隽',
          content: '插眼等完善'
        }
      ],
      // 被选中的
      selectList: [],
      addTask: '',
      finish_ok: 0, // 已完成
      finish_no: 0, // 未完成
      count: 0 // 总任务数量
    }
  },
  watch: {
    // 统计任务
    toDoList: {
      handler() {
        const finish_ok = []
        this.toDoList.filter((item) => {
          // 0代表未完成  1代表已完成
          if (item.state) {
            finish_ok.push(item.state)
          }
        })

        // 总数
        this.count = this.toDoList.length
        // 已完成
        this.finish_ok = finish_ok.length
        // 未完成
        this.finish_no = this.count - finish_ok.length
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.userInfo = getUser() && JSON.parse(getUser())
  },
  methods: {
    add() {
      console.log(this.selectList)
    },
    // 点击勾选按钮 完成当前任务
    checkRow(val, { id }) {
      const item = this.toDoList.find((item) => item.id === id)
      if (item.state) {
        item.state = 0
      } else {
        item.state = 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: static;
  width: 100%;
  padding: 25px 50px;
  padding-top: 40px;
  background-color: #f9f9f9;

  .welcome ::v-deep {
    margin-bottom: 20px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

    .el-card__body {
      display: flex;
      align-items: center;
    }

    .userImage {
      overflow: hidden;
      width: 100px;
      height: 100px;
      margin-right: 30px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      .title {
        margin: 0;
        // margin-bottom: 30px;
      }

      p {
        margin: 0;
        margin-top: 15px;
        color: #888;
      }
    }
  }

  // 可视化图表
  .chart {
    h3 {
      margin: 0;
      color: #333;
    }
    .el-col {
      width: 24.1%;
      height: 250px;
      border-radius: 3px;
      background-color: #fff;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

      h3 {
        position: relative;
        top: 30px;
        left: 30px;
      }

      .toBeDone {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        height: 170px;
        margin-top: 50px;

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 43%;
          margin: 0 10px 10px 0;
          text-align: center;
          background-color: #f8f8f8;
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            background: #f2f3fe;
          }

          &:nth-of-type(2n) {
            margin-right: 0;
          }

          span {
            font-size: 13px;
            color: #333;
            margin-bottom: 10px;
          }

          h4 {
            margin: 0;
            font-size: 25px;
            color: #727cf5;
            transition: all 0.3s;

            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }

      .message {
        margin: 40px 30px;
        margin-bottom: 0;
        line-height: 35px;
        font-size: 15px;
        color: #333;
      }
    }
  }

  // 功能
  .function {
    .el-col-6,
    .el-col-12 {
      overflow: hidden;
      width: 24%;
      height: 400px;
      padding: 30px;
      border-radius: 3px;
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    }

    .el-col-12 {
      width: 49.3%;
    }

    // 标题
    .title {
      color: #333;
      font-weight: 900;
      font-size: 20px;
    }

    // 任务
    .toDo {
      position: relative;
      width: 100%;

      // 头部
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        // 统计
        .count {
          span {
            margin-left: 10px;
            color: #666;
            font-size: 12px;
          }

          b {
            font-size: 14px;
          }
        }
      }

      // 主体内容
      .list {
        .box {
          overflow: overlay;
          height: 240px;

          .el-col {
            overflow: hidden;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            line-height: 40px;

            &:hover .remove {
              right: 20px;
            }

            // 删除
            .remove {
              position: absolute;
              right: -60px;
              width: 15px;
              height: 14px;
              line-height: 15px;
              border-radius: 5px;
              color: #fff;
              background-color: #f56c6c;
              font-size: 12px;
              text-align: center;
              transition: all 0.3s;
              cursor: pointer;
            }
          }
        }
      }

      // 添加
      .add {
        position: absolute;
        bottom: -60px;
        display: flex;
        justify-content: space-between;
        width: 100%;

        // 添加按钮
        .addBtn {
          width: 50px;
          height: 40px;
          padding: 12px;
          padding-right: 6px;
        }
      }
    }

    // 消息
    .comments {
      .head {
        margin-bottom: 25px;
      }

      .list {
        overflow: overlay;
        height: 300px;

        .item {
          overflow: hidden;
          display: flex;
          align-items: center;
          padding-bottom: 15px;
          margin-top: 15px;
          border-bottom: 1px solid #f7f4f4;

          .avatar {
            overflow: hidden;
            min-width: 35px;
            min-height: 35px;
            width: 35px;
            height: 35px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .info {
            width: 80%;
            margin-left: 15px;

            div {
              font-size: 14px;
              font-weight: 700;
              color: #555;
            }

            p {
              width: 85%;
              margin: 0;
              margin-top: 5px;
              font-size: 12px;
              color: #999;

              display: -webkit-box !important;
              overflow: hidden;
              word-break: break-all;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }

          .reply {
            width: 30px;
            height: 30px;
            line-height: 30px;
            margin-right: -30px;
            color: #727cf5;
            text-align: center;
            transition: all 0.3s;
            cursor: pointer;
          }

          &:hover .reply {
            margin-right: 10px;
          }
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            border-bottom: none;
          }
        }

        // 滚动条
        &::-webkit-scrollbar {
          width: 6px; // 横向滚动条
          height: 6px; // 纵向滚动条 必写
        }
        // 滚动条的滑块
        &::-webkit-scrollbar-thumb {
          background-color: #ddd;
          border-radius: 3px;
        }
      }
    }

    // 图片
    .image {
      background-color: #fff;
      text-align: center;

      img {
        width: 360px;
      }
    }
  }
}
// 任务名称
::v-deep .function .toDo .el-col .el-checkbox .el-checkbox__label {
  color: #333;
  padding-left: 7px;
}

// 选中任务的样式
::v-deep .function .toDo .el-col .is_select {
  color: #666;
  text-decoration: line-through;
}

// 滚动条
::v-deep .function .toDo .box::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}
// 滚动条的滑块
::v-deep .function .toDo .box::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

// 输入框
::v-deep .function .toDo .addTask .el-input__inner {
  margin-left: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
