import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import config from '../config/config'

export default new Vuex.Store({
  state: {
    playingStatus: {
      musicPlaying: false,
      volume: 1,
      songNumber: 0
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
    nextSong: state => {
      if (state.playingStatus.songNumber === state.playList.length) {
        state.playingStatus.songNumber = 0
        this.a.commit('updateCurrentPlaying', state.playList[0])
      } else {
        state.playingStatus.songNumber ++
        // debugger
        this.a.commit('updateCurrentPlaying', state.playList[state.playingStatus.songNumber])
      }
    },
    updatePlayList: (state, newList) => state.playList = newList,
    updateCurrentPlaying: (state, Obj = {src:'', singer:'', name:''}) => {
      state.currentPlaying = {
        src: `${config.musicServer.url}${Obj.filename}`,
        fileame: Obj.filename,
        singer: Obj.singer,
        songName: Obj.songName
      }
    }
  }
})
