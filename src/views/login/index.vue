<template>
  <div class="container">
     <van-nav-bar title="登录" left-arrow  @click-left="$router.back()"></van-nav-bar>
     <van-cell-group>
        <van-field
        @blur="checkMobile"
        :error-message="errorMsg.mobile"
        v-model.trim="loginForm.mobile"
          label="手机号"
          placeholder="请输入11位手机号">
        </van-field>

        <van-field
         @blur="checkCode"
        :error-message="errorMsg.code"
        v-model.trim="loginForm.code"
          type="code"
          label="验证码"
          placeholder="请输入验证码">
           <van-button slot="button" size="small" type="primary" class="p10" >发送验证码</van-button>
         </van-field>
        <div class="btn_box">
          <van-button @click="login()" block round type="info" size="large">登录</van-button>
       </div>
     </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13200000000',
        code: '246810'
      },
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']),
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errorMsg.mobile = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMsg.mobile = '手机号格式不正确'
        return false
      }
      this.errorMsg.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMsg.code = '验证码不能为空'
        return false
      }
      if (!/\d{6}/.test(this.loginForm.code)) {
        this.errorMsg.code = '验证码格式不正确'
        return false
      }
      this.errorMsg.code = ''
      return true
    },
    // 调用登录方法
    async login () {
      // console.log('登录了')
      let Mobile = this.checkMobile()
      let Code = this.checkCode()
      // console.log(Mobile, Code)
      if (Mobile && Code) {
        // 调用接口获取token
        try {
          const data = await login(this.loginForm)
          this.updateUser({ user: data })
          this.$gnotify({ type: 'success', message: '登录成功' })

          let { redirectUrl } = this.$route.query // 解构当前路由信息
          this.$router.push(redirectUrl || '/') // 短路表达式
        } catch (error) {
          this.$notify({ type: 'danger', message: '登陆失败' })
        }
      } else {
        console.log('进不来')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn_box{
  padding: 10px
}
</style>
