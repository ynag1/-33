<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywordes"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <component
      :keywordes="keywordes"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'
// class/style 属性的特殊
// vue自动帮你把class和style合并到组件的根节点
export default {
  data() {
    return {
      keywordes: '',
      isShowSearchResult: false
    }
  },
  components: { SearchHistory, SearchResult, SearchSuggestion },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史显示的条件：搜索框的值
      if (this.keywordes === '') {
        return 'SearchHistory'
      }
      // 搜索结果：触发搜索时，显示渲染结果
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 竟不渲染搜索历史又不渲染搜索结果
      // 搜索建议：搜索框有值，平且不渲染搜索结果
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywordes) {
      // 把 keywords关键词存起来
      // 用户手动敲回车，点击了搜索建议
      // 去重new Set 获取没有去重的数组，放在new Set(arr) [...arr]
      const distinctHistoeies = [...new Set([keywordes, ...this.histories])]
      // 储存之前的搜索历史,
      this.SET_HISTORIES(distinctHistoeies)
      this.keywordes = keywordes
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
