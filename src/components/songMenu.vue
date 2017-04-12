<template lang="html">
  <transition name='songNameTransition'>
    <div class="songMenu">
      <div class="shade" @click='hideSongMenu'>

      </div>
      <div class="info">
        <p class='song'>歌曲: {{decodeURIComponent(songInfo.songName)}}</p>
        <p class='singer'>歌手: {{decodeURIComponent(songInfo.singer)}}</p>
        <p class='album'>专辑: </p>
      </div>
    </div>
  </transition>
</template>

<script>
import bus from '../bus'
export default {
  data () {
    return {
      songMenuShowed: true
    }
  },
  props: ['songInfo'],
  mounted () {
  },
  methods: {
    hideSongMenu () {
      bus.$emit('hideSongMenu')
    }
  }
}
</script>

<style lang="less" scoped>
div.songMenu {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 150%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  > .shade {
    background-color: rgba(0,0,0,0.6);
    height: 100%;
  }
  > .info {
    background-color: #eee;
    padding: .5em 0;
    > p {
      margin-bottom: 0;
      margin-left: 2em;
      padding-bottom: 1em;
      border-bottom: 1px solid #ddd;
      position: relative;
      &::before {
        font-family: 'icomoon' !important;
        color: red;
        position: absolute;
        transform: translate3d(-150%, 10%, 0);
      }
    }
    > p.song::before {
      content: '\e911';
    }
    > p.singer::before {
      content: '\e910';
    }
    > p.album::before {
      content: '\e981';
    }
  }
}
.songNameTransition-enter-active, .songNameTransition-leave-active {
  transition: all .3s ease;
}
.songNameTransition-enter, .songNameTransition-leave-to {
  transform: translate3d(0, 5%, 0);
  opacity: 0;
}
</style>
