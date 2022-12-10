import request from '@/utils/request'

// 自定义SQL语句
export function customAPI(data) {
  return request({
    url: '/senior/custom',
    method: 'POST',
    data
  })
}
