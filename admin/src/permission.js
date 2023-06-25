// 权限拦截 导航守卫 路由守卫  router
import router from './router'
import store from './store'
// import { Message } from 'element-ui'
// 引入进度条插件
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 定义白名单  所有不受权限控制的页面
const whiteList = ['/login', '/404']

router.beforeEach((to, form, next) => {
  NProgress.start() // 开启进度条

  // 如果有token则不能访问登录页面
  if (store.getters.token) {
    if (to.path === '/login') {
      // Message.warning('你已登录，无需重复登录~')
      next('/') // 跳转到主页
    } else {
      // 其他页面可以正常访问
      next() // 正常放行
    }
  } else {
    // 如果没有token就是没有登录，所以只能访问白名单内的路由
    // if (whiteList.indexOf(to.path) > -1) {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }

  // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
  NProgress.done()
})

// 后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
