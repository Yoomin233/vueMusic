import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import config from '../config/config'

const Store = new Vuex.Store({
  state: {
    playingStatus: {
      musicPlaying: false,
      volume: 1,
      songNumber: 0,
      mode: 'shuffle'
    },
    currentPlayingList: [],
    playLists: [],
    currentPlaying: {
      src: `${config.musicServer.url}ABBA%20-%20Happy%20New%20Year.mp3`,
      filename: "ABBA%20-%20Happy%20New%20Year.mp3",
      singer: 'ABBA',
      songName: 'Happy%20New%20Year.mp3',
    }
  },
  mutations: {
    switchPlayStatus: state => state.playingStatus.musicPlaying = !state.playingStatus.musicPlaying,
    // '下一首'方法
    nextSong: state => {
      if (state.playingStatus.mode === 'order') {
        if (state.playingStatus.songNumber === state.currentPlayingList.length - 1) {
          state.playingStatus.songNumber = 0
          state.currentPlaying = state.currentPlayingList[0]
        } else {
          state.playingStatus.songNumber ++
          state.currentPlaying = state.currentPlayingList[state.playingStatus.songNumber]
        }
      } else if (state.playingStatus.mode === 'single') {
        state.currentPlaying = state.currentPlayingList[state.playingStatus.songNumber]
      } if (state.playingStatus.mode === 'shuffle') {
        let shuffledNo = Math.floor(Math.random() * state.currentPlayingList.length)
        state.currentPlaying = state.currentPlayingList[shuffledNo]
      }
      state.currentPlaying.src = `${config.musicServer.url}${state.currentPlaying.filename}`
    },
    removeSong: (state, index) => {
      state.currentPlayingList.splice(index, 1)
      // todo: 如果删除当前播放歌曲, 则直接调用nextSong()方法...
    },
    updatePlayList: (state, newList) => state.currentPlayingList = newList,
    // 直接跳转到歌曲
    updateCurrentPlaying: (state, songNumber) => {
      state.playingStatus.songNumber = songNumber
      state.currentPlaying = {
        src: `${config.musicServer.url}${state.currentPlayingList[songNumber].filename}`,
        filename: state.currentPlayingList[songNumber].filename,
        singer: state.currentPlayingList[songNumber].singer,
        songName: state.currentPlayingList[songNumber].songName
      }
    },
    changePlayingMode: (state, payload) => {
      if (typeof payload === 'string' && (payload === 'order' || payload === 'single' || payload === 'shuffle')) {
        state.playingStatus.mode = payload
      }
    }
  }
})
export default Store
