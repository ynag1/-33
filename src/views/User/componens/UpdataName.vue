<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="name"
      rows="2"
      autosize
      maxlength="10"
      placeholder="请输新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { NicknameModifyAPI } from '@/api'
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      name: this.value
    }
  },
  created() {
    console.log(this.name)
    console.log(this.value)
  },
  methods: {
    ...mapMutations(['SET_NICKNAME']),
    onClickLeft() {
      this.$emit('Open-Name')
      console.log(this.nickname)
    },
    async onClickRight() {
      try {
        const { data } = await NicknameModifyAPI(this.name)
        if (data.message === 'OK') {
          this.$toast.success('用户名更新成功')
          // this.SET_NICKNAME(this.message)
          // this.$store.commit()
          this.$emit('Open-Name', this.name)
        }
      } catch (err) {}
    }
  }
  // computed: {
  //   ...mapState(['nickname'])
  // }
}
</script>

<style></style>
