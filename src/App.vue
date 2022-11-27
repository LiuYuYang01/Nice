<template>
  <div id="app">
    <!-- 全局DIY按钮 -->
    <div v-if="is" class="DIY" @click="drawer = true">
      <i class="el-icon-setting" />
    </div>

    <!-- DIY控制台 -->
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="18%" class="theme">
      <h3 class="title" style="color: #727cf5;"><i class="el-icon-set-up" style="margin-right: 5px;" />主题配置</h3>

      <!-- 侧边栏主题 -->
      <h3 class="title" style="font-size:16px; padding-bottom:10px">侧边栏配置</h3>
      <div class="sidebarColor">
        <!-- 光 -->
        <div>
          <div :class="{'light': true, selected: isSelected === 1}" @click="selected(1)">
            <img src="./assets/theme/light.png" alt="">
          </div>
          <p :class="{'selected_p': isSelected === 1}">光</p>
        </div>

        <!-- 渐变 -->
        <div>
          <div :class="{'gradient': true, selected: isSelected === 2}" @click="selected(2)">
            <img src="./assets/theme/gradient.png" alt="">
          </div>
          <p :class="{'selected_p': isSelected === 2}">渐变</p>
        </div>

        <!-- 暗 -->
        <div>
          <div :class="{'dark': true, selected: isSelected === 3}" @click="selected(3)">
            <img src="./assets/theme/dark.png" alt="">
          </div>
          <p :class="{'selected_p': isSelected === 3}">黑暗</p>
        </div>
      </div>

      <!-- 全局配置 -->
      <h3 class="title" style="font-size:16px; padding-bottom:10px">全局配置</h3>
      <div class="bigPicture">
        <!-- 光暗切换 -->
        <div>
          <div>光暗切换：</div>

          <div ref="isTheme" class="is" @click="isLightOrDark">
            <img ref="isThemeImg" :src="defaultStateImg" alt="">
          </div>
        </div>

        <!-- 自定义颜色 -->
        <div>
          <div>自定义颜色：</div>

          <div>
            <el-color-picker v-model="color" size="mini" />
          </div>
        </div>
      </div>
    </el-drawer>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      defaultStateImg: require('./assets/theme/TY.png'),
      defaultState: 1,
      isSelected: 2,
      color: '#727cf5'
    }
  },
  computed: {
    is() {
      return this.$store.getters.token
    }
  },
  watch: {
    isSelected: {
      handler(id) {
        // 获取用户点击的那个侧边栏风格id
        this.$store.commit('main/setThemeId', id)

        // 将用户点击的侧边栏风格id持久化本地存储
        localStorage.setItem('currentTopic', id)

        const $ = document.getElementsByTagName('body')[0].style

        if (id === 1) {
          // 光 主题
          $.setProperty('--menuText', '#6c757d')
          $.setProperty('--menuActiveText', '#727cf5')
          $.setProperty('--subMenuActiveText', '#727cf5')
          $.setProperty('--title', '#333')
          $.setProperty('--menuBg', '#fff')
          $.setProperty('--menuHover', 'transparent')
          $.setProperty('--subMenuBg', 'transparent')
          $.setProperty('--subMenuHover', 'transparent')
          $.setProperty('--oneMenuHover', 'transparent')
          $.setProperty('--boxShadow', '0 1px 4px rgb(0 21 41 / 8%)')
        } else if (id === 2) {
          // 渐变 主题
          $.setProperty('--menuText', '#cedce4')
          $.setProperty('--menuActiveText', '#fff')
          $.setProperty('--subMenuActiveText', '#f4f4f5')
          $.setProperty('--title', '#fff')
          $.setProperty(
            '--menuBg',
            'linear-gradient(135deg, #8f75da 0%, #727cf5 60%)'
          )
          $.setProperty('--menuHover', 'transparent')
          $.setProperty('--subMenuBg', 'transparent')
          $.setProperty('--subMenuHover', 'transparent')
          $.setProperty('--oneMenuHover', 'transparent')
          $.setProperty('--boxShadow', 'none')
        } else if (id === 3) {
          // 暗色 主题
          $.setProperty('--menuText', '#bfcbd9')
          $.setProperty('--menuActiveText', '#fff')
          $.setProperty('--subMenuActiveText', '#f4f4f5')
          $.setProperty('--title', '#fff')
          $.setProperty('--menuBg', '#313a46')
          $.setProperty('--menuHover', '#313a46')
          $.setProperty('--subMenuBg', '#313a46')
          $.setProperty('--subMenuHover', '#313a46')
          $.setProperty('--oneMenuHover', '#282e38')
          $.setProperty('--boxShadow', 'none')
        }
      }
    }
  },
  created() {
    this.isSelected = Number(localStorage.getItem('currentTopic')) || 2
  },
  methods: {
    // 切换侧边栏模板
    selected(id) {
      this.isSelected = id
    },
    // 光暗切换
    isLightOrDark() {
      if (this.defaultState === 1) {
        this.defaultStateImg = require('./assets/theme/YL.png')
        this.defaultState = 2

        this.$refs.isThemeImg.style.left = '20px'
        this.$refs.isTheme.style.backgroundColor = '#464646'
      } else {
        this.defaultStateImg = require('./assets/theme/TY.png')
        this.defaultState = 1

        this.$refs.isThemeImg.style.left = '0px'
        this.$refs.isTheme.style.backgroundColor = '#eee'
      }
    }
  }
}
</script>

<style scoped>
/deep/ .el-color-picker__trigger {
  border: none !important;
}
</style>
