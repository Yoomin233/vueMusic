<template>
  <div class='top'>
    <p></p>
    <audio controls name='media'>
      <source :src='currentPlaying.src' type='audio/mpeg'/>
    </audio>
  </div>
</template>
<script>
import config from './config/config'
import Store from './Vuex/store'
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {
    currentPlaying: () => Store.state.currentPlaying,
    musicPlaying: () => Store.state.playingStatus.musicPlaying,
    volume: () => Store.state.playingStatus.volume,
    songNumber: () => Store.state.playingStatus.songNumber
  },
  watch: {
    songNumber () {
      console.log('heh')
    },
    musicPlaying (val) {
      let audioTag = document.querySelector('audio')
      let self = this
      if (val) {
        audioTag.volume = 0
        audioTag.play()
        // debugger
        setTimeout(function inlineFunc () {
            audioTag.volume += 0.1
            if (audioTag.volume < self.volume - 0.1) {
              setTimeout(inlineFunc, 50)
            }
        }, 50)
      } else {
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
  }
}
</script>
<style scoped>
div.top {
  display: none;
}
</style>
