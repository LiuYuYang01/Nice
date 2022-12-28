<template>
  <div class="content">
    <h2 class="title text-gradient">资源库</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane label="图片" name="image">
        <el-row type="flex" justify="space-between" class="head">
          <el-col>
            <h2>图片</h2>
          </el-col>

          <el-col :span="2" style="width:8.33333%">
            <el-button type="primary" size="small" style="width:100px" @click="addGrouping">新建分组</el-button>
          </el-col>
        </el-row>

        <el-row class="main">
          <!-- <el-col :span="2" class="grouping">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wenjianleixing-biaozhuntu-wenjianjia" />
            </svg>

            <p>点点滴滴</p>
          </el-col> -->

          <el-col v-for="item in resource.image" :key="item.id" :span="2" class="grouping">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon" />
            </svg>

            <p>{{ item.title }}</p>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="视频" name="video">视频</el-tab-pane>
      <el-tab-pane label="文件" name="file">文件</el-tab-pane>
      <el-tab-pane label="其他" name="other">其他</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Material',
  data() {
    return {
      activeName: 'image',
      resource: {
        image: [
          {
            id: 1,
            title: '点点滴滴',
            icon: '#icon-wenjianleixing-suolvetu-wenjianjia',
            list: [
              {
                url: 'https://ts1.cn.mm.bing.net/th/id/R-C.8c98cb8ea954b7a4d92d5ff60459f0c9?rik=dyD2wlWAdZ%2focw&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2fa%2ff9%2f9c32fe55df.jpg%3fdown&ehk=5PUignMlh%2fMNqlfXPAzGMq3S8qiMcZUrYiRjlB3TQdM%3d&risl=&pid=ImgRaw&r=0'
              },
              {
                url: 'https://ts1.cn.mm.bing.net/th/id/R-C.bac52ef2ae2c813507f419efff142120?rik=sMmcbXmSiccgBg&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2f8%2f4b%2fa41ed778d0.jpg&ehk=GACib7KxZ1s9itOWF%2fLAbTfYYc9xJgci2x%2fLaZ5fAXo%3d&risl=&pid=ImgRaw&r=0'
              }
            ]
          },
          {
            id: 2,
            title: '未命名分组',
            icon: '#icon-wenjianleixing-suolvetu-wenjianjia',
            list: []
          }
        ],
        video: [],
        file: [],
        other: []
      }
    }
  },
  created() {
    this.resourceInit()
  },
  methods: {
    // 新建分组
    addGrouping() {
      console.log(this.activeName)
    },
    // 初始化
    resourceInit() {
      for (const key in this.resource) {
        if (this.resource[key].length) {
          this.resource[key].forEach(item => {
            if (item.list.length) {
              item.icon = '#icon-wenjianleixing-biaozhuntu-wenjianjia'
            }
          })
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

  > .title {
    margin: 0;
    margin-bottom: 20px;
  }

  .head {
    align-items: center;
  }

  .main {
    .grouping {
      text-align: center;
      cursor: pointer;

      svg {
        width: 70%;
        height: 70px;
      }

      p {
        margin: 0;
        margin-top: 5px;
        color: #333;
        font-size: 13px;
        transition: all 0.3s;
      }

      &:hover p {
        color: #727cf5;
      }
    }
  }
}
</style>
