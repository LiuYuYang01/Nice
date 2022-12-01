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

      <el-tab-pane name="essay">
        <span slot="label"><i class="el-icon-s-grid" /> 文章列表</span>

        <!-- 用户列表信息 -->
        <el-table :data="essayData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="title" label="标题" align="center" width="400">
            <template slot-scope="{row}">
              <a href="#/write" class="hoverTitle">{{ row.title }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="author" label="作者" align="center" sortable width="180" />

          <el-table-column prop="cate" label="分类" align="center" sortable width="180" />

          <el-table-column prop="date" label="发布日期" align="center" sortable width="300">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{row}">
              <el-row type="flex" justify="center">
                <!-- 为什么点击编辑跳转到编辑页，然后再回退到之前的页面就会报错？ -->
                <!-- 为什么点击编辑跳转到编辑页，然后再回退到之前的页面就会报错？ -->
                <!-- 为什么点击编辑跳转到编辑页，然后再回退到之前的页面就会报错？ -->
                <el-button type="text" size="small" @click="$router.push('/write')">编辑</el-button>
                <el-button type="text" size="small" style="color:#F56C6C" @click="del(row.id)">删除</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" justify="end" style="margin-top:40px">
          <el-pagination background layout="prev, pager, next" :total="1000" />
        </el-row>
      </el-tab-pane>

      <el-tab-pane name="audit">
        <span slot="label">
          <i class="el-icon-c-scale-to-original" /> 待审核
          <el-badge value="1" />
        </span>

        <span>待审核</span>
      </el-tab-pane>

      <el-tab-pane name="draft">
        <span slot="label">
          <i class="el-icon-receiving" /> 草稿箱
          <el-badge value="3" />
        </span>

        <span>草稿箱</span>
      </el-tab-pane>

      <el-tab-pane name="reclaim">
        <span slot="label">
          <i class="el-icon-delete" /> 回收站
        </span>

        <span>回收站</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      essayData: [
        {
          id: 1,
          title: '尤雨溪回应：Vite 真的比 Turbopack 慢 10 倍吗？',
          author: '晨曦时梦见兮',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 2,
          title: '程序员需不需要懂业务、懂市场？2022掘金未来大会前瞻',
          author: '稀土君',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 3,
          title: 'Web3.0对前端很友好？',
          author: 'hawleyHuo',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 4,
          title: 'Flutter 工程化框架选择 — add-to-app 的指路明灯',
          author: '恋猫de小郭',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 5,
          title: '“无架构”和“MVP”都救不了业务代码，MVVM能力挽狂澜？（一）',
          author: '唐子玄',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 6,
          title: '前端JS手写编程题库，终于开源了 Github',
          author: 'sunny',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 7,
          title: 'Nest.js进阶系列五： Node.js中使用Redis原来这么简单',
          author: 'ikoala',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 8,
          title: 'Java 面试题：ArrayList 可以完全替代数组吗？',
          author: '彭旭锐',
          cate: 'Java',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 9,
          title: 'React 之 Refs 的使用和 forwardRef 的源码解读',
          author: '冴羽',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        },
        {
          id: 10,
          title: '全栈开发—Vue+Element+Koa 实战发布平台CRUD！',
          author: '井柏然',
          cate: '大前端',
          date: 'Fri Nov 03 2022 22:03:31 GMT+0800 (中国标准时间)'
        }
      ],
      DialogVisible: false,
      activeName: 'essay'
    }
  },
  methods: {
    del(id) {
      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.essayData.filter((item, index) => {
            if (item.id === id) this.essayData.splice(index, 1)
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
</style>
