<template>
  <div class="container">
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
      <!-- shape 搜索框形状 -->
      <!-- .trim  自动过滤最开始和末尾的空格   中间的只保留一个  多余的会被过滤 -->
      <van-search @search="toSearch()" v-model.trim="q" placeholder="请输入搜索关键字" shape="round"></van-search>
      <!-- 联想搜索    有输入的内容的时候 出现联想搜索，否则的话想 显示历史记录 -->
      <van-cell-group class="suggest-box" v-if="q">
        <van-cell @click="toSearchResult(item)" icon="search" v-for="item in suggestList" :key="item" >
         {{ item }}
        </van-cell>
      </van-cell-group>
      <!-- 历史记录 -->
      <div class="history-box" v-else-if="historyList.length">
        <div class="head">
          <span>历史记录</span>
          <!-- 删除按钮      清空按钮  清空所有历史-->
          <van-icon @click="clear" name="delete"></van-icon>
        </div>
        <van-cell-group @click="toResult(item)" v-for="(item,index) in historyList" :key="item">
          <van-cell>
            <a  class="word_btn">{{ item }}</a>
            <!-- 给删除按钮注册删除事件 -->
            <!-- .stop   修饰符   阻止事件冒泡 -->
            <van-icon @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross"></van-icon>
          </van-cell>
        </van-cell-group>
      </div>
  </div>
</template>

<script>
import { suggestion } from '@/api/article'
const key = 'hm-toutiao-history' // 用来存储 历史数据
export default {
  name: 'search',
  data () {
    return {
      q: '',
      historyList: [], // 历史记录数据
      suggestList: [] // 存放搜索建议的数组
    }
  },
  watch: {
  // 在watch 中通过函数 防抖 进行联想搜索
    // q () {
    //   clearTimeout(this.timer)
    //   this.timer = setTimeout(async () => {
    //     if (!this.q) {
    //       this.suggestList = []
    //       return
    //     }
    //     let data = await suggestion({ q: this.q })
    //     console.log(data) // 返回的建议 数组形式
    //     this.suggestList = data.options
    //   }, 300)
    // }
  // 在watch 中通过函数 节流 进行联想搜索
    q () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null // 将timer置空
          if (!this.q) {
            this.suggestList = []
            return false
          }
          let data = await suggestion({ q: this.q })
          this.suggestList = data.options
        }, 300)
      }
    }
  },
  created () {
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  },
  methods: {
    // 搜索框回车搜索  或者点击搜索进行搜索
    toSearch () {
      if (!this.q) return
      let obj = new Set(this.historyList)
      obj.add(this.q)
      localStorage.setItem(key, JSON.stringify(Array.from(obj)))
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    },
    // 点击搜索建议跳到搜索结果
    toSearchResult (txt) {
      let obj = new Set(this.historyList) // set 去重
      console.log(txt)
      obj.add(txt) // 把点击搜索的 加入到数组中
      this.historyList = Array.from(obj) // 将伪数组转化成数组
      localStorage.setItem(key, JSON.stringify(this.historyList)) // 重新写入缓存
      this.$router.push({ path: '/search/result', query: { q: txt } }) // 跳转到搜索结果页面
    },
    // 删除历史记录
    delHistory (index) {
      // 用下标删除一条记录
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    // 跳到搜索结果页面
    toResult (txt) {
      // 直接跳转到搜索结果页面
      this.$router.push({ path: '/search/result', query: { q: txt } })
    },
    // 清空历史
    clear () {
      this.historyList = [] // 清空所有历史
      // 以下两种方法都可以
      // localStorage.setItem(key, JSON.stringify(this.historyList))
      localStorage.setItem(key, '[]')
    }
  }
}
</script>
<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
