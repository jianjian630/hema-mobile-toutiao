<template>
  <div class='container'>
     <van-nav-bar fixed title="搜索结果" left-arrow  @click-left="$router.back()"/>
     <van-list v-model="upLoading" :finished="finished" @load="onLoad">
       <van-cell-group>
         <van-cell v-for="item in articles" :key="item.art_id.toString()">
           <div class="article_item">
             <h3 class="van-ellipsis">{{item.title}}</h3>
             <div class="img_box" v-if="item.cover.type==3">
               <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]"></van-image>
               <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]"></van-image>
               <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[3]"></van-image>
             </div>
             <div class="img_box" v-if="item.cover.type==1">
               <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]"></van-image>
             </div>
             <div class="info_box">
               <span>{{item.aut_name}}</span>
               <span>{{item.comm_count}}评论</span>
               <span>{{item.pubdate | relTime}}</span>
             </div>
           </div>
         </van-cell>
       </van-cell-group>
     </van-list>
  </div>
</template>

<script>
import { searchArticle } from '@/api/article'
export default {
  name: 'searchResult',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [],
      page: {
        page: 1,
        per_page: 10
      }
    }
  },
  methods: {
    async onLoad () {
      let { q } = this.$route.query // 从地址栏中解析查询参数
      console.log(q)
      let data = await searchArticle({ ...this.page, q })
      console.log(data)
      this.articles.push(...data.results)
      console.log(this.articles)
      this.upLoading = false // 手动关闭加载状态
      if (data.results.length) {
        this.page.page++ // 将页码+1 表示下一页还有数据
      } else {
        this.finished = true // 加载结束
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  // padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
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
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
