import store from '@/store'
// yarn add axios 引入axios 配置axios
import axios from 'axios'
axios.defaults.baseURL = 'http://toutiao.itheima.net'
axios.defaults.timeout = 3000
// axios.create()克隆axios
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
request.interceptors.request.use(function (config) {
  const {
    getters: { isLogin },
    state: { tokenObj }
  } = store
  if (isLogin) {
    config.headers.Authorization = `Bearer ${tokenObj.token}`
  }
  return config // 必须返回config
})
export default request
