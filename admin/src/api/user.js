import request from '@/utils/request'

// 登录接口
export function loginAPI(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 添加用户
export function addUsersAPI(data) {
  return request({
    url: '/user/add',
    method: 'POST',
    data
  })
}

// 删除用户
export function delUsersAPI(data) {
  return request({
    url: '/user/del',
    method: 'POST',
    data
  })
}

// 修改用户
export function updateUsersAPI(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}

// 修改用户信息
export function updateInfoUsersAPI(data) {
  return request({
    url: '/user/updateInfo',
    method: 'POST',
    data
  })
}

// http://127.0.0.1:9999/api/user/safe
// 修改安全信息
export function safeUsersAPI(data) {
  return request({
    url: '/user/safe',
    method: 'POST',
    data
  })
}

// 获取用户
export function getUsersAPI(id) {
  return request({
    url: `/user/get/${id}`
  })
}

// 获取用户列表
export function getAllUsersAPI() {
  return request({
    url: '/user/getAll'
  })
}
