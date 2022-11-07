/*
    imageNull：用户有头像显示头像，没有头像显示默认的
*/
export function imageNull(value) {
  if (value) {
    return value
  } else {
    return 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
  }
}

export function dateFormat(val) {
  if (val === null || val === '') {
    return ''
  } else {
    const d = new Date(val) // val 为表格内取到的后台时间
    const month =
      d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
    const times =
      d.getFullYear() +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hours +
      ':' +
      min +
      ':' +
      sec
    return times
  }
}
