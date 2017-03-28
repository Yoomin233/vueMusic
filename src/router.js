import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import mainUI from './App.vue'
import playing from './playing.vue'

import songList from './songList.vue'
import searchComponent from './search.vue'
import searchResultComponent from './searchResult.vue'

export default new VueRouter({
  routes: [
    // 默认路由
    {
      name: 'default',
      path: '/',
      components: {
        mainUI,
        playing
      }
    },
    // 一级路由, 用户主界面 + 播放器
    {
      name: 'mainUI',
      path: '/main',
      components: {
        mainUI,
        playing
      },
      children: [
        {
          name: 'songList',
          path: 'songList',
          component: songList
        }
      ]
    },
    {
      name: 'search',
      path: '/search',
      components: {
        mainUI: searchComponent,
        playing
      }
    },
    {
      name: 'searchResult',
      path: '/searchResult',
      components: {
        mainUI: searchResultComponent,
        playing
      }
    }
  ]
})
