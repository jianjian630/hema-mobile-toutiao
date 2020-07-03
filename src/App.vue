<template>
  <div id="app">
    <keep-alive>
      <!-- 判断  有 isAlive 的才让缓存 -->
      <router-view v-if="$route.meta.isAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isAlive" />
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">

</style>
