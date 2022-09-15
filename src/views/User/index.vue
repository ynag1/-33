<template>
  <div>
    <!-- 个人信息导航 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <input
      type="file"
      hidden
      ref="file"
      accept=".png,.jpg,.pdf"
      @change="selectPhoto"
    />
    <!-- 信息修改 -->
    <van-cell is-link title="头像" @click="$refs.file.click()">
      <!-- 圆形头像 -->
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>
    <!-- 更新头像 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avator
        v-if="isShowPhoto"
        :photo="photo"
        :avator.sync="avator"
      ></update-avator
    ></van-popup>
  </div>
</template>

<script>
// 点击修改头像
// -手动触发input：file的点击事件
// 2 获取用户选择的图片
// 给Input 绑定change事件
// 选择的图片被保存在input.file.value属性上,保存的绝对路径,file数组里,保存的file对象
// File 对象，文件的二进制对象

// 3 如何 file转成 base64
// FileReader :文件阅读器
// const fr=new FileReader(); fr.readAsDataURL(file)
// 接受读取的结果：fr.onload=(e)=>{e.target.result/*base64*/}

// input:file
// -input 身上有 hidden =隐藏(display:none)
// -accept 选择文件的类型
import UpdateAvator from './components/UpdateAvator.vue'
import { resolveToBase64 } from '@/utils'
export default {
  components: { UpdateAvator },
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avator: ''
    }
  },
  methods: {
    async selectPhoto() {
      // 获取用户点击选择的file对象
      const file = this.$refs.file.files[0]
      // files 对象转成img.src可识别 base64 属性
      // file对象转成 base64
      // eslint-disable-next-line no-undef
      const base64 = await resolveToBase64(file)
      // console.log(base64)
      // 传递base64 给子组件
      this.photo = base64
      // 打开弹窗
      this.isShowPhoto = true
      // 解决不能选择同一张的bug value 发生变化的时候回发生 change 事件
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
