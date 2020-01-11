// 专门处理用户信息存储和删除以及获取 ，放置在 localStorage
const USER_TOKEN = 'heima-toutiao-token' // 这个 key 专门用来存储用户信息
// 设置用户信息
export function serUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 读取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}') // 短路表达式
}
// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}

// 操作localStorage 的一些函数 ，目的是为了将来实现刷新token 需要存储的信息，关闭浏览器后再次打开，需要保持登录状态
