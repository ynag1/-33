import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 声明同一个变量 放到vuex
// 声明：在state里
// 取：$store.state.属性名

// vuex 修改数据
// 自产自销 规范：函数命名采用大驼峰
// mutations：函数 里面的函数参数
// state ：数据
// payload 载荷 触发mutations的参数
// mutations触发里面的方法
// this.$store.commit('mutations方法名字'，参数)
// getters相当于computed计数属性
// getters的函数 第一个参数是state
// 获取： $store.getters.参数名
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_CONST(state, payload) {
      state.count += payload
    }
  },
  actions: {},
  modules: {}
})
