import request from '@/utils/request'

// 新增分类
export function addCateAPI(data) {
  return request({
    url: '/cate/add',
    method: 'POST',
    data
  })
}

// 删除分类
export function delCateAPI(data) {
  return request({
    url: '/cate/del',
    method: 'POST',
    data
  })
}

// 修改分类
export function updateCateAPI(data) {
  return request({
    url: '/cate/update',
    method: 'POST',
    data
  })
}

// 获取分类
export function getCateAPI(id) {
  return request({
    url: `/cate/get/${id}`
  })
}

// 获取全部分类
export function getAllCateAPI() {
  return request({
    url: '/cate/getAll'
  })
}
