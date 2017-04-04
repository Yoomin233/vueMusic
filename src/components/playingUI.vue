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
    <transition name='fade'>
      <div @click='switchBack' class="needle" :class='{needlePlayed: playStatus === "playing"}' v-if='!ifBackShow'></div>
    </transition>
    <transition name='fade'>
      <div @click='switchBack' class="gramophoneDisc" v-if='!ifBackShow'>
        <div class="cover" :class='{coverSpin: playStatus === "playing"}'>
          <img :src="coverImg.match(/url\(([^)]*)\)/)[1]" alt="">
        </div>
      </div>
    </transition>
    <transition name='fade'>
      <div @click='switchBack' class="songMenu" v-if='!ifBackShow'>
        <p class='likeBtn'></p>
        <p class='comments'></p>
      </div>
    </transition>
    <transition name='fade'>
      <div @click='switchBack' class="back" v-if='ifBackShow'>
        <p class='volumeCtrl'>
          <span class='volumeCtrlBar'>
            <span class='volumeCtrlBtn'></span>
          </span>
          <span class='volumeCtrlBg'>

          </span>
        </p>
      </div>
    </transition>
    <div class="progressBar" :class='{progressBarAbsolute:ifBackShow}'>
      <div class="playedTime">
        {{songCurrentTime}}
      </div>
      <div class="mainBar"
        @touchstart='playProgressTouchStart($event)'
        @touchend='playProgressTouchEnd($event)'
        @touchmove='playProgressDragged($event)'>
        <div class="playedBar"
          :style="{width: songPlayProgress}"
          >
          <span
            :class='{playProgressSpanPressed: ifProgressSpanPressed}'
          >
          </span>
        </div>
        <div class="playedBarBg">
        </div>
        <div class="bufferBar">
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

import {formatTime, throttle} from '../tools/toolsFunction'

export default {
  data () {
    return {
      ifShowBlurredBg: false,
      blurredBgOpacity: 0,
      ifPlayBarListShow: false,
      ifBackShow: false,
      ifProgressSpanPressed: false,
      touchRecorder: {},
      playBarWidth: null
    }
  },
  beforeCreate () {
    this.playProgressDragged = throttle((e) => {
      let draggedDistance = e.touches[0].pageX - this.touchRecorder.startX
      let draggedPercentage = draggedDistance / this.playBarWidth
      let currentPercentage = this.touchRecorder.startPercentage + Math.round(draggedPercentage * 100)
      // console.log(currentPercentage)
      if (0 <= currentPercentage && currentPercentage <= 100)
        Store.commit('changeCurrentTime', currentPercentage)
    }, 50)
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
    this.playBarWidth = parseInt(getComputedStyle(document.querySelector('div.progressBar > div.mainBar')).width)
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

    songPlayProgress: () => `${Math.round((Store.state.playingStatus.currentTime/Store.state.playingStatus.duration)*100)}%`
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
    },
    switchBack () {
      this.ifBackShow = !this.ifBackShow
    },
    playProgressTouchStart (e) {
      // if (this.playStatus === 'playing') {
      //   // pause the play while drag progress span
      //   Store.commit('switchPlayStatus')
      // }
      this.ifProgressSpanPressed = true
      this.touchRecorder.startX = e.touches[0].pageX
      this.touchRecorder.startPercentage = parseInt(this.songPlayProgress)
    },
    playProgressTouchEnd (e) {
      // if (this.playStatus === 'paused') {
      //   // resume the play while finish dragging
      //   Store.commit('switchPlayStatus')
      // }
      this.ifProgressSpanPressed = false
      this.touchRecorder.startX = null
      this.touchRecorder.startPercentage = null
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 5vh;
  div.songInfo {
    display: flex;
    color: #fff;
    height: 10%;
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
    height: 60%;
    padding-top: 100%;
    border-radius: 50%;
    position: relative;
    div.cover {
      background: url('../assets/vinyl.png') center / 100% no-repeat;
      position: absolute;
      width: 75%;
      height: 75%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-position: center;
      background-size: contain;
      animation: spin 30s linear infinite;
      animation-play-state: paused;
      img {
        width: 80%;
        vertical-align: text-top;
      }
    }
    div.coverSpin {
      animation-play-state: running;
    }
  }
  div.songMenu {
    width: 100%;
    height: 10%;
  }
  div.back {
    height: 70%;
    width: 100%;
    position: absolute;
    top: 10%;
    > p.volumeCtrl {
      padding: 1em;
      color: darken(#fff, 20%);
      position: relative;
      margin: 0 3em;
      &::before {
        font-family: 'icomoon' !important;
        content: '\ea27';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        transform: translateX(-150%) translateY(25%);
      }
      > span {
        position: absolute;
        height: 2px;
        background-color: #fff;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        left: 0;
      }
      > span.volumeCtrlBar {
        background-color: darken(#fff, 30%);
        width: 50%;
        z-index: 3;
        > span.volumeCtrlBtn {
          display: inline-block;
          width: .5em;
          height: .5em;
          border-radius: 50%;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateY(-40%) translateX(50%);
          background-color: #fff;
        }
      }
      > span.volumeCtrlBg {
        background-color: rgba(200, 200, 200, .5);
        z-index: 1;
      }
    }
  }
  div.progressBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    font-size: .5em;
    height: 10%;
    > div.playedTime {
      color: rgba(255, 255, 255, .95);
      width: 10%;
    }
    > div.mainBar {
      width: 70%;
      height: 2px;
      position: relative;
      padding: 1em 0;
      > div {
        height: inherit;
        position: absolute;
        width: 100%;
      }
      > div.playedBar {
        background-color: red;
        z-index: 3;
        > span {
          width: 1em;
          height: 1em;
          background-color: #fff;
          display: block;
          position: absolute;
          border-radius: 50%;
          right: 0;
          top: -.4em;
        }
        > span.playProgressSpanPressed {
          background-color: darken(#fff, 20%);
        }
      }
      > div.playedBarBg {
        background-color: rgba(200, 200, 200, .5);
        z-index:1;
      }
      > div.bufferBar {
        background: rgba(200, 200, 200, .8);
        z-index: 2;
        width: 0;
      }
    }
    > div.songDuration {
      color: rgba(255, 255, 255, .7);
      width: 10%;
    }
  }
  div.progressBarAbsolute {
    position: absolute;
    width: 100%;
    top: 80%;
  }
  div.controls, div.songMenu {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5%;
    > p {
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
    > p.likeBtn {
      &::before {
        content: '\e9da';
      }
    }
    > p.comments {
      &::before {
        content: '\e970';
      }
    }
  }
  .playBarListShow-enter, .playBarListShow-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
