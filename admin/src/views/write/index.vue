<template>
  <div class="content">
    <h3 class="text-gradient">发布笔记</h3>

    <!-- 编辑区 -->
    <el-row type="flex" justify="space-between">
      <!-- 编辑器 -->
      <el-col :span="17">
        <el-input v-model="articleForm.title" placeholder="给这篇文章定义个标题吧！" prefix-icon="el-icon-edit" style="margin-bottom:20px" />
        <v-md-editor v-model="articleForm.content" height="600px" mode="edit" />

        <!-- 高级设置 -->
        <div class="pullDown" style="margin-top: 10px">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="高级设置" icon="el-icon-menu">
              <el-row>
                <el-col>
                  <div class="title">文章描述</div>
                  <el-input v-model="articleForm.description" type="textarea" :rows="2" placeholder="请输入文章描述1 ~ 100字" autosize />
                </el-col>

                <el-col>
                  <div class="title">文章封面</div>
                  <el-input v-model="articleForm.cover" placeholder="请输入内容" class="input-with-select">
                    <el-button slot="append" icon="el-icon-receiving" />
                  </el-input>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>

      <!-- 发布 -->
      <el-col :span="5">
        <div class="sidebar">
          <!-- 分类列表 -->
          <div class="cate">
            <h4 class="title">分类列表</h4>
            <el-tree
              ref="tree"
              v-loading="cateLoading"
              style="padding:0 20px"
              node-key="id"
              show-checkbox
              :data="cateList"
              :props="{children:'children',label:'title'}"
              :default-expanded-keys="[15]"
              :default-checked-keys="articleForm.cates.split(',')"
              @check-change="handleCheckChange"
            />
          </div>

          <!-- 时间设置 -->
          <div class="timeSet">
            <h4 class="title">发布时间</h4>
            <el-row type="flex" justify="center">
              <el-date-picker v-model="articleForm.date" type="datetime" placeholder="选择日期时间" default-time="12:00:00" size="small" value-format="yyyy-MM-dd HH:mm:ss" />
            </el-row>
          </div>

          <!-- 标签列表 -->
          <div class="timeSet" style="padding-bottom: 15px">
            <h4 class="title">标签栏</h4>

            <!-- 添加标签 -->
            <el-row style="margin: 0 25px 5px;">
              <el-col>
                <el-input size="small" placeholder="请输入内容" @click.native="addTag" />
              </el-col>
            </el-row>

            <!-- 列表 -->
            <el-row type="flex" justify="center">
              <div class="tag" style="padding: 5px 20px 0;">
                <el-tag v-for="item in tagsItems" :key="item.title" :type="item.type" effect="dark" size="mini">
                  {{ item.title }}
                </el-tag>
              </div>
            </el-row>
          </div>

          <!-- 扩展设置 -->
          <div class="pullDown">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="扩展设置" icon="el-icon-menu">
                <el-row>
                  <el-col>
                    <label>
                      <span>公开：</span>
                      <el-switch v-model="articleForm.is_public" active-color="#727cf5" inactive-color="#d7d7d7" :active-value="1" :inactive-value="0">/>
                      </el-switch>
                    </label>
                  </el-col>

                  <!-- <el-col>
                    <label>
                      <span>加密：</span>
                      <el-switch v-model="articleForm.password" active-color="#727cf5" inactive-color="#d7d7d7" />
                    </label>
                  </el-col> -->

                  <el-col>
                    <label>
                      <span>目录：</span>
                      <el-switch v-model="articleForm.is_catalog" active-color="#727cf5" inactive-color="#d7d7d7" :active-value="1" :inactive-value="0" />
                    </label>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </div>

          <!-- 发布文章 -->
          <div class="publish">
            <div @click="isOk">{{ publishORsave }}</div>
            <div @click="draft">保存为草稿</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 预览组件 -->
    <v-md-preview-html :html="html" preview-class="vuepress-markdown-body" style="margin-top:20px" />

    <!-- 标签选择框 -->
    <el-dialog title="选择标签" :visible.sync="dialogVisible" width="30%" class="tag" @close="close">
      <el-checkbox-group v-for="item in tagData" :key="item.id" v-model="tagSelect">
        <el-checkbox :label="item.id">{{ item.title }}</el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button size="small" type="primary" @click="selectTags">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCateAPI } from '@/api/cate'
