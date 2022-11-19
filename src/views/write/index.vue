<template>
  <div class="content">
    <h3>发布笔记</h3>

    <!-- 编辑区 -->
    <el-row type="flex" justify="space-between">
      <!-- 编辑器 -->
      <el-col :span="17">
        <el-input v-model="title" placeholder="给这篇文章定义个标题吧！" prefix-icon="el-icon-edit" style="margin-bottom:20px" />
        <v-md-editor v-model="text" height="600px" mode="edit" />
      </el-col>

      <!-- 发布 -->
      <el-col :span="5">
        <div class="sidebar">
          <!-- 分类列表 -->
          <div class="cate">
            <h4 class="title">分类列表</h4>
            <el-tree v-loading="cateLoading" :data="cateList" show-checkbox :props="defaultProps" style="padding:0 20px" @check-change="handleNodeClick" />
          </div>

          <!-- 时间设置 -->
          <div class="timeSet">
            <h4 class="title">发布时间</h4>
            <el-row type="flex" justify="center">
              <el-date-picker v-model="timeDate" type="datetime" placeholder="选择日期时间" default-time="12:00:00" size="small" />
            </el-row>
          </div>

          <!-- 标签列表 -->
          <div class="timeSet" style="padding-bottom: 15px">
            <h4 class="title">标签栏</h4>

            <!-- 添加标签 -->
            <el-row>
              <el-col>
                <!-- <el-autocomplete v-model="tagValut" size="mini" class="inline-input" placeholder="添加标签" @keyup.enter.native="addTags" /> -->
                <el-input v-model="tagValut" size="mini" placeholder="添加标签" @keyup.enter.native="addTags" />
              </el-col>
            </el-row>

            <!-- 列表 -->
            <el-row type="flex" justify="center">
              <div class="tag" style="padding:0 20px">
                <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="dark" size="mini">
                  {{ item.label }}
                </el-tag>
              </div>
            </el-row>
          </div>

          <!-- 扩展设置 -->
          <div class="extendSet">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="扩展设置" icon="el-icon-menu">
                <el-row>
                  <el-col>
                    <label>
                      <span>公开：</span>
                      <el-switch v-model="options.public" active-color="#727cf5" inactive-color="#d7d7d7" />
                    </label>
                  </el-col>

                  <el-col>
                    <label>
                      <span>隐藏：</span>
                      <el-switch v-model="options.hidden" active-color="#727cf5" inactive-color="#d7d7d7" />
                    </label>
                  </el-col>

                  <el-col>
                    <label>
                      <span>加密：</span>
                      <el-switch v-model="options.password" active-color="#727cf5" inactive-color="#d7d7d7" />
                    </label>
                  </el-col>

                  <el-col>
                    <label>
                      <span>目录：</span>
                      <el-switch v-model="options.directory" active-color="#727cf5" inactive-color="#d7d7d7" />
                    </label>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </div>

          <!-- 发布文章 -->
          <div class="publish">
            <div @click="isOk">发布文章</div>
            <div>保存为草稿</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 预览组件 -->
    <!-- <v-md-preview-html :html="html" preview-class="vuepress-markdown-body" /> -->
  </div>
</template>

<script>
import { getAllCateAPI } from '@/api/cate'
import { transListToTreeData } from '@/utils'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'
export default {
  name: 'Write',
  data() {
    return {
      title: '',
      text: '',
      html: '',
      cateLoading: false,
      cateList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      timeDate: '',
      options: {
        public: true,
        hidden: false,
        password: false,
        directory: false
      },
      items: [],
      tags: [],
      tagValut: '',
      // el-collapse设置是否默认展开
      activeNames: ['unfold']
    }
  },
  // 渲染tabs标签列表
  mounted() {
    this.getAllCateAPI()
    this.restaurants = this.loadAll()
  },
  methods: {
    async getAllCateAPI() {
      this.cateLoading = true

      const { data } = await getAllCateAPI()
      this.cateList = transListToTreeData(data, 0)

      this.cateLoading = false
      console.log(this.cateList)
    },
    // 找出被勾选的分类
    handleNodeClick(val) {
      console.log(val)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    // 所有标签
    loadAll() {
      return [
        { value: '大前端' },
        { value: 'HTML' },
        { value: 'CSS' },
        { value: 'JavaScript' },
        { value: 'Vue' },
        { value: 'React' },
        { value: 'Angular' },
        { value: 'Nodejs' }
      ]
    },
    // 按下回车添加标签
    addTags() {
      // 添加标签
      const add = (type) => {
        this.items.push({ type, label: this.tagValut })
        this.tagValut = ''
      }

      if (this.items.length === 0) {
        add('')
      } else if (this.items.length === 1) {
        add('success')
      } else if (this.items.length === 2) {
        add('warning')
      } else if (this.items.length === 3) {
        add('danger')
      } else if (this.items.length === 4) {
        add('info')
      } else if (this.items.length === 5) {
        this.$message.error('最多只能添加5个标签~')
      }
    },
    // 发布文章
    isOk() {
      // 将 MarkDown 语法解析为 html
      const html = xss.process(
        VueMarkdownEditor.themeConfig.markdownParser.render(this.text)
      )

      this.html = html
      console.log(this.html)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 100px;
  background-color: #f9f9f9;
  box-shadow: none;
}
// 侧边栏
.sidebar {
  // 分类
  .cate {
    overflow: hidden;
    padding-bottom: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    .title {
      height: 50px;
      line-height: 50px;
      margin: 0 0 15px 0;
      color: #fff;
      background-color: #727cf5;
      text-align: center;
    }
  }
  // 时间
  .timeSet {
    overflow: hidden;
    padding-bottom: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    .title {
      height: 50px;
      line-height: 50px;
      margin: 0 0 5px 20px;
      color: #333;
    }
  }
  // 发布
  .publish {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    div {
      width: 48%;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      color: #fff;
      background-color: #8688f4;
      text-align: center;
      transition: all 0.3s;
      cursor: pointer;

      &:nth-child(1) {
        background-color: #4fb985;
      }

      &:nth-child(1):hover {
        background-color: #7ec6a3;
      }

      &:nth-child(2):hover {
        background-color: #a0a2f7;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 30px;
      border-radius: 50px;
      background-color: #fff;
    }
  }
}

::v-deep .el-collapse {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

::v-deep .el-collapse-item__header {
  font-size: 16px;
  padding-left: 20px;
  font-weight: 900;
}

::v-deep .el-collapse-item__wrap {
  border: none !important;
}

::v-deep .el-collapse-item__wrap {
  margin-top: -2px;
}

.extendSet {
  .el-col-24 {
    margin: 10px 20px;
  }
}

::v-deep .el-collapse-item__content {
  padding-bottom: 15px;
}

.el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

::v-deep .el-input--mini .el-input__inner {
  width: 225px;
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
