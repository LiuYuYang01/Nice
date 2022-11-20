import request from '@/utils/request'

// 新增友联
export function addLinkAPI(data) {
  return request({
    url: '/link/add',
    method: 'POST',
    data
  })
}

// 删除友联
export function delLinkAPI(data) {
  return request({
    url: '/link/del',
    method: 'POST',
    data
  })
}

// 修改友联
export function updateLinkAPI(data) {
  return request({
    url: '/link/update',
    method: 'POST',
    data
  })
}

// 获取友联
export function getLinkAPI(id) {
  return request({
    url: `/link/get/${id}`
  })
}

// 获取全部友联
export function getAllLinkAPI() {
  return request({
    url: '/link/getAll'
  })
}
