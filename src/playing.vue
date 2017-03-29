<template>
  <div class='top'>
    <p></p>
    <audio controls name='media' v-if='ifAudioTag' @ended='songEnd' @canplay='canPlay'>
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
      ifAudioTag: true
    }
  },
  mounted () {
  },
  computed: {
    currentPlaying: () => Store.state.currentPlaying,
    musicPlaying: () => Store.state.playingStatus.musicPlaying,
    volume: () => Store.state.playingStatus.volume,
  },
  watch: {
    currentPlaying () {
      this.ifAudioTag = false
      Vue.nextTick(() => {
        this.ifAudioTag = true
        Vue.nextTick(() => {
          if (this.musicPlaying === 'playing') {
            let audioTag = document.querySelector('audio')
            audioTag.play()
          }
        })
      })
    },
    musicPlaying (val) {
      let audioTag = document.querySelector('audio')
      let self = this
      if (val === 'playing') {
        audioTag.volume = 0
        audioTag.play()
        // debugger
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
    canPlay () {
      // console.log('canplay!')
      Store.commit('canPlay')
    }
  }
}
</script>
<style scoped>
div.top {
  display: none;
}
</style>
