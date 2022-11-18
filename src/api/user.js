import request from '@/utils/request'

// 登录接口
export function loginAPI(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

// 获取用户列表
export function getAllUsersAPI() {
  return request({
    url: '/user/getAll'
  })
}

// 获取用户
export function getUsersAPI(id) {
  return request({
    url: `/user/get/${id}`
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
