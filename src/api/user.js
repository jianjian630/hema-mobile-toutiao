// 用户相关的请求模块
import request from '@/utils/request' // 引入封装的模块
// 登录方法
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  }) //  得到一个promise对象  返回
}

// 关注用户
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data
  })
}
// 取消关注
export function unFollowUser (target) {
  return request({
    url: `/user/followings/${target}`,
    method: 'delete'
  })
}
// 获取用户个人信息
export function getUserInfo () {
  return request({
    url: '/user'
  })
}
// 获取用户个人资料
export function getUserProfile () {
  return request({
    url: '/user/profile'
  })
}

// 更新用户头像
export function patchUserPhoto (data) {
  return request({
    url: 'user/photo',
    data,
    method: 'patch' // patch 是局部更新  put 是全部更新
  })
}

// 保存用户资料的方法
export function saveUserInfo (data) {
  return request({
    url: '/user/profile',
    data,
    method: 'patch' // patch 是局部更新  put 是全部更新
  })
}
