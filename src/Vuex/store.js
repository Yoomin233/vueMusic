import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import config from '../config/config'

export default new Vuex.Store({
  state: {
    playingStatus: {
      musicPlaying: false,
      volume: 1,
      songNumber: 0,
      mode: 'shuffle'
    },
    playList: [],
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
      if (state.playingStatus.mode === 'order' || state.playingStatus.mode === 'single') {
        if (state.playingStatus.songNumber === state.playList.length) {
          state.playingStatus.songNumber = 0
          state.currentPlaying = state.playList[0]
          state.currentPlaying.src = `${config.musicServer.url}${state.currentPlaying.filename}`
        } else {
          state.playingStatus.songNumber ++
          state.currentPlaying = state.playList[state.playingStatus.songNumber]
          state.currentPlaying.src = `${config.musicServer.url}${state.currentPlaying.filename}`
        }
      } else if (state.playingStatus.mode === 'shuffle') {
        let shuffledNo = Math.floor(Math.random() * state.playList.length)
        state.currentPlaying = state.playList[shuffledNo]
        state.currentPlaying.src = `${config.musicServer.url}${state.currentPlaying.filename}`
      }
    },
    updatePlayList: (state, newList) => state.playList = newList,
    // 直接跳转到歌曲
    updateCurrentPlaying: (state, songNumber) => {
      state.playingStatus.songNumber = songNumber
      state.currentPlaying = {
        src: `${config.musicServer.url}${state.playList[songNumber].filename}`,
        fileame: state.playList[songNumber].filename,
        singer: state.playList[songNumber].filename.singer,
        songName: state.playList[songNumber].filename.songName
      }
    }
  }
})
