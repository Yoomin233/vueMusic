import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import config from '../config/config'

const modeList = ['shuffle', 'order', 'single']

const Store = new Vuex.Store({
  state: {
    placeHolderImg: 'https://vuejs.org/images/logo.png',
    playingStatus: {
      playStatus: 'paused',
      volume: 1,
      songNumber: 0,
      mode: 'shuffle',
      currentTime: 0,
      duration: 0,
      buffering: true
    },
    currentPlayingList: [],
    playLists: [],
    currentPlaying: {
      src: `${config.musicServer.url}Ariana%20Grande%2CJohn%20Legend%20-%20Beauty%20and%20the%20Beast.mp3`,
      filename: "Ariana%20Grande%2CJohn%20Legend%20-%20Beauty%20and%20the%20Beast.mp3",
      singer: 'Ariana%20Grande%2CJohn%20Legend',
      songName: 'Beauty%20and%20the%20Beast.mp3',
    },
    recentPlayed:[]
  },
  mutations: {
    switchPlayStatus: state => {
      if (state.playingStatus.playStatus === 'paused') {
        state.playingStatus.playStatus = 'playing'
      } else if (state.playingStatus.playStatus === 'playing') {
        state.playingStatus.playStatus = 'paused'
      }
    },
    // 缓冲结束
    canPlay: (state, duration) => {
      state.playingStatus.buffering = false
      state.playingStatus.duration = duration
    },
    // '下一首'方法
    nextSong: state => {
      let nextSongNum
      // 顺序播放模式
      if (state.playingStatus.mode === 'order') {
        // 如果顺序到最后一首, 则跳转到第一首
        if (state.playingStatus.songNumber === state.currentPlayingList.length - 1) {
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
        nextSongNum = Math.floor(Math.random() * state.currentPlayingList.length)
      }
      // 更新当前播放歌曲
      state.currentPlaying = state.currentPlayingList[nextSongNum]
      state.currentPlaying.src = `${config.musicServer.url}${state.currentPlaying.filename}`
      // 更新播放序号
      state.playingStatus.songNumber = nextSongNum
      // 推入播放历史
      if (state.playingStatus.mode !== 'single') {
        state.recentPlayed.push(nextSongNum)
      } else {
        // 单曲循环模式下, 只推入一次
        if (state.recentPlayed[state.recentPlayed.length - 1] !== nextSongNum) {
          state.recentPlayed.push(nextSongNum)
        }
      }
      // 开始缓冲
      state.playingStatus.buffering = true
      // 缓冲超时
      setTimeout(() => {
        if (state.playingStatus.buffering) {
          alert('缓冲超时, 请重试!')
        }
      }, 60 * 1e3)
      // 重置已播放时间
      Store.state.playingStatus.currentTime = 0
    },
    prevSong: (state) => {

    },
    // 删除当前歌单歌曲
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
      state.playingStatus.buffering = true
      state.recentPlayed.push(songNumber)
      setTimeout(() => {
        if (state.playingStatus.buffering) {
          alert('缓冲超时, 请重试!')
        }
      }, 60 * 1e3)
      // 重置已播放时间
      Store.state.playingStatus.currentTime = 0
    },
    updatePlayProgress: (state, time) => {
      state.playingStatus.currentTime = Math.round(time)
    },
    togglePlayMode: (state) => {
      let currentModeNo = modeList.indexOf(state.playingStatus.mode)
      let nextModeNo
      if (currentModeNo === modeList.length - 1) {
        nextModeNo = 0
      } else {
        nextModeNo = currentModeNo + 1
      }
      state.playingStatus.mode = modeList[nextModeNo]
    },
    changeCurrentTime: (state, percentage) => {
      state.playingStatus.currentTime = parseInt(state.playingStatus.duration * (percentage / 100))
    },
    changeVolume: (state, volume) => {
      state.playingStatus.volume = parseFloat((volume / 100).toFixed(1))
    }
  }
})
export default Store
window.Store = Store
