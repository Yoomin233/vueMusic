<template>
  <div class='top'>
    <p></p>
    <audio controls name='media' @ended='songEnd' @canplay='canPlay($event)' @progress='updateSongPlayProgress($event)'>
      <source :src='currentPlaying.src' type='audio/mpeg'/>
    </audio>
  </div>
</template>
<script>
import config from './config/config'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      progressTimer: null,
    }
  },
  mounted () {
    this.audioTag = document.querySelector('audio')
  },
  computed: mapState({
    currentPlaying: 'currentPlaying',
    playStatus: (state) => state.playingStatus.playStatus,
    volume: (state) => state.playingStatus.volume,
    currentTime: (state) => state.playingStatus.currentTime
  }),
    // currentPlaying: () => Store.state.currentPlaying,
    // playStatus: () => Store.state.playingStatus.playStatus,
    // volume: () => Store.state.playingStatus.volume,
    // currentTime: () => Store.state.playingStatus.currentTime
  watch: {
    currentPlaying () {
      this.audioTag.load()
      if (this.playStatus === 'playing') {
        this.audioTag.play()
      }
    },
    playStatus (val) {
      let self = this
      if (val === 'playing') {
        this.audioTag.volume = 0
        // 开启监听进度
        this.progressTimer = setInterval(() => {
          Store.commit('updatePlayProgress', this.audioTag.currentTime)
        }, 1000)
        // 开始播放
        this.audioTag.play()
        setTimeout(function inlineFunc () {
            self.audioTag.volume += 0.1
            if (self.audioTag.volume < self.volume - 0.1) {
              setTimeout(inlineFunc, 50)
            }
        }, 50)
      } else if (val === 'paused') {
        setTimeout(function inlineFunc () {
          self.audioTag.volume -= 0.1
          if (self.audioTag.volume > 0.1) {
            setTimeout(inlineFunc, 50)
          } else {
            clearInterval(self.progressTimer)
            self.audioTag.pause()
          }
        }, 50)
      }
    },
    currentTime: (val) => {
      let audioTag = document.querySelector('audio')
      if (Math.abs(val - audioTag.currentTime) > 5) {
        audioTag.currentTime = val
      }
    },
    volume: (val) => {
      let audioTag = document.querySelector('audio')
      audioTag.volume = val
    }
  },
  methods: {
    songEnd () {
      Store.dispatch('NEXT_SONG')
    },
    canPlay (e) {
      // console.log('canplay!')
      Store.commit('CAN_PLAY', {
        duration: Math.round(e.target.duration)
      })
    },
    updateSongPlayProgress (e) {
      // console.log(e)
    }
  }
}
</script>
<style scoped>
div.top {
  display: none;
}
</style>
