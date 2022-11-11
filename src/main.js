import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

// 自定义Element ui样式
import '@/theme/index.css'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入iconfont字体图标
import '@/icons/font/iconfont.css'

import '@/styles/index.css'

// 引入v-md-editor 开始代码
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

// 将组件安装到全局
import component from '@/components/index'
Vue.use(component)

// VueMarkdownEditor.use(githubTheme, {
//   codeHighlightExtensionMap: {
//     vue: 'xml'
//   }
// })
Vue.use(VueMarkdownEditor)
// v-md-editor 结束代码

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 自定义的过滤器
import { imageNull, dateFormat } from '@/filter/index'

// 自定义过滤器，有头像就显示头像，没有头像就显示默认头像
Vue.filter('imageNull', imageNull)
Vue.filter('dateFormat', dateFormat)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
