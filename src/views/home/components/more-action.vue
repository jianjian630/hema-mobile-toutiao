<template>
  <div class="more-action">
      <van-cell-group>
          <van-cell>不感兴趣</van-cell>
          <!-- is-link属性会在单元格右侧显示箭头 -->
          <van-cell is-link>反馈垃圾内容</van-cell>
          <van-cell>拉黑作者</van-cell>
      </van-cell-group>
      <van-cell-group>
          <van-cell icon="arrow-left">返回</van-cell>
          <van-cell>侵权</van-cell>
          <van-cell>色情</van-cell>
          <van-cell>暴力</van-cell>
          <van-cell>低俗</van-cell>
          <van-cell>不适</van-cell>
          <van-cell>错误</van-cell>
          <van-cell>其他</van-cell>
      </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isReport: false // 设置一个标识
    }
  }
}
</script>

<style lang="less" scoped>
.more-action{
    border-radius:4px;
}
</style>
