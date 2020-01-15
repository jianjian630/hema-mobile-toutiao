<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" :success-text="refreshSuccessText" @refresh="onRefresh">
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="article in articles" :key="article" :title="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: 'article-list',
  data () {
    return {
      finished: false, // 加载是否完成
      upLoading: false, // 是否加载数据
      articles: [],
      downLoading: false, // 是否开启下拉刷新
      refreshSuccessText: '更新成功'
    }
  },
  methods: {
    onLoad () {
      // console.log('加载了')
      setTimeout(() => {
        if (this.articles.length === 50) {
          this.finished = true // 停止追加
        } else {
          // Array.from() 方法就是将一个数组对象或者可遍历对象 转换成一个真正的数组
          let arr = Array.from(
            Array(10),
            (value, index) => index + this.articles.length + 1
          )
          // console.log(this.articles.length)   //数组长度每循环10次才会变化
          this.articles.push(...arr)
          this.upLoading = false // 关闭状态
        }
      }, 1000)
    },
    onRefresh () {
      console.log('下拉刷新')
      setTimeout(() => {
        let arr = Array.from(
          Array(10),
          (value, index) => ('追加' + (index + 1))
        )
        this.articles.unshift(...arr)
        this.downLoading = false // 关闭下拉状态
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
