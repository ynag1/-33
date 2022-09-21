<template>
  <div class="article">
    <!-- 头部 标题-->
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.push('/')" />
    <!-- 新闻内容 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      offset="80"
      @load="onLoad"
    >
      <div class="list">
        <article class="markdown-body">
          <div v-html="NewList.title" class="title"></div>
          <van-cell title="单元格" is-link class="photo" :border="false">
            <template #title>
              <div class="left">
                <van-image
                  round
                  width="1.2rem"
                  height="1.2rem"
                  :src="NewList.aut_photo"
                />
                <div class="right">
                  <div v-html="NewList.aut_name"></div>
                  <br />
                  <div v-html="NewList.pubdate"></div>
                </div>
              </div>
            </template>
            <template #right-icon v-if="NewList.is_followed">
              <van-button
                icon="success"
                type="default"
                class="Concerned"
                round
                @click="Unfriend"
                >已关注</van-button
              >
            </template>
            <template #right-icon v-else>
              <van-button
                icon="plus"
                type="info"
                class="info"
                round
                @click="FollowUsers"
                >关注</van-button
              >
            </template>
          </van-cell>
          <div v-html="NewList.content"></div>
          <van-divider dashed style="margin-top: 30px"> 正文结束</van-divider>
        </article>
        <!-- 评论列表 -->
        <div><comment-list :commentList="commentList"></comment-list></div>
      </div>
    </van-list>

    <!-- 底部导航 -->
    <div>
      <van-goods-action class="footer">
        <van-goods-action-button
          type="default"
          text="写评论"
          class="pl-button"
          @click="isShowPl"
        />
        <van-goods-action-icon
          icon="comment-o"
          :badge="this.commentList.length"
        />
        <van-goods-action-icon
          color="#ff5000"
          icon="star"
          v-if="NewList.is_collected"
          @click="RemoveCollection"
        />
        <van-goods-action-icon icon="star-o" v-else @click="collect" />

        <van-goods-action-icon icon="good-job-o" :badge="num" @click="GiveUp" />
        <van-goods-action-icon icon="share" />
      </van-goods-action>
    </div>
    <!-- 弹出框 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '20%', width: '100%' }"
    >
      <message-board
        :id="$route.query.id"
        @isShow="show = false"
        @ADD-Comment="AddComment"
      ></message-board>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import {
  getArticleAPI,
  FollowUsersAPI,
  UnfriendAPI,
  getAllCommentAPI,
  AddcollectAPI,
  RemoveCollectAPI,
  ArticlesPraiseAPI,
  RemoveArticlesPraiseAPI
} from '@/api'
import MessageBoard from './cpns/MessageBoard.vue'
import CommentList from './cpns/CommentList.vue'
export default {
  components: { MessageBoard, CommentList },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      commentList: [],
      show: false,
      NewList: {},
      imgList: [],
      num: '',
      lastID: ''
    }
  },

  created() {
    this.getArticle()
    this.getAllComment()
  },
  methods: {
    async onLoad() {
      console.log(66)
      const { data } = await getAllCommentAPI(
        'a',
        this.$route.query.id,
        this.lastID
      )
      console.log(this.lastID)
      this.commentList = [...this.commentList, ...data.data.results]
      if (!data.data.result) {
        this.finished = true
      }
      // this.lastID = this.commentList.at(-1).com_id
      console.log(data)
    },
    async getArticle() {
      const { data } = await getArticleAPI(this.$route.query.id)

      this.NewList = data.data
      // 图片预览，一定要放到nextick后面获取dom元素

      this.$nextTick(() => {
        const body = document.querySelector('.markdown-body')

        const imgs = body.querySelectorAll('img')
        imgs.forEach((item, index) => {
          this.imgList.push(item.src)
          item.onclick = () => {
            ImagePreview({ images: this.imgList, startPosition: index })
          }
        })
      })
    },
    // 封装获取评论列表请求
    async getAllComment() {
      console.log(666)
      try {
        const { data } = await getAllCommentAPI('a', this.$route.query.id)
        // console.log(666)

        console.log(data.data.results)
        this.commentList = data.data.results
        this.lastID = this.commentList.at(-1).com_id
        this.loading = false
        // if()
        // this.$store.commit('SET_NEW_OBJ', ...data.data.results)
      } catch (e) {}
    },
    isShowPl() {
      this.show = true
    },
    AddComment(value) {
      this.commentList = [value, ...this.commentList]
    },
    async FollowUsers() {
      const { data } = await FollowUsersAPI(this.NewList.aut_id)
      console.log(data)
      this.NewList.is_followed = true
    },
    async Unfriend() {
      await UnfriendAPI(this.NewList.aut_id)

      this.NewList.is_followed = false
    },
    // 收藏
    async collect() {
      const { data } = await AddcollectAPI(this.$route.query.id)
      // console.log(data)
      if (data.message === 'OK') {
        this.NewList.is_collected = true
      }
    },
    // 取消收藏
    async RemoveCollection() {
      const { data } = await RemoveCollectAPI(this.$route.query.id)
      this.NewList.is_collected = false
      console.log(data)
    },
    async GiveUp() {
      if (this.num === 1) {
        await RemoveArticlesPraiseAPI(this.$route.query.id)
        this.num = ''
        return
      }
      const { data } = await ArticlesPraiseAPI(this.$route.query.id)
      if (data.message === 'OK') {
        this.num = 1
      }
      // console.log(data)
    }
  }
}
</script>

<style scoped>
.article {
  padding-bottom: 100px;
}
.title {
  font-size: 40px;
  line-height: 50px;
  min-height: 80px;
  font-weight: 700;
  padding: 40px 0;
}
.heading {
  font-size: 190px !important;
}
.photo {
  margin-top: 15px;
  margin-bottom: 50px;
  padding: 0px !important;
}

.info {
  width: 170px;
  height: 54px;
  font-size: 12px;
  margin-top: 20px;
}
.left {
  display: flex;
  height: 100%;
}

.right {
  padding-top: 15px;
  line-height: 20px;
  margin-left: 20px;

  font-size: 12px;
}
.list {
  padding-left: 40px;
  padding-right: 40px;
  height: calc(100vh - 92px);
  overflow: auto;
}
.pl-button {
  width: 282px;
  height: 40px;
  /* background-color: yellow; */
  border: 1px solid #cacacb;
}

.Concerned {
  width: 170px;
  height: 54px;
  font-size: 12px;
  margin-top: 20px;
}
.footer {
  border-top: 0.5px solid #cacacb;
}
.orange {
  background-color: orange;
}
</style>
