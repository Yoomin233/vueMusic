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
    <div class="needle" :class='{needlePlayed: playStatus === "playing"}'></div>
    <div class="gramophoneDisc">
      <div class="cover" :style='{"background-image": coverImg}' :class='{coverSpin: playStatus === "playing"}'>
      </div>
    </div>
    <div class="songMenu">

    </div>
    <div class="progressBar">
      <div class="playedTime">
        {{songCurrentTime}}
      </div>
      <div class="mainBar">
        <div class="playedBar" :style="{width: songPlayProgress}">

        </div>
      </div>
      <div class="songDuration">
        {{songDuration}}
      </div>
    </div>
    <div class="controls">
      <p class='mode' :class='playMode' @click='togglePlayMode'></p>
      <p class='prevSong'></p>
      <p class='playBtn' :class='playStatus' @click='switchPlayStatus'></p>
      <p class='nextSong' @click='nextSong'></p>
      <p class='songList' @click='showPlayBarList'></p>
    </div>
    <transition name='playBarListShow'>
      <keep-alive>
        <play-bar-list class="playBarList"
        v-show='ifPlayBarListShow'
        ></play-bar-list>
      </keep-alive>
    </transition>
    <div class="playingUIBg" :style='{"background-image": coverImg, "opacity": blurredBgOpacity}' v-if='ifShowBlurredBg'>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import Store from '../Vuex/store'
import Bus from '../bus'


import playBarList from './playBarList.vue'

import {formatTime} from '../tools/toolsFunction'

export default {
  data () {
    return {
      ifShowBlurredBg: false,
      blurredBgOpacity: 0,
      ifPlayBarListShow: false
    }
  },
  mounted () {
    Bus.$on('showPlayingUI', () => {
      setTimeout(() => {
        this.ifShowBlurredBg = true,
        this.blurredBgOpacity = 1
      }, 1e3)
    })
    Bus.$on('hidePlayBarList', () => {
      this.ifPlayBarListShow = false
    })
  },
  components: {
    playBarList
  },
  computed: {
    coverImg: () => `url(${Store.state.placeHolderImg})`,
    currentPlaying: () => Store.state.currentPlaying,
    playStatus: () => {
      if (Store.state.playingStatus.buffering) {
        return 'buffering'
      } else {
        return Store.state.playingStatus.playStatus
      }
    },
    playMode: () => Store.state.playingStatus.mode,
    songDuration: () => formatTime(Store.state.playingStatus.duration),
    songCurrentTime: () => formatTime(Store.state.playingStatus.currentTime),
    songPlayProgress: () => `${(Store.state.playingStatus.currentTime/Store.state.playingStatus.duration)*100}%`
  },
  methods: {
    switchPlayStatus () {
      Store.commit('switchPlayStatus')
    },
    togglePlayMode () {
      Store.commit('togglePlayMode')
    },
    nextSong () {
      Store.commit('nextSong')
    },
    showPlayBarList () {
      this.ifPlayBarListShow = true
    },
    hidePlayingUI () {
      this.ifShowBlurredBg = false
      Vue.nextTick(() => {
        this.blurredBgOpacity = 0
        this.ifPlayBarListShow = false
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
    position: relative;
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
  div.songMenu {
    width: 100%;
    height: 3em;
  }
  div.progressBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    font-size: .5em;
    > div.playedTime {
      color: rgba(255, 255, 255, .95);
    }
    > div.mainBar {
      width: 70%;
      height: 2px;
      background-color: rgba(255, 255, 255, .5);
      position: relative;
      > div.playedBar {
        background-color: red;
        height: inherit;
        position: relative;
        &::after {
          font-family: 'icomoon' !important;
          width: 1em;
          height: 1em;
          content: '';
          background-color: #fff;
          display: block;
          position: absolute;
          border-radius: 50%;
          right: 0;
          top: -.4em;
        }
      }
    }
    > div.songDuration {
      color: rgba(255, 255, 255, .7);
    }
  }
  div.controls {
    position: absolute;
    bottom: 6vh;
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
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &:active {
        filter: drop-shadow(0px 0px 2px rgba(255,255,255,0.9));
      }
      &::before, &::after {
        font-family: 'icomoon' !important;
        color: #fff;
        font-size: 2em;
      }
    }
    > p.mode, > p.songList {
      &::before {
        color: darken(#fff, 20%);
        font-size: 1.5em;
      }
    }
    > p.mode.shuffle {
      &::before {
        content: '\ea30';
      }
    }
    > p.mode.single {
      &::before {
        content: '\ea2d';
      }
    }
    > p.mode.order {
      &::before {
        content: '\ea2e';
      }
    }
    > p.prevSong {
      &::before {
        content: '\ea23';
      }
    }
    > p.playBtn {
      &::after {
        content: '';
        width: 1.5em;
        height: 1.5em;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-radius: 50%;
        border: 1px solid rgba(200, 200, 200, 0.6);
      }
    }
    > p.playBtn.buffering {
      &::before {
        content: '\e981';
        animation: spin 1s infinite;
      }
    }
    > p.playBtn.playing {
      &::before {
        content: '\ea1d';
      }
    }
    > p.playBtn.paused {
      &::before {
        content: '\ea1c';
      }
    }
    > p.nextSong {
      &::before {
        content: '\ea24';
      }
    }
    > p.songList {
      &::before {
        content: '\e9bb';
      }
    }
  }
  .playBarListShow-enter, .playBarListShow-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
