<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      title="标题"
      class="nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信息修改 -->
    <input
      type="file"
      hidden
      ref="file"
      multiple
      accept=".png,.pdf.jpg"
      @change="selectPhone"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()"
      ><van-image round width="0.8rem" height="0.8rem" :src="avator"
    /></van-cell>
    <!-- 更新头像弹出层 -->

    <!-- 图标位置 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      ><updata-avator
        v-if="isShowPhoto"
        :avator.sync="avator"
        :photo="photo"
      ></updata-avator
    ></van-popup>
    <!--昵称 -->

    <van-cell
      title="昵称"
      is-link
      :value="username"
      @click="AddName"
    ></van-cell>
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-name @Open-Name="isShowName = false" v-model="username">
      </updata-name>
    </van-popup>
    <!-- 性别 -->
    <van-cell title="性别" :value="gender" is-link @click="AddSex"> </van-cell>
    <van-popup v-model="isShowSex" position="bottom" :style="{ height: '50%' }">
      <updata-Sex @Open-Sex="sex"></updata-Sex>
    </van-popup>
    <!-- 生日 -->

    <van-cell
      title="生日"
      :value="birthday"
      is-link
      @click="AddBirthday"
    ></van-cell>
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '50%' }"
      ><UpdataBirthday @Open-Birthday="openBirthday"></UpdataBirthday>
    </van-popup>
  </div>
</template>

<script>
// !1.点击修改头像

// !手动的触发input: file的点击事件
// !2  .获取用户选择的图片
// !-给input:file绑定change
// !-选择的图片被保存在了input:fi1e,value属性上保存的文件的绝对路径.files数组里，保存的File对象
// !.input:file
// ?如何将file对象转化为base64
// ?FileReader 文件阅读器
// ?const fr = new FileReader(): fr.readAsDataURL(file)
// ?接受的读取的结果 fr.onload=(e)=>{e.target.result /* base64*/}
// !给input: file绑定chang事件
// !选择的图片被保存在input  value里面
// !-hidden:等于display:none
// !~accept:规定file选择文件的类型
import UpdataAvator from './componens/UpdataAvator.vue'
import { resolveToBase64 } from '@/utils/index'
import UpdataName from './componens/UpdataName.vue'
import UpdataSex from './componens/UpdataSex.vue'
import UpdataBirthday from './componens/UpdataShowBirthday.vue'
import { getUserIProfileAPI } from '@/api'
import { mapMutations } from 'vuex'

// 将file对象转化为base64
export default {
  components: { UpdataAvator, UpdataName, UpdataSex, UpdataBirthday },
  data() {
    return {
      username: '',
      isShowPhoto: false,
      photo: '',
      avator: '',
      isShowName: false,
      isShowSex: false,
      isShowBirthday: false,
      // index: '',
      gender: '',
      birthday: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapMutations(['SET_SEX', 'SET_BIRTHDAY']),
    async getUserInfo() {
      const { data } = await getUserIProfileAPI()
      console.log(data.data.photo)
      this.avator = data.data.photo
      if (data.data.gender === 0) this.gender = '男'
      if (data.data.gender === 1) this.gender = '女'
      this.username = data.data.name
      this.birthday = data.data.birthday
      // console.log(this.username)
    },
    // input 绑定事件获取用户选中的图片
    async selectPhone() {
      // !获取到用户的选择的图片的file对象
      // console.log(this.$refs.file.value)
      // console.dir(this.$refs.file)
      const file = this.$refs.file.files[0]
      console.log(file)
      // file对象转化为img.src可识别属性。file对象转成base64
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   console.log(e.target.result)
      // }
      const base64 = await resolveToBase64(file)
      console.log(base64)
      this.photo = base64
      this.isShowPhoto = true
      // 解决不能连续同一张图片的bug
      this.$refs.file.value = ''
    },
    AddName() {
      this.isShowName = true
    },
    AddSex() {
      this.isShowSex = true
    },
    sex(index) {
      console.log({ index })
      if (index === '0') this.gender = '男'
      if (index === '1') this.gender = '女'
      console.log(this.gender)
      console.log(this.gender)
      this.isShowSex = !this.isShowSex
      console.log(this.isShowSex)
    },
    AddBirthday() {
      this.isShowBirthday = true
    },
    openBirthday(time) {
      this.isShowBirthday = false
      this.birthday = time
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3396fc;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
