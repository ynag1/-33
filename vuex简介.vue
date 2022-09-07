<template>
  <div>
    <!-- <router-view ></router-view> -->
    <h1>{{ count }}</h1>
    <h1>const的10倍：{{ bigNum }}</h1>
    <button @click="SET_CONST(10)">点击加</button>
  </div>
</template>

<script>
// mapState 把vuwx里面的state映射到 computed
// 使用 引入mapState:函数返回一个对象
// 参数：['映射的属性']
// mapGetters 把vuex里面的getters映射到 computed
// mapMutations 把vuex的 方法映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
console.log(mapState(['count']))
// git log 查看commit记录
// git status 查看的仓库的状态
// git add . 提交到暂存区
// git commit -m ''
// feat:新增特性 style:样式的修改 fixed:debug comment:添加了注释
// 引入vant 再main.js引入所有组件
// rem适配 下载yarn add amfe-flexible
// 在main.js 中引入 import 'amfe-flexible'
// 将 `px` 转为 `rem`
// 下载包 yarn add postcss-pxtorem
// 告诉postcss使用插件  新建文件夹 .postcssrc.js
export default {
  data() {
    return {}
  },
  methods: {
    // incrememt() {
    //   // this.$store.commit('SET_CONST', 10)
    // }
    ...mapMutations(['SET_CONST'])
  },
  computed: {
    // const() {
    //   return this.$store.state.const
    // }
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
