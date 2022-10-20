<template>
  <div class="content">
    <!-- 搜索 -->
    <el-row type="flex" justify="space-between">
      <!-- 添加用户 -->
      <el-row>
        <el-button type="primary" size="small">添加用户</el-button>
      </el-row>

      <!-- 搜索框 -->
      <el-row>
        <el-input v-model="search" placeholder="请输入需要查询的用户相关信息" class="input-with-select" style="width:400px;margin-bottom:20px">
          <el-button slot="append" type="primary" icon="el-icon-search" class="searchButton" />
        </el-input>
      </el-row>
    </el-row>

    <!-- 用户列表信息 -->
    <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column prop="id" label="ID" align="center" sortable width="100" />

      <el-table-column prop="avatar" label="头像" align="center" width="100">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="40" :src="scope.row.avatar" />
        </template>
      </el-table-column>

      <el-table-column prop="user" label="用户名" align="center" width="180" />

      <el-table-column prop="identity" label="身份" align="center" width="180" />

      <el-table-column prop="nickname" label="名称" align="center" width="180" />

      <el-table-column prop="mailbox" label="邮箱" align="center" sortable width="180" />

      <el-table-column prop="state" label="状态" align="center" sortable width="150">
        <template slot-scope="scope">
          <el-row>
            <el-switch v-model="scope.row.state" active-text="off" inactive-text="on" style="width: 105px;justify-content:space-between" />
          </el-row>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="创建日期" align="center" sortable width="180" />

      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-row type="flex" justify="center">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color:#F56C6C">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row type="flex" justify="end" style="margin-top:20px">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      tableData: [
        {
          id: 1,
          user: 'admin',
          identity: '管理员',
          nickname: 'Liu 宇阳',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=3311118881&spec=100',
          state: false,
          date: '2022-10-19-16:30'
        },
        {
          id: 2,
          user: '13777777777',
          identity: '作者',
          nickname: '我爱学习',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=2500798479&spec=100',
          state: true,
          date: '2022-10-19-16:30'
        },
        {
          id: 3,
          user: '17788888888',
          identity: '用户',
          nickname: '知识改变命运',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=326198943&spec=100',
          state: false,
          date: '2022-10-19-16:30'
        },
        {
          id: 4,
          user: '19755555555',
          identity: '用户',
          nickname: '学无止境',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=792734338&spec=100',
          state: true,
          date: '2022-10-19-16:30'
        },
        {
          id: 5,
          user: '15555555555',
          identity: '用户',
          nickname: '学习使我快乐',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=2622259725&spec=100',
          state: false,
          date: '2022-10-19-16:30'
        },
        {
          id: 6,
          user: '13777777777',
          identity: '作者',
          nickname: '我爱学习',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=2500798479&spec=100',
          state: true,
          date: '2022-10-19-16:30'
        },
        {
          id: 7,
          user: '17788888888',
          identity: '用户',
          nickname: '知识改变命运',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=326198943&spec=100',
          state: false,
          date: '2022-10-19-16:30'
        },
        {
          id: 8,
          user: '19755555555',
          identity: '用户',
          nickname: '学无止境',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=792734338&spec=100',
          state: true,
          date: '2022-10-19-16:30'
        },
        {
          id: 9,
          user: '15555555555',
          identity: '用户',
          nickname: '学习使我快乐',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=2622259725&spec=100',
          state: false,
          date: '2022-10-19-16:30'
        },
        {
          id: 10,
          user: '19755555555',
          identity: '用户',
          nickname: '学无止境',
          mailbox: 'liuyuyang1o24@163.com',
          avatar: 'http://q2.qlogo.cn/headimg_dl?dst_uin=792734338&spec=100',
          state: true,
          date: '2022-10-19-16:30'
        }
      ]
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
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
</style>
