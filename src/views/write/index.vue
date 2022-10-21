<template>
  <div class="content">
    <h3>发布笔记</h3>

    <el-row type="flex" justify="space-between" style="height:600px">
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
            <el-tree :data="cate" show-checkbox node-key="id" :default-expanded-keys="[1]" :default-checked-keys="[1]" :props="defaultProps" style="padding:0 20px" />
          </div>

          <!-- 时间设置 -->
          <div class="timeSet">
            <h4 class="title">发布时间</h4>
            <el-row type="flex" justify="center">
              <el-date-picker v-model="timeDate" type="datetime" placeholder="选择日期时间" default-time="12:00:00" size="small" />
            </el-row>
          </div>

          <!-- 扩展设置 -->
          <div class="extendSet">
            <el-collapse v-model="activeNames" @change="handleChange">
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Write',
  data() {
    return {
      title: '',
      text: '',
      cate: [
        {
          id: 1,
          pid: 0,
          label: '大前端',
          children: [
            {
              pid: 1,
              label: 'HTML'
            },
            {
              pid: 1,
              label: 'CSS'
            },
            {
              pid: 1,
              label: 'JavaScript'
            }
          ]
        },
        {
          id: 2,
          pid: 0,
          label: '前端框架',
          children: [
            {
              pid: 2,
              label: 'Vue.js'
            },
            {
              pid: 2,
              label: 'React.js'
            },
            {
              pid: 2,
              label: 'Angular.js'
            },
            {
              pid: 2,
              label: 'Node.js'
            }
          ]
        },
        {
          id: 3,
          pid: 0,
          label: '生活随笔'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      timeDate: '',
      options: {
        public: true,
        hidden: false,
        password: false,
        directory: false
      }
      // el-collapse设置是否默认展开
      // activeNames: ['unfold']
    }
  },
  methods: {
    handleChange(val) {
      if (val.length) {
        console.log('展开')
      } else {
        console.log('收起')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 100px;
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
</style>
