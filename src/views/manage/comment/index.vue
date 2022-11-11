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
        <el-table ref="multipleTable" border :data="commentsData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="用户" width="130" align="center" show-overflow-tooltip />
          <el-table-column prop="mailbox" label="邮箱" width="200" align="center" show-overflow-tooltip />
          <el-table-column label="评论内容" width="300" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <a href="javascript:;" class="hoverTitle" @click="showContent(row.content)">{{ row.content }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="文章标题" width="250" align="center" show-overflow-tooltip />

          <el-table-column label="评论时间" width="200" align="center">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" style="color:#909399">回复</el-button>
              <el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" justify="end" style="margin-top:40px">
          <el-pagination background layout="prev, pager, next" :total="1000" />
        </el-row>
      </el-tab-pane>

      <el-tab-pane name="draft">
        <span slot="label">
          <i class="el-icon-c-scale-to-original" /> 待审核
          <el-badge value="2" />
        </span>

        <!-- 审核列表 -->
        <el-table ref="multipleTable" border :data="auditData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="用户" width="130" align="center" show-overflow-tooltip />
          <el-table-column prop="mailbox" label="邮箱" width="200" align="center" show-overflow-tooltip />
          <el-table-column prop="content" label="评论内容" width="300" align="center" show-overflow-tooltip />
          <el-table-column prop="title" label="文章标题" width="250" align="center" show-overflow-tooltip />

          <el-table-column label="评论时间" width="200" align="center">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template>
              <el-button type="text" size="small">通过</el-button>
              <el-button type="text" size="small" style="color:#49b984">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="评论详情" :visible.sync="commentsDialog" :show-close="false" width="20%">
      <el-row>
        <el-col :span="6" style="margin-bottom:20px;width:100%;line-height:20px">{{ commentsInfo }}</el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      // 评论列表
      commentsData: [
        {
          date: new Date(),
          name: 'Envov',
          mailbox: '3311118881@qq.com',
          content: '这个操作和在forEach中用break有点像',
          title: '阿里面试官：如何给所有的async函数添加try/catch？'
        },
        {
          date: new Date(),
          name: '昆吾kw',
          mailbox: '3311118881@qq.com',
          content: '学到了！',
          title: '阿里面试官：如何给所有的async函数添加try/catch？'
        },
        {
          date: new Date(),
          name: '孤寂无情',
          mailbox: '3311118881@qq.com',
          content: '你们都快去吧，这样子我的竞争者又少了很多',
          title: '为啥 JSON 之父要建议：退役 JavaScript'
        },
        {
          date: new Date(),
          name: '我啥也不懂',
          mailbox: '3311118881@qq.com',
          content: '都什么年代了，打开一个网站还这么麻烦',
          title: '都什么年代了，你居然还连不上GitHub？'
        },
        {
          date: new Date(),
          name: 'Z_Joker',
          mailbox: '3311118881@qq.com',
          content:
            'any application that can be written in JavaScript, will eventually be written in JavaScript.',
          title: '为啥 JSON 之父要建议：退役 JavaScript'
        },
        {
          date: new Date(),
          name: 'SuperMan一路',
          mailbox: '3311118881@qq.com',
          content:
            '我也三十，在大厂搬砖加班严重每天九点下班十点多到家，回家了没时间学习，基本就洗洗就躺下了。忙于工作，周末也想好好休息。',
          title: '三十岁前端的破冰尝试'
        },
        {
          date: new Date(),
          name: '搬砖侠',
          mailbox: '3311118881@qq.com',
          content: '同用golang，能协助大佬开发和维护不',
          title: '因为不想上班，我花了四个月的时间做了两款小程序'
        },
        {
          date: new Date(),
          name: '德鲁叔叔',
          mailbox: '3311118881@qq.com',
          content:
            '最近在尝试vite引入到webpack项目里只作为开发环境的HMR，而生产构建还是用webpack。可能需要做一些两者之间的兼容把',
          title: '我从 webpack 换到 vite，又换回了 webpack'
        },
        {
          date: new Date(),
          name: '亮亮亮亮亮亮',
          mailbox: '3311118881@qq.com',
          content: '厉害啊我的哥',
          title: '前端实现一个最近抖音很火的图片选择题特效'
        },
        {
          date: new Date(),
          name: 'nanning',
          mailbox: '3311118881@qq.com',
          content:
            '我1年的经验转行做不别的了，现在时隔多年还有机会转回来吗？31岁',
          title: '深飘4年小前端的困境与挣扎'
        }
      ],
      // 审核列表
      auditData: [
        {
          date: new Date(),
          name: '我啥也不懂',
          mailbox: '3311118881@qq.com',
          content: '都什么年代了，打开一个网站还这么麻烦',
          title: '都什么年代了，你居然还连不上GitHub？'
        },
        {
          date: new Date(),
          name: 'Z_Joker',
          mailbox: '3311118881@qq.com',
          content:
            'any application that can be written in JavaScript, will eventually be written in JavaScript.',
          title: '为啥 JSON 之父要建议：退役 JavaScript'
        }
      ],
      activeName: 'comments',
      // 评论详情框
      commentsDialog: false,
      // 评论信息
      commentsInfo: ''
    }
  },
  methods: {
    // 获取被复选框选中的~
    handleSelectionChange(e) {
      console.log(e)
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
  height: 8px; // 纵向滚动条 必写
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
  padding-bottom: 0px;
}

.hoverTitle:hover {
  color: #727cf5;
  transition: 0.3s;
}

::v-deep .el-dialog__body{
  padding: 20px 20px 0 !important;
}
::v-deep .el-dialog__title{
  font-size: 15px;
}
::v-deep .el-dialog__header {
    padding: 8px 20px 6px;
}
</style>
