<template>
  <div class="container">
    <van-tabs v-model="activeIndex" swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list @showAction="openMoreAction" :channel_id="channel.id"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 显示编辑频道的图标  -->
    <span class="bar_btn" @click="showChannelEdit=true">
      <van-icon name="wap-nav" />
    </span>
    <!-- 用popup 组件包裹 MoreAction 组件就可以弹出层 -->
    <van-popup :style="{width:'80%'}" v-model="showMoreAction">
      <more-action @dislike="dislikeOrReport($event,'dislike')"
      @report="dislikeOrReport($event,'report')"></more-action>
    </van-popup>
    <!-- 编辑频道   :round="false"  是否显示圆角="否"-->
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <!-- 放置频道的组件    子传父 -->
      <channel-edit :activeIndex="activeIndex" @selectChannel="selectChannel" :channels="channels"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import MoreAction from './components/more-action'
import { getMyChannels } from '@/api/channels'
import { disLikeArticle, reportArticle } from '@/api/article'
import eventBus from '@/utils/eventBus'
export default {
  name: 'home', // devtools 用来查看文件时   可以看到 对应的 name名称

  data: function () {
    return {
      activeIndex: 0, // 默认第一个被选中
      channels: [], // 声明频道需要的数据
      showMoreAction: false, // 控制反馈组件显示隐藏
      articleId: null, // 用来接收文章id
      showChannelEdit: false
    }
  },
  components: {
    ArticleList, MoreAction, ChannelEdit

  },
  methods: {
    // 切换到对应的频道 ， 切换弹层
    selectChannel (id) {
      let index = this.channels.findIndex(item => item.id === id)
      this.activeIndex = index // 点击的下标赋值给 当前激活下标
      this.showChannelEdit = false // 关闭弹层
    },
    async getMyChannels () {
      let data = await getMyChannels()
      // console.log(data)
      this.channels = data.channels
    },
    //  监听子组件触发的事件 打开弹层
    openMoreAction (artId) {
      this.showMoreAction = true
      this.articleId = artId // 接收不喜欢文章的 id
    },
    // 不喜欢 ，不感兴趣
    async dislike () {
      try {
        await disLikeArticle({
          target: this.articleId
        })
        this.$gnotify({ type: 'success', message: '操作成功' })
        eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
        this.showMoreAction = false
      } catch (error) {
        this.$gnotify({ type: 'danger', message: '操作失败' })
      }
    },
    // 不喜欢  或者 举报文章的
    async dislikeOrReport (params, operatetype) {
      try {
        if (this.articleId) {
          operatetype === 'dislike' ? await disLikeArticle({
            target: this.articleId
          }) : await reportArticle({
            target: this.articleId,
            type: params
          })
          this.$gnotify({ type: 'success', message: '操作成功' })
          eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
          this.showMoreAction = false
        }
      } catch (error) {
        this.$gnotify({ type: 'danger', message: '操作失败' })
      }
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}

// 编辑频道面板样式
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header{
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
