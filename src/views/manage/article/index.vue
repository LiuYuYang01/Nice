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

      <!-- 等我有时间了再回头把这里改成组件优化一下结构 ^_^ -->

      <!-- 文章列表 -->
      <el-tab-pane name="article">
        <span slot="label">
          <i class="el-icon-s-grid" /> 文章列表
        </span>

        <!-- 文章列表 -->
        <el-table v-loading="loading" :data="articleForm.list" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="title" label="标题" align="center" width="400">
            <template slot-scope="{row}">
              <a :href="jump(row.id)" class="hoverTitle">{{ row.title }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="author" label="作者" align="center" width="180" />

          <el-table-column prop="cates" label="分类" align="center" width="180" :formatter="filterCates" />

          <el-table-column prop="date" label="发布日期" align="center" sortable width="300">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{row}">
              <el-row type="flex" justify="center">
                <!-- 为什么点击编辑跳转到编辑页，然后再回退到之前的页面就会报错？ -->
                <el-button type="text" size="small" @click="$router.push(`/write?id=${row.id}`)">编辑</el-button>
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

      <!-- 待审核文章 -->
      <el-tab-pane name="audit">
        <span slot="label">
          <i class="el-icon-c-scale-to-original" /> 待审核
          <el-badge :value="articleForm.audit.length" />
        </span>

        <!-- 审核列表 -->
        <el-table v-loading="loading" :data="articleForm.audit" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="title" label="标题" align="center" width="400">
            <template slot-scope="{row}">
              <a :href="jump(row.id)" class="hoverTitle">{{ row.title }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="author" label="作者" align="center" sortable width="180" />

          <el-table-column prop="cates" label="分类" align="center" width="180" :formatter="filterCates" />

          <el-table-column prop="date" label="发布日期" align="center" sortable width="300">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{row}">
              <el-row type="flex" justify="center">
                <el-button type="text" size="small" @click="pass(row.id)">通过</el-button>
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

      <!-- 草稿箱 -->
      <el-tab-pane name="draft">
        <span slot="label">
          <i class="el-icon-receiving" /> 草稿箱
          <el-badge :value="articleForm.draftBin.length" />
        </span>

        <!-- 文章列表 -->
        <el-table v-loading="loading" :data="articleForm.draftBin" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="title" label="标题" align="center" width="400">
            <template slot-scope="{row}">
              <a :href="jump(row.id)" class="hoverTitle">{{ row.title }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="author" label="作者" align="center" sortable width="180" />

          <el-table-column prop="cates" label="分类" align="center" width="180" :formatter="filterCates" />

          <el-table-column prop="date" label="发布日期" align="center" sortable width="300">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{row}">
              <el-row type="flex" justify="center">
                <el-button type="text" size="small" @click="$router.push(`/write?id=${row.id}`)">编辑</el-button>
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

      <!-- 回收站 -->
      <el-tab-pane name="reclaim">
        <span slot="label">
          <i class="el-icon-delete" /> 回收站
        </span>

        <!-- 文章列表 -->
        <el-table v-loading="loading" :data="articleForm.recycleBin" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column prop="title" label="标题" align="center" width="400">
            <template slot-scope="{row}">
              <a :href="jump(row.id)" class="hoverTitle">{{ row.title }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="author" label="作者" align="center" sortable width="180" />

          <el-table-column prop="cates" label="分类" align="center" width="180" :formatter="filterCates" />

          <el-table-column prop="date" label="发布日期" align="center" sortable width="300">
            <template slot-scope="{row}">{{ row.date | dateFormat }}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="{row}">
              <el-row type="flex" justify="center">
                <el-button type="text" size="small" @click="recover(row.id)">恢复</el-button>
                <el-button type="text" size="small" style="color:#F56C6C" @click="forceDel(row.id)">删除</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" justify="end" style="margin-top:40px">
          <el-pagination background layout="prev, pager, next" :total="1000" />
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { delArticleAPI, getAllArticleAPI } from '@/api/article'
import { getAllCateAPI } from '@/api/cate'
import { customAPI } from '@/api/senior'
export default {
  data() {
    return {
      search: '',
      articleForm: {
        list: [], // 正常文章
        audit: [], // 待审核文章
        draftBin: [], // 草稿箱文章
        recycleBin: [] // 回收站文章
      },
      cates: [], // 分类列表
      activeName: 'article',
      loading: false
    }
  },
  created() {
    this.get()
    this.getCate()
  },
  methods: {
    // 获取文章列表
    async get() {
      this.loading = true

      const list = []
      const audit = []
      const draftBin = []
      const recycleBin = []

      const { data, message, success } = await getAllArticleAPI()
      if (success) {
        // 筛选文章
        // item.is_audit = 0 代表待审核文章
        // item.is_audit = 1 代表审核通过文章

        // item.is_draft = 0 代表正常文章
        // item.is_draft = 1 代表草稿文章

        // item.is_delete = 0 代表正常文章
        // item.is_delete = 1 代表回收站文章
        data.filter((item) => {
          // 如果没有被删除并且审核成功而且不是草稿就正常显示文章
          if (item.is_delete === 0 && item.is_audit === 1 && item.is_draft === 0) {
            list.push(item)
          }

          // 筛选待审核的文章
          if (item.is_audit === 0) {
            audit.push(item)
          }

          // 筛选草稿箱的文章
          if (item.is_draft === 1) {
            draftBin.push(item)
          }

          // 筛选回收站的文章
          if (item.is_delete === 1) {
            recycleBin.push(item)
          }
        })

        this.articleForm.list = list
        this.articleForm.audit = audit
        this.articleForm.draftBin = draftBin
        this.articleForm.recycleBin = recycleBin
      } else {
        this.$message.error(message)
      }

      this.loading = false
    },
    // 获取分类列表
    async getCate() {
      const { data, message, success } = await getAllCateAPI()
      if (success) {
        this.cates = data
      } else {
        this.$message.error(message)
      }
    },
    // 过滤分类
    filterCates(row, col, val) {
      const ids = val.split(',')
      const catesList = []

      // 通过分类id筛选出对应的分类名称
      ids.filter(id => {
        const item = this.cates.filter(item => String(item.id) === id)
        item && catesList.push(...item)
      })

      if (catesList.length !== 0) {
        const cate = []
        catesList.filter(item => {
          cate.push(item.title)
        })

        return cate.join('，')
      }

      return '未指定分类'
    },
    // 删除文章
    del(id) {
      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          console.log(id)
          const { message, success } = await delArticleAPI({ id })
          if (success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            // 获取最新数据
            this.get()
          } else {
            this.$message({
              type: 'error',
              message
            })
          }
        })
    },
    // 通过审核
    async pass(id) {
      const sql = `update articles set is_audit = 1 where id = ${id}`
      const { message, success } = await customAPI({ sql })

      if (success) {
        this.$message.success('审核成功')
        this.get()
      } else {
        this.$message.error(message)
      }
    },
    // 恢复文章
    async recover(id) {
      const sql = `update articles set is_delete = 0 where id = ${id}`
      const { message, success } = await customAPI({ sql })

      if (success) {
        this.$message.success('恢复成功')
        this.get()
      } else {
        this.$message.error(message)
      }
    },
    // 强制删除
    async forceDel(id) {
      this.$confirm('删除后将无可逆转，你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const sql = `delete from articles where id = ${id}`
          const { message, success } = await customAPI({ sql })

          if (success) {
            this.$message.success('删除成功')
            this.get()
          } else {
            this.$message.error(message)
          }
        })
    },
    // 跳转到编辑页
    jump(id) {
      return `#/write?id=${id}`
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
