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

// 封装不喜欢接口
export function disLikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}

// 封装举报文章的
export function reportArticle (data) {
  return request({
    url: '/article/reports',
    data,
    method: 'post'
  })
}

// 获取文章搜索建议
export function suggestion (params) {
  return request({
    url: '/suggestion',
    params
  })
}

// 获取文章搜索的结果
// params 是get的参数
// data 是body的参数
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}

// 获取文章详情
export function getArticleInfo (articleId) {
  return request({
    url: `/articles/${articleId}`
  })
}
// 获取评论 或者评论的回复
export function getComments (params) {
  return request({
    url: '/comments',
    // query参数放在params里面
    // body 参数 放置在 data
    params
  })
}
// 评论或者回复评论的方法
export function commentOrReply (data) {
  return request({
    url: '/comments',
    method: 'post',
    data
  })
}
