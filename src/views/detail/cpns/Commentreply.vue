<template>
  <div>
    <!-- 头部导航区域 -->
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft"
      ><template #title>
        <div>
          {{ replyList.length ? replyList.length + '回复' : '暂无回复' }}
        </div>
      </template></van-nav-bar
    >
    <van-cell
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
              <van-button type="default" round size="small"
                >回复{{ replyList.length }}</van-button
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
    <van-divider>全部回复</van-divider>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="100"
        @load="onLoad"
      >
        <replyList :commentList="replyList"></replyList>
      </van-list>
    </div>
    <div>
      <van-button type="default" class="footerbtn" @click="ejectPopup"
        >发表评论</van-button
      >
      <!-- 弹出框 -->
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '20%', width: '100%' }"
      >
        <message-board
          :id="item.com_id"
          :art_id="$route.query.id"
          @isShow="show = false"
          @ADD-Comment="AddComment"
        ></message-board>
      </van-popup>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/day'
import replyList from './van-cell.vue'
import MessageBoard from './MessageBoard.vue'

export default {
  data() {
    return {
      list: [],
      show: false,
      loading: false,
      finished: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    replyList: {
      type: Array,
      required: true
    }
  },
  created() {},
  components: {
    replyList,
    MessageBoard
  },
  methods: {
    onClickLeft() {
      this.$emit('isShow-reply')
    },
    ejectPopup() {
      this.show = true
    },
    AddComment(value) {
      this.$emit('new_obj', value)
    },
    onLoad() {
      // console.log(666)
      // if (this.replyList.length < 6) {
      this.finished = true
      // }
    }
  },
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
.footerbtn {
  width: 100%;
  position: fixed;
  bottom: 0;
  color: #666666;
}
</style>
