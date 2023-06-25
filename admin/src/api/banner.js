import request from '@/utils/request'

// 新增轮播图
export function addBannerAPI(data) {
  return request({
    url: '/banner/add',
    method: 'POST',
    data
  })
}

// 删除轮播图
export function delBannerAPI(data) {
  return request({
    url: '/banner/del',
    method: 'POST',
    data
  })
}

// 修改轮播图
export function updateBannerAPI(data) {
  return request({
    url: '/banner/update',
    method: 'POST',
    data
  })
}

// 获取轮播图
export function getBannerAPI(id) {
  return request({
    url: `/banner/get/${id}`
  })
}

// 获取全部轮播图
export function getAllBannerAPI() {
  return request({
    url: '/banner/getAll'
  })
}
