import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)
// SPA 首屏加载速度慢
// 路由懒加载--使用到了路由页面，再去请求
// 懒加载的 chunk 默认的名字是模块的路径
// webpack魔法注释:/* webpackChunkName :"新名字" */
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    // 浏览器会把空格清除
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:" base" */ '@/views/video')
      },
      {
        path: '/Qa',
        component: () => import('@/views/Qa')
      },
      {
        path: '/profile',
        component: () => import(/* webpackChunkName:" base" */ '@/views/My')
      }
    ]
  },
  {
    path: '/Login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
