<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" :success-text="refreshSuccessText" @refresh="onRefresh">
      <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="article in articles" :key="article.art_id.toString()" >
          <!-- 三张图  -->
          <div class="article_item">
            <h3 class="van-ellipsis">{{article.title}}</h3>
            <div class="img_box" v-if="article.cover.type===3">
              <van-image class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <!-- 一张图 -->
            <div class="img_box" v-if="article.cover.type===1">
              <van-image class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{ article.aut_name }}</span>
              <span>{{ article.comm_count }}</span>
              <span>{{ article.pubdate }}</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/article'
export default {
  name: 'article-list',
  // props 传值
  props: {
    // channel_id 属性名
    channel_id: {
      required: true, // 要求必须传props 属性，否则报错
      type: Number, // type 指定类型
      default: null // default 默认值
    }
  },
  data () {
    return {
      finished: false, // 加载是否完成
      upLoading: false, // 是否加载数据
      articles: [],
      downLoading: false, // 是否开启下拉刷新
      refreshSuccessText: '更新成功',
      timestamp: null // 定义属性用来存放时间戳
    }
  },
  methods: {
    async onLoad () {
      // console.log('加载了')
      // setTimeout(() => {
      //   if (this.articles.length === 50) {
      //     this.finished = true // 停止追加
      //   } else {
      //     // Array.from() 方法就是将一个数组对象或者可遍历对象 转换成一个真正的数组
      //     let arr = Array.from((value, index) => index + 1)
      //     // console.log(this.articles.length)   //数组长度每循环10次才会变化
      //     this.articles.push(...arr)
      //     this.upLoading = false // 关闭状态
      //   }
      // }, 1000)
      let data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      // 追加数据到队尾
      this.articles.push(...data.results)
      // console.log(data)
      // 关闭加载状态
      this.upLoading = false
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true // 木有数据了
      }
    },
    // 下拉刷新
    async onRefresh () {
      // console.log('下拉刷新')
      // setTimeout(() => {
      //   let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
      //   this.articles.unshift(...arr)
      //   this.downLoading = false // 关闭下拉状态
      //   this.refreshSuccessText = `更新了${arr.length}条数据`
      // }, 1000)
      const data = await getArticles({ channel_id: this.channel_id, timestamp: Date.now() })
      this.downLoading = false
      if (data.results.length) {
        this.articles = data.results
        this.finished = false
        this.timestamp = data.pre_timestamp
        this.refreshSuccessText = `更新了${data.results.length}条数据`
      } else {
        this.refreshSuccessText = '已是最新数据'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
