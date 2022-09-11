<template>
  <div>
    <article-item
      v-for="item in article"
      :key="item.art_id"
      :article="item"
    ></article-item>
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
      article: []
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
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.article = data.data.results
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
    }
  }
}
</script>

<style scoped></style>
