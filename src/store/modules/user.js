import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginAPI } from '@/api/user'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

// 状态
const state = {
  token: getToken(),
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  userInfo: {}
}

// 执行同步
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
  },
  // 清除token
  removeToken(state) {
    state.token = ''
  }
}

// 执行异步
const actions = {
  // 登录功能
  async loginActions({ commit }, payload) {
    const res = await loginAPI(payload)

    if (res && res.success) {
      commit('setToken', res.token)
      Message.success('恭喜你，登录成功~')
    } else {
      Message.error('登录失败~')
    }
  },
  // 退出登录
  async logout({ commit }) {
    // 清除token
    commit('removeToken')
    // 清除Cookie
    removeToken()
    // 重置路由
    resetRouter()

    // 恢复侧边栏默认主题
    localStorage.setItem('currentTopic', '2')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
