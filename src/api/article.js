import request from '@/utils/request'
// 获取文章数据
// axios 中的 query 参数放置在 params 上
// body 参数放置在 data上
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
