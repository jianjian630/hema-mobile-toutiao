<template>
  <div class="container">
    <van-nav-bar title="黑马头条" right-text="搜索" v-if="showNavBar"  @click-right="$router.push('/search')"></van-nav-bar>
    <div class="my-wrapper" :class="{noTop:!showNavBar}">
      <router-view></router-view>
    </div>
    <!-- route 开启路由模式 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    // 是否显示 navbar
    showNavBar () {
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
