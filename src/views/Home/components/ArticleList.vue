<template>
  <div class="article">
    <!-- 触底的时候触发 Load 事件 -->
    <!-- offset：滚动条时距离底部多少的时候触发load事件默认值是300 -->
    <!-- immediate-check：初渲染的时候是否执行load事件 默认值是true -->
    <!-- v-model="loading"-->
    <!--loading为true的时候，load事件会被触发  -->
    <!--loading为false的时候，load事件不会被触发  -->
    <!--loading会在load事件执行后 被van-list组件自动设置为true 需要手动的改为false  -->
    <!-- finished:布尔值 false:load事件会被触发  数据已全部加载完毕 true:load不会被触发设 并且显示finished-text文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了~~~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in article"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: { ArticleItem },
  name: 'ArticleList',
  data() {
    return {
      article: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  comments: { ArticleItem },
  props: {
    id: [String, Number]
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    // 获取第一页的请求
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        console.log()
        this.article = data.data.results
        // 保存下一页的时间戳，用于分页
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js错误，上抛，400上抛中文，507原封不动上抛
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    // 获取下一页的数据
    async getNextPageArticle() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 发起请求
        const { data } = await getArticles(this.id, this.preTimestamp)
        // 判定没有数据时就出现文字提示
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 添加到 article
        // 判定是否是下刷新
        if (this.refreshLoading) {
          // 如果是就添加到前面
          this.article.unshift(...data.data.results)
        } else {
          // 添加到后面
          this.article.push(...data.data.results)
        }
        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
        // 更改 loading
        this.loading = false
      } catch (error) {
        // 提示错误信息
        this.error = true
      } finally {
        // finally 语句一定会执行
        // 更改 loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 给盒子添加自己的滚动条  定高overflow/auto
.article {
  height: calc(100vh - 92px - 100px - 83px);
  overflow: auto;
  //&:当前元素的父亲
  // -webkit-scrollbar滚动条的槽
  // -webkit-scrollbar-thumb滚动滑块
  // transparent透明
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
  }
}
</style>
