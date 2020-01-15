import request from '@/utils/request'
// 获取频道
export function getMyChannels () {
  return request({
    url: '/user/channels'
  })
}
