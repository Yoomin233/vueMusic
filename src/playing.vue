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
import Store from './Vuex/store'
import Vue from 'vue'
export default {
  data () {
    return {
      progressTimer: null
    }
  },
  mounted () {
  },
  computed: {
    currentPlaying: () => Store.state.currentPlaying,
    playStatus: () => Store.state.playingStatus.playStatus,
    volume: () => Store.state.playingStatus.volume,
  },
  watch: {
    currentPlaying () {
      let audioTag = document.querySelector('audio')
      audioTag.load()
      if (this.playStatus === 'playing') {
        audioTag.play()
      }
    },
    playStatus (val) {
      let audioTag = document.querySelector('audio')
      let self = this
      if (val === 'playing') {
        audioTag.volume = 0
        // 开启监听进度
        this.progressTimer = setInterval(() => {
          Store.commit('updatePlayProgress', audioTag.currentTime)
        }, 1000)
        // 开始播放
        audioTag.play()
        setTimeout(function inlineFunc () {
            audioTag.volume += 0.1
            if (audioTag.volume < self.volume - 0.1) {
              setTimeout(inlineFunc, 50)
            }
        }, 50)
      } else if (val === 'paused') {
        setTimeout(function inlineFunc () {
          audioTag.volume -= 0.1
          if (audioTag.volume > 0.1) {
            setTimeout(inlineFunc, 50)
          } else {
            clearInterval(self.progressTimer)
            audioTag.pause()
          }
        }, 50)
      }
    }
  },
  methods: {

    songEnd () {
      Store.commit('nextSong')
    },
    canPlay (e) {
      // console.log('canplay!')
      Store.commit('canPlay', Math.round(e.target.duration))
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
