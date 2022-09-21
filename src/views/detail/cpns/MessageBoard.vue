<template>
  <div>
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    ></van-field>
    <div class="release" @click="addComment">发布</div>
  </div>
</template>

<script>
import { AddCommentAPI } from '@/api'
export default {
  data() {
    return {
      message: ''
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    art_id: {
      type: String
    }
  },
  methods: {
    async addComment() {
      if (this.message.length === 0 || !this.$store.state.tokenObj.token) return
      try {
        /* eslint-disable */
        const { data } = await AddCommentAPI({
          target: this.id,
          content: this.message,
          art_id: this.art_id
        })

        // console.log(data.data.new_obj)
        this.$emit('ADD-Comment', data.data.new_obj)
        // this.$store.commit('SET_NEW_OBJ', data.data.new_obj, )
        this.$emit('isShow')
        this.$toast.success('发布留言成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.van-field {
  margin-left: 30px;
  margin-top: 30px;
  width: 600px;
  height: 180px;
  background-color: #f5f7f9;
}

.release {
  width: 110px;
  height: 180px;

  float: right;
  margin-top: -180px;
  line-height: 180px;
  text-align: center;
  font-size: 26px;
  color: #b5d1ec;
}
</style>
