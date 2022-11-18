import axios from 'axios'

// 创建 Axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 网址 = 基本网址 + 请求网址
  timeout: 5000 // 接口超时的时间
})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use(res => {
  return res.data
})

export default service
