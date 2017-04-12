import config from '../config/config'

import {
  SWITCH_PLAY_STATUS,
  CAN_PLAY,
} from './mutation-types.js'

const modeList = ['shuffle', 'order', 'single']

export const mutations = {
  [SWITCH_PLAY_STATUS] (state) {
    if (state.playingStatus.playStatus === 'paused') {
      state.playingStatus.playStatus = 'playing'
    } else if (state.playingStatus.playStatus === 'playing') {
      state.playingStatus.playStatus = 'paused'
    }
  },
  // 缓冲结束
  [CAN_PLAY] (state, {duration}) {
    state.playingStatus.buffering = false
    state.playingStatus.duration = duration
  },
  prevSong: (state) => {

  },
  // 删除当前歌单歌曲
  removeSong: (state, index) => {
    state.currentPlayingList.songs.splice(index, 1)
    // todo: 如果删除当前播放歌曲, 则直接调用nextSong()方法...
  },
  updatePlayList: (state, newList) => state.currentPlayingList = newList,
  // 跳转到歌曲
  updateCurrentPlaying: (state, songNumber) => {
    // 更新播放序号
    state.playingStatus.songNumber = songNumber
    state.currentPlaying = {
      src: `${config.musicServer.url}${state.currentPlayingList.songs[songNumber].filename}`,
      filename: state.currentPlayingList.songs[songNumber].filename,
      singer: state.currentPlayingList.songs[songNumber].singer,
      songName: state.currentPlayingList.songs[songNumber].songName
    }
    // 推入播放历史
    if (state.playingStatus.mode !== 'single') {
      state.recentPlayed.push(songNumber)
    } else {
      // 单曲循环模式下, 只推入一次
      if (state.recentPlayed[state.recentPlayed.length - 1] !== songNumber) {
        state.recentPlayed.push(songNumber)
      }
    }
    // 开始缓冲
    state.playingStatus.buffering = true
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

export default mutations
