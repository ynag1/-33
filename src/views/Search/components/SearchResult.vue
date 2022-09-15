<template>
  <div class="result">
    <!-- 搜索结果 -->
    <van-list
      @load="getResults"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: 'detail',
            query: { aticleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywordes: {
      type: String,
      perPage: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // // 测试语句
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        // 发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywordes
        )
        const results = data.data.results
        if (results.length === 0) {
          // 没有更多提示
          this.finished = true
        }
        // 保存数据
        // console.log(data)
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        // loading 关闭
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  //overlay 和auto用法基本一致
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
