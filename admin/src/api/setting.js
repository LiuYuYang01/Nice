import request from '@/utils/request'

// 修改系统配置信息
export function updateSystemAPI(data) {
  return request({
    url: '/set/system',
    method: 'POST',
    data
  })
}

// 修改网站配置信息
export function updateWebAPI(data) {
  return request({
    url: '/set/web',
    method: 'POST',
    data
  })
}

// 获取配置信息
export function getConfigAPI() {
  return request({
    url: '/set/config'
  })
}
