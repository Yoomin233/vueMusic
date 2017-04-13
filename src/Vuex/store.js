import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import config from '../config/config'
import {getAjax} from '../tools/toolsFunction'

import mutations from './mutations'

import {
  NEXT_SONG,
  FETCH_DATA,
  SWITCH_USER_TO_MAY
} from './mutation-types.js'

const Store = new Vuex.Store({
  state: {
    placeHolderImg: 'https://vuejs.org/images/logo.png',
    currentPlaying: null,
    playingStatus: {
      playStatus: 'paused',
      volume: 1,
      songNumber: 0,
      mode: 'shuffle',
      currentTime: 0,
      duration: 0,
      buffering: true
    },
    currentPlayingList: null,
    playLists: [],
    recentPlayed:[],
    user: {
      name: 'H.ymin',
      avator: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg'
    }
  },
  mutations,
  // getter are like store's built-in filters
  getters: {
    songPlayProgress: (state) => {
      return `${Math.round((state.playingStatus.currentTime/state.playingStatus.duration)*100)}%`
    }
  },
  // actions commit mutations, and can contain async operations
  actions: {
    // '下一首'方法
    [NEXT_SONG] ({state, commit}) {
      let nextSongNum
      // 顺序播放模式
      if (state.playingStatus.mode === 'order') {
        // 如果顺序到最后一首, 则跳转到第一首
        if (state.playingStatus.songNumber === state.currentPlayingList.songs.length - 1) {
          nextSongNum = 0
        // 否则播放下一首
        } else {
          nextSongNum = state.playingStatus.songNumber + 1
        }
      // 单曲循环模式
      } else if (state.playingStatus.mode === 'single') {
        nextSongNum = state.playingStatus.songNumber
      // 随机播放模式
      } else if (state.playingStatus.mode === 'shuffle') {
        nextSongNum = Math.floor(Math.random() * state.currentPlayingList.songs.length)
      }
      commit('updateCurrentPlaying', nextSongNum)
    },
    async [FETCH_DATA] ({commit}, listAddr) {
      let list = await getAjax('GET', listAddr)
      commit('updatePlayList', list)
      commit('updateCurrentPlaying', 0)
    },
    [SWITCH_USER_TO_MAY] ({commit, dispatch}) {
      commit('changeUser', {
        name: 'May',
        avator: 'http://placekitten.com.s3.amazonaws.com/homepage-samples/200/139.jpg'
      })
      dispatch('FETCH_DATA', `${config.musicServer.url}maysList.json`)
    }
  }
})
export default Store
window.Store = Store
