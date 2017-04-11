<template lang="html">
  <div class="top" @scroll='listScroll'>
    <div class="listInfo">
      <router-link to='/main' tag='p' class='backBar' :class='{fixed:backBarFixed}' :style='backBarBg'>歌单</router-link>
      <img src="https://vuejs.org/images/logo.png" alt="">
      <div class="listName">
        <p>我喜欢的音乐</p>
        <p><img :src='avator' alt="">{{userName}} > </p>
      </div>
      <p class='songListMenu'>
        <span>收藏</span>
        <span>评论</span>
        <span>分享</span>
      </p>
      <div class="listInfoBg" :style='infoBgObj'></div>
    </div>
    <div class="songList">
      <p>
        <span></span>
        <span>播放全部
          <i>(共{{songList.length}}首)</i>
        </span>
        <span>多选</span>
      </p>
      <div class="listItem" v-for='(item, index) in songList' @click='jumpToSong(index)'>
        <span class="no">
          {{index + 1}}
        </span>
        <div class="songDetails">
          <p>{{decodeURIComponent(item.songName)}}</p>
          <p>{{decodeURIComponent(item.singer)}}</p>
        </div>
        <span class='songMore'>
          ...
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Store from './Vuex/store'

import {throttle, debounce} from './tools/toolsFunction'

export default {
  data () {
    return {
      backBarFixed: false,
      listScrolled: null,
      listInfoHeight: null,
    }
  },
  mounted () {
    this.listInfoHeight = parseInt(getComputedStyle(document.querySelector('div.listInfo')).height)
  },
  components: {

  },
  beforeCreate () {
    this.listScroll = throttle((e) => {
      debounce((e) => {
        this.listScrolled = e.target.scrollTop
        if (this.listScrolled > 0 ) {
          this.backBarFixed = true
        } else {
          this.backBarFixed = false
        }
      }, 100)(e)
    }, 100)
    this.infoBgObj = {
      'background-color': 'rgba(100, 100, 100, 1)'
    }
  },
  computed: {
    backBarBg () {
      let transPercent = this.listScrolled / this.listInfoHeight
      if (transPercent <= 1) {
        return {
          'background-color': this.infoBgObj['background-color'].replace(/1\)/, `${transPercent})`)
        }
      } else {
        return {
          'background-color': this.infoBgObj['background-color']
        }
      }
    },
    ...mapState({
      songList: state => state.currentPlayingList,
      avator: state => state.user.avator,
      userName: state => state.user.name
    })
  },
  methods: {
    jumpToSong (index) {
      Store.commit('updateCurrentPlaying', index)
    },
  }
}
</script>

<style lang="less" scoped>
  div.top {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #eee;
    overflow-y: scroll;
    div.listInfo, div.listInfoBg {
      height: 16em;
    }
    div.listInfo {
      padding: 1em;
      color: #fff;
      padding-top: 3em;
      > p.backBar {
        margin: 0 auto;
        padding: .5em;
        color: #fff;
        font-size: 1.2em;
        position: absolute;
        left:0;
        top: 0;
        width: 100%;
        z-index: 10;
        transition: background .1s ease;
        &::before {
          font-family: 'icomoon' !important;
          content: '\ea40';
          vertical-align: top;
          margin-right: .5ch;
        }
      }
      > p.backBar.fixed {
        position: fixed;
      }
      > img {
        width: 8em;
        height: 8em;
        background-color: #fff;
        vertical-align: top;
      }
      > .listName {
        display: inline-block;
        margin-left: 1em;
        img {
          width: 3em;
          height: 3em;
          display: inline-block;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 1ch;
        }
      }
      > .songListMenu {
        padding: 0 1ch;
        display: flex;
        justify-content: space-between;
        > span {
          display: inline-block;
          line-height: 1.5;
          &::before {
            font-family: 'icomoon' !important;
            display: block;
            text-align: center;
          }
          &:active {
            &::before {
              filter: drop-shadow(0px 0px 2px rgba(255,255,255,0.9));
            }
          }
          &:first-child::before {
            content: '\e931';
          }
          &:nth-child(2)::before {
            content: '\e970';
          }
          &:nth-child(3)::before {
            content: '\ea82';
          }
        }
      }
      > div.listInfoBg {
        // background-image: url('https://vuejs.org/images/logo.png');
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 0;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
      > *:not(.listInfoBg) {
        position: relative;
        z-index: 1;
      }
    }
    div.songList {
      padding-bottom: 3em;
      > p:first-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #ccc;
        line-height: 3;
        margin: 0 auto;
        > span:first-child {
          width: 15%;
          text-align: center;
          &::before {
            font-family: 'icomoon' !important;
            content: '\ea1c';
            display: inline-block;
          }
        }
        > span:nth-child(2) {
          width: 70%;
          i {
            font-style: normal;
            font-size: .8em;
            color: #777;
          }
        }
        > span:last-child {
          font-size: .8em;
          &::before {
            font-family: 'icomoon' !important;
            content: '\e9bb';
            margin-right: .5ch;
          }
        }
      }
      > div.listItem {
        display: flex;
        padding: 1ch 0;
        align-items: center;
        > .no {
          text-align: center;
          color: lighten(black, 30%);
          width: 15%;
        }
        > .songDetails {
          width: 70%;
          > p {
            font-size: 1.1em;
            margin: 0 auto;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          > p:first-child {
            font-weight: normal;
          }
          > p:last-child {
            font-size: .7em;
            color: lighten(black, 30%);
          }
        }
        > .songMore {
          width: 15%;
          text-align: center;
          font-weight: bolder;
          transform: rotate(.25turn);
        }
      }
    }
  }
</style>
