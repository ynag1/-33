import Vue from 'vue'
import Vuex from 'vuex'
import createBundleRenderer from 'vuex-persistedstate'
Vue.use(Vuex)
// 封装 本地储存
// 下载 yarn add vuex - persistedstate@3.2.1
// 引入 import createBundleRenderer from 'vuex-persistedstate'
// 调用 plugins: [createBundleRenderer()],

// 配置项
// key:默认值时vuex
// storage: 储存的方式，默认值时本地储存
// reducer 指定持久化那些数据，函数 return一个对象，对象就作为存储的方式 参数 state
export default new Vuex.Store({
  plugins: [
    createBundleRenderer({
      key: 'MEIMA_TOUTIAO',
      // storage: window.sessionStorage,
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 把token 存在 vuex里
      state.tokenObj = token
    }
  }
})
