<template>
  <div>
    <van-cell v-for="(item, index) in commentList" :key="index"
      ><template #title>
        <div class="userinfo">
          <van-image
            round
            width="1.1rem"
            height="1.1rem"
            :src="item.aut_photo"
          />
          <div class="pl-list">
            <div>{{ item.aut_name }}</div>
            <div>{{ item.content }}</div>
            <div class="huifu">
              <div>{{ time(item.pubdate) }}</div>
              <van-button type="default" round size="small" @click="reply(item)"
                >回复{{ item.reply_count }}</van-button
              >
            </div>
          </div>
        </div></template
      >

      <template #right-icon>
        <van-button
          type="default"
          icon="good-job-o"
          round
          size="mini"
          :border="false"
          >赞</van-button
        ></template
      >
    </van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }"
      ><commentreply
        @isShow-reply="show = false"
        :item="item"
        :replyList="replyList"
        @new_obj="newObj"
      ></commentreply
    ></van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/day'
import Commentreply from './Commentreply.vue'
import { getAllCommentAPI } from '@/api'
export default {
  components: { Commentreply },
  props: {
    commentList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false,
      item: {},
      replyList: []
    }
  },
  created() {
    console.log(this.$store.state.newObj)
  },
  computed: {
    time() {
      return (time) => {
        return dayjs(time).fromNow()
      }
    }
  },
  methods: {
    async reply(item) {
      this.show = true
      this.item = item
      const { data } = await getAllCommentAPI('c', item.com_id)
      console.log(data.data.results)
      // if (data.data.results.length === 0) return
      this.replyList = data.data.results
      // this.$store.commit('SET_ITEM', item)
    },
    newObj(value) {
      this.replyList = [value, ...this.replyList]
    }
  }
}
</script>

<style scoped lang="less">
.userinfo {
  display: flex;
}
.huifu {
  margin-top: 20px;

  display: flex;
  :deep(.van-button) {
    margin-left: 40px;
    margin-top: 5px;
    width: 200px;
    height: 45px;
  }
}

.pl-list {
  margin-left: 20px;
}
</style>
