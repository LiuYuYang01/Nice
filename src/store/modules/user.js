import {
  getToken,
  setToken,
  removeToken,
  setTime,
  getUser,
  setUser
} from '@/utils/auth'
import { loginAPI } from '@/api/user'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

// 状态
const state = {
  token: getToken(),
  avatar: getUser() && JSON.parse(getUser()).avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  userInfo: getUser()
}

// 执行同步
const mutations = {
  setToken(state, payload) {
    state.token = payload.token
    state.userInfo = payload.data

    setToken(payload.token)
    setUser(payload.data)
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
    const { data, message, success, token } = await loginAPI(payload)

    if (success) {
      commit('setToken', { token, data })
      Message.success('恭喜你，登录成功~')

      // 设置时间戳
      setTime() // 将当前的最新时间写入缓存
    } else {
      Message.error(message)
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
