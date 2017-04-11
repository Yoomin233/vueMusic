<template lang="html">
  <div class="playBarList">
    <div class="shade" @click='hidePlayBarList'></div>
    <p @click='togglePlayMode' :class='playModeClass'><span>{{playModeText}}({{songList.length}})</span><span>清空</span></p>
    <div class="songList">
      <p
        v-for='(song, index) in songList'
        :class='{nowPlaying: index === songNumber}'
      >
      <span @click='jumpToSong(index)'>{{decodeURIComponent(song.songName).replace('.mp3', '')}} - </span>
      <span @click='jumpToSong(index)'>{{decodeURIComponent(song.singer)}}</span>
      <span @click='removeSong(index)' class='removeSong' >X</span>
      </p>
    </div>
  </div>
</template>
<script>
import Store from '../Vuex/store'
import Bus from '../bus'
export default {
  data () {
    return {

    }
  },
  computed: {
    playModeText: () => {
      switch (Store.state.playingStatus.mode) {
        case 'shuffle':
          return '随机播放'
        case 'order':
          return '顺序播放'
        case 'single':
          return '单曲循环'
        default:
          return '顺序播放'
      }
    },
    playModeClass: () => Store.state.playingStatus.mode,
    songList: () => Store.state.currentPlayingList,
    songNumber: () => Store.state.playingStatus.songNumber
  },
  watch: {
    songNumber (number) {
      document.querySelectorAll('div.playBarList > div.songList > p')[number]&&document.querySelectorAll('div.playBarList > div.songList > p')[number].scrollIntoViewIfNeeded()
    }
  },
  methods: {
    hidePlayBarList () {
      Bus.$emit('hidePlayBarList')
    },
    togglePlayMode () {
      Store.commit('togglePlayMode')
    },
    jumpToSong (index) {
      Store.commit('updateCurrentPlaying', index)
    },
    removeSong (index) {
      Store.commit('removeSong', index)
    }
  }
}
</script>

<style lang="less" scoped>
div.playBarList {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60vh;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.95);
  div.shade {
    width: 100%;
    height: 100vh;
    transform: translateY(-100%);
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));
  }
  > p, > div.songList > p {
    border-bottom: 1px solid #ddd;
    padding: 0 1em;
    line-height: 2;
  }
  > p:first-of-type {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;
    height: 6vh;
    margin-top: .5em;
  }
  > p:first-of-type > span {
    &::before {
      font-family: 'icomoon' !important;
      color: #666;
      font-weight: bolder;
    }
  }
  > p:first-of-type.shuffle > span:first-child {
    &::before {
      content: '\ea30 '
    }
  }
  > p:first-of-type.order > span:first-child {
    &::before {
      content: '\ea2d '
    }
  }
  > p:first-of-type.single > span:first-child {
    &::before {
      content: '\ea2e '
    }
  }
  > p:first-of-type > span:last-child {
    &::before {
      content: '\e9ac'
    }
  }
  > div.songList {
    overflow-y: scroll;
    height: 54vh;
    padding-bottom: 1em;
    > p {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: .5em auto;
      position: relative;
      padding: 0 2em 0 1em;
      span.removeSong {
        position: absolute;
        right: 1ch;
        display: inline-block;
        width: 2ch;
      }
    }
    > p.nowPlaying {
      color: red;
      &::before {
        font-family: 'icomoon' !important;
        content: '\ea27 ';
      }
    }
  }
}
</style>
