import Vue from 'vue'
import VueRouter from 'vue-router'

const Layout = () => import ('@/views/layout') // 布局
const Home = () => import('@/views/home') // 首页
const Question = () => import ('@/views/question') // 问答
const Video = () => import ('@/views/video') // 视频
const User = () => import ('@/views/user') // 个人中心
const UserChat = () => import ('@/views/user/chat') // 小智同学
const UserProfile = () => import ('@/views/user/profile') // 编辑资料
const Login = () => import ('@/views/login') // 登录
const Search = () => import ('@/views/search') // 搜索中心
const SearchResult = () => import ('@/views/search/result') // 搜索结果
const Article = () => import('@/views/article') // 文章详情

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/question', component: Question },
      { path: '/video', component: Video },
      { path: '/user', component: User }
    ]
  },
  {
    path: '/user/profile',
    component: UserProfile
  },
  {
    path: '/user/chat',
    component: UserChat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: SearchResult
  },
  {
    path: '/article',
    component: Article
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
