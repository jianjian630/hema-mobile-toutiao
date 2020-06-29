<template>
  <div class="comment">
    <van-list v-model="loading" @load="onLoad" :finished="finished" finished-text="没有更多了">
      <div
        class="item van-hairline--bottom van-hairline--top"
        v-for="comment in comments"
        :key="comment.com_id.toString()"
      >
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="info">
          <p>
            <span class="name">{{comment.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{comment.like_count}}</span>
            </span>
          </p>
          <p>{{comment.content}}</p>
          <p>
            <span class="time">{{comment.pubdate|relTime}}</span>&nbsp;
            <van-tag plain @click="openReply(comment.com_id)">{{comment.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" @click="submit()" v-else slot="button">提交</span>
      </van-field>
    </div>
    <!-- 回复评论 -->
    <van-action-sheet @closed="reply.commentId=null" v-model="showReply" :round="false" class="reply_dialog" title="回复评论">
      <!-- immediate-check  是否在初始化时立即执行滚动位置检查 -->
      <van-list
        @load="getReply"
        :immediate-check="false"
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
      >
        <div
          class="item van-hairline--bottom van-hairline--top"
          v-for="item in reply.list"
          :key="item.com_id.toString()"
        >
          <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
          <div class="info">
            <p>
              <span class="name">{{item.aut_name}}</span>
            </p>
            <p>{{item.content}}</p>
            <p>
              <span class="time">{{item.pubdate|relTime}}</span>
            </p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>

  <!-- 都不输入框 -->
</template>

<script>
import { getComments, commentOrReply } from '@/api/article'
export default {
  data () {
    return {
      // 上拉加载中
      loading: false,
      // 全部加载完毕
      finished: false,
      // 输入的内容
      value: '',
      // 控制提交中状态数据
      submiting: false,
      comments: [], // 存放评论列表数据
      offset: null, // 表示分页数据， 为空 表示从第一页开始
      // 回复   相关的数据
      showReply: false, // 回复列表组件的  显示隐藏
      reply: {
        // 回复列表组件状态
        loading: false,
        finished: false,
        offset: null, // 偏移量 获取评论的分业依据 c
        list: [], // 存放当前弹出的某个评论的回复  列表数据
        commentId: null // 存放当前点击评论的 id
      }
    }
  },
  methods: {
    async onLoad () {
      let data = await getComments({
        type: 'a',
        offset: this.offset,
        source: this.$route.query.articleId
      })
      this.comments.push(...data.results)
      this.loading = false // 关闭上拉加载状态
      this.finished = data.last_id === data.end_id
      if (!this.finished) {
        this.offset = data.last_id // 将last_id设置为下一页的请求数据
      }
    },
    openReply (commentId) {
      this.showReply = true // 弹出面板
      this.reply.commentId = commentId // 存储当前点击的id
      this.reply.list = []
      this.reply.offset = null // 重置回复偏移量 因为每个评论的评论都是从第一页开始的额
      this.reply.finished = false // 设置成原始状态
      this.reply.loading = true // 主动打开加载状态 因为这个时候没有了自动检查
      // 开始加载第一页数据
      this.getReply() // 开始调用第一页数据
    },
    // 获取评论的评论
    async getReply () {
      let data = await getComments({
        type: 'c',
        offset: this.reply.offset,
        source: this.reply.commentId.toString()
      })
      this.reply.list.push(...data.results)
      this.reply.loading = false
      this.reply.finished = data.end_id === data.last_id
      if (!this.reply.finfished) {
        this.reply.offset = data.last_id
      }
    },
    // 提交评论
    async submit () {
      if (!this.value) return false
      // 将提交状态设置为true 控制用户单位时间内评论的次数
      this.submiting = true
      await this.$sleep() // 强制等待500毫秒
      try {
        let data = await commentOrReply({
          target: this.reply.commentId ? this.reply.commentId.toString() : this.$route.query.articleId,
          content: this.value,
          art_id: this.reply.commentId ? this.$route.query.articleId : null
        })
        if (this.reply.commentId) {
          this.reply.list.unshift(data.new_obj)
          const comment = this.comments.find(item => item.com_id.toString() === this.reply.commentId.toString())
          comment && comment.reply_count++
        } else {
          this.comments.unshift(data.new_obj)
        }
        this.value = ''
      } catch (err) {
        this.$gnotifly({ type: 'danger', message: '评论失败' })
      }
      this.submiting = false
    }
  }
}
</script>

<style lang='less' scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name {
        color: #069;
      }
      .zan {
        vertical-align: middle;
        padding-right: 2px;
      }
      .count {
        vertical-align: middle;
        font-size: 10px;
        color: #666;
      }
      .time {
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
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
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
// 回复评论的css

.reply_dialog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content {
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>
