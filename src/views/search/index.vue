<template>
  <div class="container">
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
      <!-- shape 搜索框形状 -->
      <!-- .trim  自动过滤最开始和末尾的空格   中间的只保留一个  多余的会被过滤 -->
      <van-search v-model.trim="q" placeholder="请输入搜索关键字" shape="round"></van-search>
      <!-- 联想搜索    有输入的内容的时候 出现联想搜索，否则的话想 显示历史记录 -->
      <van-cell-group class="suggest-box" v-if="q">
        <van-cell icon="search">
          <span>java</span>
        </van-cell>
      </van-cell-group>
      <!-- 历史记录 -->
      <div class="history-box" v-else>
        <div class="head">
          <span>历史记录</span>
          <!-- 删除按钮 -->
          <van-icon name="delete"></van-icon>
        </div>
        <van-cell-group>
          <van-cell>
            <a  class="word_btn">电脑</a>
            <van-icon class="close_btn" slot="right-icon" name="cross"></van-icon>
          </van-cell>
        </van-cell-group>
      </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      q: '',
      historyList: []
    }
  },

  created () {
    this.historyList = JSON.parse(localStorage.getItem('key') || [])
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
      margin-top: 10px;;
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
