// 状态
const state = {
  // 侧边栏风格ID
  themeId: localStorage.getItem('currentTopic') || '2'
}

// 执行同步
const mutations = {
  // 更改侧边栏风格ID
  setThemeId(state, payload) {
    state.themeId = payload
  }
}

// 执行异步
const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
