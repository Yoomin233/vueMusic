import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import mainUI from './App.vue'
import searchComponent from './search.vue'

const router = new VueRouter({
  routes: [
    // 默认路由
    {
      path: '/',
      component: mainUI
    },
    // 一级路由, 用户主界面
    {
      path: '/main',
      component: mainUI,
    },
    {
      path: '/search',
      component: searchComponent
    }
  ]
})

export default router
