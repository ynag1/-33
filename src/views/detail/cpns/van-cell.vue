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
              <van-button type="default" round size="small">回复0</van-button>
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
  </div>
</template>

<script>
import dayjs from '@/utils/day'
export default {
  props: {
    commentList: {
      type: Array,
      required: true
    }
  },
  created() {},
  computed: {
    time() {
      return (time) => {
        return dayjs(time).fromNow()
      }
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
