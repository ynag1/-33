<template>
  <div>
    <van-cell
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
//  map
//  - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
// 动态正则
//  - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
// - new RegExp(字符串,修饰符'ig')regular expression

// 字符串的 replace
// - 字符串.replace(正则,函数)
//  - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'
export default {
  props: {
    keywordes: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keywordes: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    highLightSuggestions() {
      const reg = new RegExp(this.keywordes, 'ig')
      // str 所有的字符串
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          // match匹配字符串无论大小写
          (match) => `<span style="color: red">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywordes)
        // console.log(data)
        // this.suggestions = data.body.options.filter((item) => Boolean(item))
        // filter(Boolean)可以过滤数组中的假值
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 1000)
  }
}
</script>

<style scoped></style>
