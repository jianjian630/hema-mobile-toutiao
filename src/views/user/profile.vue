<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <van-image
          @click="showPhoto=true"
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell @click="showName=true" is-link title="名称" :value="user.name" />
      <van-cell @click="showGender=true"  is-link title="性别" :value="user.gender===0?'男':'女'" />
      <van-cell @click="showDate" is-link title="生日" :value="user.birthday" />
    </van-cell-group>
    <input style="display:none"  @change="upload" type="file" ref="myFile">
    <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
      <van-cell is-link @click="openNewFile" title="本地相册选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹昵称 -->
    <van-popup :close-on-click-overlay="false" v-model="showName" style="width:80%">
      <!-- 编辑用户昵称  双向绑定用户的昵称-->
      <van-field :error-message="nameMsg" v-model="user.name" type="textarea" rows="4"></van-field>
      <van-button type="info" size="large" @click="btnName">确定</van-button>
    </van-popup>
    <!-- 性别弾层 -->
      <van-action-sheet @select="onSelect" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>

    <!-- 生日弾层 -->
    <van-popup  v-model="showBirthDay" position="bottom">
      <!-- 选择出生日期  出生日期应该小于现在时间-->
      <!-- type表示 当前的日期类型 年月日 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthDay=false"
        @confirm="confirmDate"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserProfile, patchUserPhoto } from '@/api/user'
export default {
  name: 'profile',
  data () {
    return {
      showBirthDay: false,
      showPhoto: false,
      showName: false,
      showGender: false,
      // 定义性别的数据
      actions: [{ name: '男' }, { name: '女' }],
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(), // 生日最大不能大于 当前时间
      currentDate: new Date(), // 当前时间
      user: {
        name: '账单',
        gender: 0,
        birthday: '2020-1-1'
      },
      nameMsg: '' // 控制专门显示错误的信息
    }
  },
  created () {
    // 调用获取用户资料的方法
    this.getUserProfile()
  },
  methods: {
    onSelect (item) {
      // console.log(item)
      this.user.gender = item.name === '男' ? 0 : 1
      this.showGender = false
    },
    // 昵称进行  1-7个字符控制
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMsg = '您的用户昵称不符合1-7的长度要求'
        return false
      }
      this.nameMsg = ''
      this.showName = false
    },
    async getUserProfile () {
      let data = await getUserProfile()
      // console.log(data)
      this.user = data
    },
    // 点击生日时出发
    showDate () {
      this.currentDate = new Date(this.user.birthday)
      this.showBirthDay = true
    },
    // 点击生日弾层 确定按钮时出发
    confirmDate (value) {
      this.user.birthday = dayjs(value).format('YYYY-MM-DD') // 转化日期格式
      this.showBirthDay = false
    },
    // 点击打开本地相册的方法
    openNewFile () {
      // 当点击打开本地相册时候 ， 出发打开文件的事件
      this.$refs.myFile.click()
    },
    // 更新头像
    async upload () {
      // debugger
      // console.log(this.$refs.myFile.files)
      let data = new FormData()
      data.append('photo', this.$refs.myFile.files[0])
      let result = await patchUserPhoto(data)
      console.log(result)
      this.user.photo = result.photo
      this.showPhoto = false
    }

  }
}
</script>

<style>
</style>
