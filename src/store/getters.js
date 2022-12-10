const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routes: state => state.permission.state,
  themeId: state => state.main.themeId,
  userInfo: state => state.userInfo
}
export default getters
