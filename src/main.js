import Vue from 'vue'

import router from './router'
import store from './Vuex/store'

import config from './config/config.js'

// fetch initial data
store.dispatch('FETCH_DATA',  `${config.musicServer.url}musicList.json`)
.then(() => {
  new Vue({
    el: '#app',
    router,
    store,
  })
})
