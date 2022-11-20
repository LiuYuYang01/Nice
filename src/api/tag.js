import request from '@/utils/request'

// 新增标签
export function addTagAPI(data) {
  return request({
    url: '/tag/add',
    method: 'POST',
    data
  })
}

// 删除标签
export function delTagAPI(data) {
  return request({
    url: '/tag/del',
    method: 'POST',
    data
  })
}

// 修改标签
export function updateTagAPI(data) {
  return request({
    url: '/tag/update',
    method: 'POST',
    data
  })
}

// 获取标签
export function getTagAPI(id) {
  return request({
    url: `/tag/get/${id}`
  })
}

// 获取全部标签
export function getAllTagAPI() {
  return request({
    url: '/tag/getAll'
  })
}
