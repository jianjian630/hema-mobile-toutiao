<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击进入我的频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(channel,i) in channels" :key="channel.id">
          <span :class="{red: i===activeIndex}" @click="$emit('selectChannel',channel.id)" class="f12">{{channel.name}}</span>
          <template v-if="i!=0">
            <!-- 判断，如果不是第一个才显示 叉号  第一个永远不能删除 -->
            <van-icon @click="$emit('delChannel',channel.id)" class="btn" name="cross" v-if="editing"></van-icon>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline-left">
        <van-grid-item v-for="item in optionalChannels" :key="item.id">
          <span class="f12">{{item.name}}</span>
          <!-- 告诉父组件需要添加哪个频道 -->
          <van-icon @click="$emit('addChannel',item)" class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels.js'
export default {
  data () {
    return {
      editing: false, // 是否正在编辑
      allChannels: []
    }
  },
  props: {
    channels: {
      required: true,
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      let data = await getAllChannels()
      // console.log(data)
      this.allChannels = data.channels
      // console.log(this.allChannels)
    }
  },
  computed: {
    // 可选频道
    optionalChannels () {
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