import { addArticleAPI, updAtearticleAPI, getArticleAPI } from '@/api/article'
import { transListToTreeData } from '@/utils'
import { dateFormat } from '@/filter'
import { getAllTagAPI } from '@/api/tag'
// eslint-disable-next-line no-unused-vars
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'
export default {
  name: 'Write',
  data() {
    return {
      id: 0,
      html: '',
      cateLoading: false,
      cate: [],
      cateList: [],
      timeDate: '',
      articleForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        author: '刘宇阳', // 作者
        cover: '', // 文章封面
        description: '', // 文章描述
        cates: '', // 所在分类
        tags: '', // 所属标签
        is_public: 1, // 是否公开
        is_catalog: 0, // 是否开启目录
        is_draft: 0, // 是否草稿
        is_audit: 0, // 是否审核通过
        is_delete: 0, // 是否删除
        date: '' // 时间
      },
      publishORsave: '', // 发布或保存
      // el-collapse设置是否默认展开
      activeNames: ['unfold'],
      tagsItems: [], // 标签列表
      tagData: [], // 标签列表
      tagSelect: [], // 选中的标签
      dialogVisible: false // 标签选择框
    }
  },
  // 渲染tabs标签列表
  async mounted() {
    this.id = this.$route.query.id

    await this.getAllCateAPI()
    await this.getAllTagAPI()
    await this.echoData()

    if (this.id) {
      this.tagSelect = this.articleForm.tags.split(',').map(item => Number(item))
      this.selectTags()
    }
  },
  methods: {
    // 获取分类列表
    async getAllCateAPI() {
      this.cateLoading = true

      const { data } = await getAllCateAPI()

      this.cate = data
      this.cateList = transListToTreeData(data, 0)

      this.cateLoading = false
    },
    // 找出被勾选的分类
    handleCheckChange() {
      const res = this.$refs.tree.getCheckedNodes()
      const arr = []
      res.forEach((item) => {
        arr.push(item.id)
      })
      const menuArr = this.unique(arr) // 去除重复的节点

      this.articleForm.cates = menuArr.join(',')
    },
    // 数组去重
    unique(arr) {
      const newArr = []
      const len = arr.length
      for (let i = 0; i < len; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
          newArr.push(arr[i])
        }
      }
      return newArr
    },
    // 获取标签列表
    async getAllTagAPI() {
      const { data, message, success } = await getAllTagAPI()

      if (success) {
        this.tagData = data
      } else {
        this.$message.error(message)
      }
    },
    // 发布 | 编辑文章
    async isOk() {
      // 格式化时间
      this.articleForm.date = dateFormat(this.articleForm.date)

      // 有id就是编辑，无id就是发布文章
      if (this.id) {
        this.addORdraft(updAtearticleAPI, '编辑文章成功', 0)
      } else {
        this.addORdraft(addArticleAPI, '发布文章成功', 0)
      }

      // 将 MarkDown 语法解析为 html
      // const html = xss.process(
      //   VueMarkdownEditor.themeConfig.markdownParser.render(this.text)
      // )

      // this.html = html
      // console.log(this.html)
    },
    // 回显数据
    async echoData() {
      if (this.id) {
        this.publishORsave = '编辑文章'

        const { data, message, success } = await getArticleAPI(this.id)
        if (success) {
          this.articleForm = data
        } else {
          this.$message.error(message)
        }
      } else {
        this.publishORsave = '发布文章'
      }
    },
    // 保存为草稿
    draft() {
      if (this.id) {
        this.addORdraft(updAtearticleAPI, '保存为草稿成功', 1)
      } else {
        this.addORdraft(addArticleAPI, '保存为草稿成功', 1)
      }
    },
    // 发布文章或保存为草稿
    async addORdraft(API, msg, is_draft) {
      this.articleForm.is_draft = is_draft

      const { message, success } = await API(this.articleForm)

      if (success) {
        this.$router.push('/')
        this.$router.push(`/manage/article`)

        this.$message.success(msg)
      } else {
        this.$message.error(message)
      }
    },
    // 添加标签
    addTag() {
      this.tagSelect = this.tagsItems.map(item => item.id)

      this.dialogVisible = true
    },
    // 取消
    close() {
      this.tagSelect = []
      this.dialogVisible = false
    },
    // 提交
    selectTags() {
      const tags = []

      // 封装一个添加方法
      const add = (type, title, id) => tags.push({ type, title, id })

      // 添加标签
      this.tagData.forEach((item) => {
        if (this.tagSelect.includes(item.id)) {
          if (tags.length === 0) add('', item.title, item.id)
          else if (tags.length === 1) add('success', item.title, item.id)
          else if (tags.length === 2) add('warning', item.title, item.id)
          else if (tags.length === 3) add('danger', item.title, item.id)
          else if (tags.length === 4) add('info', item.title, item.id)
        }
      })

      this.tagsItems = tags

      this.articleForm.tags = this.tagSelect.join(',')

      this.dialogVisible = false
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
      background-color: #f9f9f9;
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

.pullDown {
  .el-col-24 {
    margin: 10px 20px;
  }
}

::v-deep .pullDown .el-textarea__inner {
  width: 95.5%;
  min-height: 80px !important;
  padding: 10px;
}

::v-deep .pullDown .el-input-group {
  width: 95.5%;
}

::v-deep .pullDown .title {
  font-size: 15px;
  margin-bottom: 5px;
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

// 标签选择框
::v-deep .tag .el-dialog__body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 40px 0px 40px;
}

::v-deep .tag .el-checkbox {
  margin-bottom: 20px;
  margin-right: 25px;
}
</style>
