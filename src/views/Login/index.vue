<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="form" ref="from">
      <!-- van-field:输入框，text,password,文本域 -->
      <!-- v-model:用户输入的值 -->
      <!-- name:表示表单项 -->
      <!-- rules数组 required是否必选,message错误提示 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"> </span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <van-button
            type="default"
            class="btn"
            block
            size="small"
            round
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="30 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          /> </template
      ></van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入
import { mapMutations } from 'vuex'
import { mobileRules, codeRules } from './rule'
// 引入API
import { login, sendCodeAPI } from '@/api'

// toke 省份证标识客户 用处：标识
console.log(login)
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      // 登录
      // this.$toast.loading({
      //   message: '加载中...',提示文本内容
      //   forbidClick: true,是否禁止点击
      //   duration: 0展示的时长 为0，一直展示
      // })
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        // 把token存进vuex
        this.SET_TOKEN(data.data)
        // 跳转的路由
        this.$router.push('/profile')
        // 登录成功提示
        this.$toast.success('登录成功')
      } catch (error) {
        // 划分失败的提示
        // this.$toast.fail('登录失败')
        // error 1.js的误差2.axios封装的error对象
        // error.response.data后端返回的数据
        // error.response.status后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          console.dir(error)
          this.$toast.clear()
          // throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 验证码用户是否输入了有效的手机号
      await this.$refs.from.validate('mobile')
      // console.log('发送请求')
      this.loading()
      // 发送请求
      try {
        await sendCodeAPI(this.mobile)
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.statu === 404
        ) {
          // axios错误
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
        // 显示倒计时组件
        this.$toast.fail('发送验证码失败')
      }
      this.isShowCodeBtn = false
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式只用于当前的组件
// vue-cli提供语法 :deep() 深度选择器
.nav-bar {
  background-color: #3296fa;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
