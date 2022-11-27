import request from '@/utils/request'

// 新增评论
export function addCommentAPI(data) {
  return request({
    url: '/comment/add',
    method: 'POST',
    data
  })
}

// 删除评论
export function delCommentAPI(data) {
  return request({
    url: '/comment/del',
    method: 'POST',
    data
  })
}

// 修改评论
export function updateCommentAPI(data) {
  return request({
    url: '/comment/update',
    method: 'POST',
    data
  })
}

// 审核评论
export function auditCommentAPI(data) {
  return request({
    url: '/comment/audit',
    method: 'POST',
    data
  })
}

// 批量删除评论
export function batchDelCommentAPI(data) {
  return request({
    url: '/comment/batchDel',
    method: 'POST',
    data
  })
}

// 获取评论
export function getCommentAPI(id) {
  return request({
    url: `/comment/get/${id}`
  })
}

// 获取全部评论
export function getAllCommentAPI() {
  return request({
    url: '/comment/getAll'
  })
}
