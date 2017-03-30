<template lang="html">
  <div class="top">
    <div class="songInfo">
      <span class='back' @click='hidePlayingUI'></span>
      <div class="titleSinger">
        <p>{{decodeURIComponent(currentPlaying.songName)}}</p>
        <p>{{decodeURIComponent(currentPlaying.singer)}}</p>
      </div>
      <span class='share'></span>
    </div>
    <div class="needle" :class='{needlePlayed: ifMusicPlaying}'></div>
    <div class="gramophoneDisc">
      <div class="cover" :style='{"background-image": coverImg}' :class='{coverSpin: ifMusicPlaying}'>
      </div>
    </div>
    <div class="controls">
      <p class='mode'></p>
      <p class='prevSong'></p>
      <p class='playBtn'></p>
      <p class='nextSong'></p>
      <p class='songList'></p>
    </div>
    <div class="playingUIBg" :style='{"background-image": coverImg, "opacity": blurredBgOpacity}' v-if='ifShowBlurredBg'>
    </div>
  </div>
</template>

<script>
import Store from '../Vuex/store'
import Bus from '../bus'

import Vue from 'vue'
export default {
  data () {
    return {
      ifShowBlurredBg: false,
      blurredBgOpacity: 0
    }
  },
  mounted () {
    Bus.$on('showPlayingUI', () => {
      setTimeout(() => {
        this.ifShowBlurredBg = true,
        this.blurredBgOpacity = 1
      }, 1e3)
    })
  },
  computed: {
    coverImg: () => `url(${Store.state.placeHolderImg})`,
    currentPlaying: () => Store.state.currentPlaying,
    ifMusicPlaying: () => Store.state.playingStatus.musicPlaying === 'playing'
  },
  methods: {
    switchPlayStatus () {
      Store.commit('switchPlayStatus')
    },
    hidePlayingUI () {
      this.ifShowBlurredBg = false
      Vue.nextTick(() => {
        this.blurredBgOpacity = 0
        Bus.$emit('hidePlayingUI')
      })
    }
  }
}
</script>

<style lang="less" scoped>
div.top {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(100,100,100);
  div.songInfo {
    display: flex;
    height: 2em;
    color: #fff;
    font-size: 2em;
    align-items: center;
    padding: 0 .5em;
    flex-direction: row;
    position: relative;
    z-index: 3;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      bottom: -1px;
      background-image: linear-gradient(to right, transparent 0%, rgba(200, 200, 200, 0.5) 50%, transparent 100%);
      z-index: -1;
    }
    > span.back {
      &::before {
        font-family: 'icomoon' !important;
        content: '\ea40';
        font-size: .8em;
      }
    }
    > div.titleSinger {
      width: 80%;
      height: 100%;
      padding: 0 .5em;
      > p {
        margin: 0 auto;
      }
      > p:first-child {
        font-size: .8em;
        white-space: nowrap;
        width: 100%;
      }
      > p:nth-child(2) {
        font-size: .5em;
        color: #bbb;
      }
    }
    > span.share {
      &::before {
        font-family: 'icomoon' !important;
        content: '\ea82';
        font-size: .8em;
      }
    }
  }
  div.playingUIBg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
    transition: all .5s ease;
    -webkit-filter: blur(80px) brightness(.4);
    filter: blur(80px) brightness(.4);
    transition: opacity 1s linear;
  }
  div.needle {
    width: 50%;
    height: 20em;
    background-image: url('../assets/turntableArm.png');
    background-size: 100%;
    background-repeat: no-repeat;
    margin-left: 10%;
    transform:rotate(.1turn);
    transform-origin: 75% 16%;
    transition: transform .5s ease;
    z-index: 1;
    position: absolute;
    transform: rotate(-.24turn);
    top: 1em;
  }
  div.needlePlayed {
    transform: rotate(-.2turn);
  }
  div.gramophoneDisc {
    width: 17em;
    height: 17em;
    border-radius: 50%;
    margin: 5em auto;
    background-color: #fff;
    background: url('../assets/vinyl.png') center / 100%;
    position: absolute;
    left: 0;
    right: 0;
    div.cover {
      position: absolute;
      width: 70%;
      height: 70%;
      background-color: #fff;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border-radius: 50%;
      background-position: center;
      background-size: contain;
      animation: spin 30s linear infinite;
      animation-play-state: paused;
    }
    div.coverSpin {
      animation-play-state: running;
    }
  }
  div.controls {
    position: absolute;
    bottom: 5vh;
    left: 0;
    width: 100%;
    height: 3em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5%;
    > p {
      width: 20%;
      margin: 0 auto;
      &::before {
      font-family: 'icomoon' !important;
      color: #fff;
      }
    }
    > p.mode {
      &::before {
        content: '\ea30'
      }
    }
  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
