import Vue from 'vue'

import router from './router'
import store from './Vuex/store'

import fetchInitialInfo from './Vuex/fetchInfo'

fetchInitialInfo.then(() => {
  new Vue({
    el: '#app',
    router,
    store
  })
})
