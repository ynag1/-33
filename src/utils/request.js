// yarn add axios 引入axios 配置axios
import axios from 'axios'
axios.defaults.baseURL = 'http://toutiao.itheima.net'
axios.defaults.timeout = 3000
// axios.create()克隆axios
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
