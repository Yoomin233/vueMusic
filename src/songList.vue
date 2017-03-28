<template lang="html">
  <div class="top">
    <div class="listInfo">
      <router-link to='/main' tag='p'>歌单</router-link>
      <img src="https://vuejs.org/images/logo.png" alt="">
      <p>我喜欢的音乐</p>
    </div>
    <div class="listInfoBg"></div>
    <div class="songList">
      <p>播放全部<span>多选</span></p>
      <div class="listItem" v-for='(item, index) in songList'>
        <div class="no">
          <p>
            {{index}}
          </p>
        </div>
        <div class="songDetails">
          <p>{{decodeURIComponent(item.songName)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from './Vuex/store'
export default {
  components: {

  },
  computed: {
    songList: () => Store.state.playList
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
    padding: 1em;
    div.listInfo, div.listInfoBg {
      height: 40vh;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    div.listInfo {
      padding: 1em;
      box-sizing: border-box;
      z-index: 1;
      p:first-of-type {
        margin: 0 auto;
        color: #fff;
        line-height: 1.5em;
        &::before {
          font-family: 'icomoon' !important;
          content: '\ea40';
          font-size: 1.5em;
        }
      }
      img {
        width: 6em;
        height: 6em;
      }
    }
    div.listInfoBg {
      background-image: url('https://vuejs.org/images/logo.png');
      background-size: cover;
      background-repeat: no-repeat;
      z-index: 0;
      filter: blur(30px);
    }
    div.songList {
      margin-top: 40vh;
      > div.listItem {
        display: flex;
        flex-direction: row;
      }
    }
  }
</style>
