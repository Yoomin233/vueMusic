<template lang="html">
  <div class="playBar">
    <img src='https://vuejs.org/images/logo.png' alt="" class='cover'>
    <div class="nameAndSinger">
      <p>{{decodeURIComponent(currentPlaying.songName.replace('.mp3', ''))}}</p>
      <p>{{decodeURIComponent(currentPlaying.singer)}}</p>
    </div>
    <div class="playBtn" :class='musicPlaying?"paused":"played"' @click='switchPlayStatus'></div>
    <div class="listBtn" @click='nextSong'></div>
  </div>
</template>

<script>
import config from '../config/config'
import Store from '../Vuex/store'
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {
    currentPlaying: () => Store.state.currentPlaying,
    musicPlaying: () => Store.state.playingStatus.musicPlaying
  },
  methods: {
    switchPlayStatus () {
      Store.commit('switchPlayStatus')
    },
    nextSong () {
      Store.commit('nextSong')
    }
  }
}
</script>

<style lang="less">
  div.playBar {
    height: 3em;
    background-color: #ddd;
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    padding: .1em .4em;
    display: flex;
    background-color: rgba(255, 2552, 255, .8);
    align-items: center;
    box-sizing: border-box;
    > img {
      width: 2.8em;
      margin-right: .5em;
    }
    > div.nameAndSinger {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 60%;
      overflow-x: hidden;
      p {
        margin: .1em 0;
        &:last-child {
          font-size: .8em;
          color: #777;
        }
      }
    }
    > div.playBtn, > div.listBtn {
      width: 2em;
      height: 2em;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      &::before, &::after {
        font-family: 'icomoon' !important;
        color: #444;
      }
    }
    > div.playBtn {
      border-radius: 50%;
      border: 2px solid #999;
    }
    > div.playBtn.played {
      &::before {
        content: '\ea1c'
      }
    }
    > div.playBtn.paused {
      &::before {
        content: '\ea1d'
      }
    }
    > div.listBtn {
      &::before {
        content: '\e9bb';
        font-size: 1.2em;
      }
    }
  }

</style>
