import Vue from 'vue'

import router from './router'
import store from './Vuex/store'

// fetch initial data
store.dispatch('FETCH_DATA').then(() => {
  new Vue({
    el: '#app',
    router,
    store,
  })
})
