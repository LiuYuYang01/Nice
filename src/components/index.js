// 该文件负责所有的公共的组件的全局注册   Vue.use
import tags3D from './tags3D'
import typing from './typing'

export default {
  install(Vue) {
    Vue.component('tags3D', tags3D)
    Vue.component('typing', typing)
  }
}
