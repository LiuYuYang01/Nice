// 导入静态路由与动态路由
import { constantRoutes } from '@/router/index'

const state = {
  // 所有人都可以访问的路由：constantRoutes
//   routes: constantRoutes
  routes: constantRoutes
}

const mutations = {
  setRouter(state, newRouter) {

  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
