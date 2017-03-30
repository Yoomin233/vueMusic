<template lang="html">
  <div class="playBar">
    <img @click='showPlayingUI' src='https://vuejs.org/images/logo.png' alt="" class='cover'>
    <div @click='showPlayingUI' class="nameAndSinger">
      <p>{{decodeURIComponent(currentPlaying.songName.replace('.mp3', ''))}}</p>
      <p>{{decodeURIComponent(currentPlaying.singer)}}</p>
    </div>
    <div class="playBtn" @click='switchPlayStatus'>
      <i class='buffering' v-if='ifBuffering'></i>
      <i class='controlBtn' :class='playingStatus' v-if='!ifBuffering'></i>
    </div>
    <div class="listBtn" @click='showPlayBarList'></div>
    <transition name='playBarListShow'>
      <keep-alive>
        <play-bar-list class="playBarList"
        v-if='ifPlayBarListShow'
        ></play-bar-list>
      </keep-alive>
    </transition>
    <transition name='plyingUIShow'>
      <keep-alive>
        <playing-UI v-if='ifPlayingUIShow'>
        </playing-UI>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import config from '../config/config'
import {$} from '../tools/toolsFunction'

import Vue from 'vue'
import Store from '../Vuex/store'
import Bus from '../bus'

import playBarList from './playBarList.vue'
import playingUI from './playingUI.vue'
export default {
  data () {
    return {
      ifPlayBarListShow: false,
      ifPlayingUIShow: false,
      scrollTimer: null
    }
  },
  mounted () {
    this.scrollSongName()
    Bus.$on('hidePlayBarList', () => {
      this.ifPlayBarListShow = false
    })
    Bus.$on('hidePlayingUI', () => {
      this.ifPlayingUIShow = false
    })
  },
  computed: {
    currentPlaying: () => Store.state.currentPlaying,
    playingStatus: () => Store.state.playingStatus.musicPlaying,
    ifBuffering: () => Store.state.playingStatus.buffering
  },
  components: {
    playBarList,
    playingUI
  },
  methods: {
    switchPlayStatus () {
      Store.commit('switchPlayStatus')
    },
    nextSong () {
      Store.commit('nextSong')
    },
    showPlayBarList () {
      this.ifPlayBarListShow = true
    },
    showPlayingUI () {
      this.ifPlayingUIShow = true
      Vue.nextTick(() => {
        Bus.$emit('showPlayingUI')
      })
    },
    scrollSongName () {
      clearTimeout(this.scrollTimer)
      let self = this
      Vue.nextTick(function () {
        let elem = $('div.playBar > div.nameAndSinger > p:first-of-type')
        let elemWidth = parseInt(getComputedStyle(elem).width)
        let songNameWidth = elem.scrollWidth
        let diff = songNameWidth - elemWidth
        if (diff > 1) {
          // debugger
          let dir = true
          self.scrollTimer = setTimeout(function inlineFunc () {
            // debugger
            // 滚动
            if (dir) {
              elem.scrollLeft ++
              // 方向转换时停留一秒
              if (elem.scrollLeft + 1 >= diff) {
                dir = false
                self.scrollTimer = setTimeout(inlineFunc, 1e3)
              } else {
                self.scrollTimer = setTimeout(inlineFunc, 250)
              }
            } else {
              elem.scrollLeft --
              if (elem.scrollLeft <= 0) {
                dir = true
                self.scrollTimer = setTimeout(inlineFunc, 1e3)
              } else {
                self.scrollTimer = setTimeout(inlineFunc, 250)
              }
            }
          }, 250)
        }
      })
    }
  },
  watch: {
    currentPlaying () {
      this.scrollSongName()
    }
  }
}
</script>

<style lang="less">
  div.playBar {
    height: 3em;
    background-color: #ddd;
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow-y: visible;
    padding: .1em .4em;
    display: flex;
    background-color: rgba(255, 2552, 255, .8);
    align-items: center;
    box-sizing: border-box;
    z-index: 12;
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
      padding: 0 .2em;
      box-sizing: border-box;
      p {
        margin: .1em 0;
        &:first-child {
          white-space: nowrap;
          overflow: scroll;
          pointer-events: none;
          width: 100%;
          overflow-x: hidden;
        }
        &:last-child {
          font-size: .7em;
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
      position: relative;
      > i {
        position: absolute;
        font-style: normal;
        font-family: 'icomoon' !important;
      }
      > i.buffering {
        animation: spin 1s infinite linear;
        &::before {
          content: '\e97b'
        }
      }
      > i.controlBtn.playing {
        &::before {
          content: '\ea1d'
        }
      }
      > i.controlBtn.paused {
        &::before {
          content: '\ea1c'
        }
      }
    }
    > div.listBtn {
      &::before {
        content: '\e9bb';
        font-size: 1.2em;
      }
    }
    div.playBarList {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .playBarListShow-enter-active, .playBarListShow-leave-active, .plyingUIShow-enter-active, .plyingUIShow-leave-active {
      transition: all .3s ease;
    }
    .playBarListShow-enter, .playBarListShow-leave-to {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    .plyingUIShow-enter,  .plyingUIShow-leave-to {
      opacity: 0;
      transform: translate3d(0, 50%, 0);
    }

  }
  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
</style>
