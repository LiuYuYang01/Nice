import request from '@/utils/request'

// 新增文章
export function addArticleAPI(data) {
  return request({
    url: '/article/add',
    method: 'POST',
    data
  })
}

// 删除文章
export function delArticleAPI(data) {
  return request({
    url: '/article/del',
    method: 'POST',
    data
  })
}

// 修改文章
export function updAtearticleAPI(data) {
  return request({
    url: '/article/update',
    method: 'POST',
    data
  })
}

// 获取文章
export function getArticleAPI(id) {
  return request({
    url: `/article/get/${id}`
  })
}

// 获取全部文章
export function getAllArticleAPI() {
  return request({
    url: '/article/getAll'
  })
}
