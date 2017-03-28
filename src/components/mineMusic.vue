<template lang="html">
  <div class="top">
    <div class="list">
      <router-link to='/main/songList' tag='p' class='list'>我喜欢的</router-link>
      <p class='list'>最近播放</p>
    </div>
    <div class="musicLists">
      <p>创建的歌单</p>
      <div class="musicList">
        <div class="musicListCover">
          <img src="https://vuejs.org/images/logo.png" alt="">
        </div>
        <div class="musicListDetails">
          <router-link to='/main/songList' tag='p'>我喜欢的音乐</router-link>
          <p>{{songList.length}}首</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../Vuex/store'
export default {
  computed: {
    songList: () => Store.state.playList
  }
}
</script>

<style lang="less" scoped>
p.list {
  margin: .5em auto;
  margin-left: 4ch;
  border-bottom: 1px solid #ddd;
  line-height: 2.5;
  position: relative;
  &::before, &::after {
    font-family: 'icomoon' !important;
    display: inline-block;
    position: absolute;
    left: 0;
    transform: translateX(-130%) translateY(-15%);
    font-size: 1.5em;
    color: red;
    font-weight: lighter;
  }
  &:first-of-type::before {
    content: "\e911";
  }
  &:nth-of-type(2)::before {
    content: "\e94d";
  }
}
div.musicLists {
  > p:first-of-type {
    background-color: #ddd;
    font-size: .8em;
    padding: .5ch;
    padding-left: 3ch;
    margin: 0;
  }
  div.musicList {
    display: flex;
    flex-direction: row;
    height: 3em;
    padding: .5em;
    position: relative;
    div.musicListCover {
      width: 3em;
      height: 3em;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
      }
      &::before {
        font-family: 'icomoon' !important;
        content: "\e9da";
        position: absolute;
        font-size: 2em;
        left: .25em;
        bottom: .25em;
        color: red;
      }
    }
    div.musicListDetails {
      margin-left: .5em;
      > p{
        margin: .2em auto;
      }
      > p:first-of-type {
        font-size: 1em;
      }
      > p:nth-of-type(2) {
        font-size: .7em;
        color: #666;
      }
    }
    &::after {
      font-family: 'icomoon' !important;
      content: "\ea27";
      right: 1em;
      position: absolute;
      font-size: 1.5em;
      color: red;
    }
  }
}
</style>
