<template>
<div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list" ref="myList">
      <div class="chat-item" :class="{left:item.name==='xz',right:item.name!=='xz'}" v-for="(item,index) in list" :key="index">
         <van-image v-if="item.name==='xz'" fit="cover" round :src="xzImg" />
         <div class="chat-pao">{{item.msg}}</div>
         <van-image v-if="item.name!='xz'" fit="cover" round :src="photo" />
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image  fit="cover" round :src="photo" />
      </div> -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">发送</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import io from 'socket.io-client'
import xzImg from '@/assets/images/xz.png'
export default {
  name: 'chat',
  data () {
    return {
      value: '',
      loading: false,
      xzImg,
      list: [] // 存放聊天记录
    }
  },
  created () {
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.user.token
      }
    })
    // 接收一个socketIO实力对象
    this.socket.on('connect', () => {
      console.log('与服务器连接成功')
      this.list.push({ msg: '你好啊，快来找我聊天吧', name: 'xz' })
    })
    this.socket.on('message', (data) => {
      this.list.push({ ...data, name: 'xz' })
      this.scrollView()
    })
  },
  beforeDestroy () {
    this.socket.close()
  },
  methods: {
    async  send () {
      if (!this.value) return false
      this.loading = true // 打开加载状态
      await this.$sleep() // 休眠函数  默认500毫秒之后
      let obj = {
        msg: this.value,
        timestemp: Date.now()
      }
      this.socket.emit('message', obj)
      this.list.push(obj)
      this.value = ''
      this.loading = false
      this.scrollView()
    },
    scrollView () {
      // $nextTick 会在上一次数据更新并且视图渲染完毕之后用
      this.$nextTick(() => {
        // 获取滚动条高度  设置滚动条距离来回滚动
        this.$refs.myList.scrollTop = this.$refs.myList.scrollHeight
      })
    }
  },
  computed: {
    ...mapState(['photo', 'user'])
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
