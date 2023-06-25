import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getTime } from '@/utils/auth'
import { Message } from 'element-ui'

// Token到期时间 以秒为单位
const TimeOut = 60 * 5 // 5分钟后到期
// const TimeOut = (60 * 60 * 24) * 3 // 3天后到期

// 创建 Axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 网址 = 基本网址 + 请求网址
  timeout: 5000 // 接口超时的时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        // 如果它为true表示过期了。token也就因为超时没用了
        store.dispatch('user/logout') // 登出操作
        // 跳转到登录页
        router.push('/login')

        Message.error('token超时了')

        return Promise.reject(new Error('token超时了'))
      }

      // 如果token存在 注入token
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }

    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 判断Token是否到期
function IsCheckTimeOut() {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTime() // 缓存时间戳

  // 求出到期的时间戳：当前时间戳 - 缓存时间戳 = 剩余时间戳（毫秒）
  // 再把剩余时间戳（毫秒） / 1000 求出以秒为单位的到期时间
  // TimeOut是自己设置的到期时间，如果剩余秒大于了TimeOut就证明到期了，然后返回true。否则false
  console.log((currentTime - timeStamp) / 1000, TimeOut)
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
