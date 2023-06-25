import Cookies from 'js-cookie'

// token秘钥
const TokenKey = 'veryGood!'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// token失效时间
const timeKey = 'tokenTime'

export function getTime() {
  return Cookies.get(timeKey)
}

export function setTime() {
  Cookies.set(timeKey, Date.now())
}

// 用户信息
const user = 'userInfo'

export function getUser() {
  return Cookies.get(user)
}

export function setUser(info) {
  Cookies.set(user, info)
}
