<template lang="html">
  <div class="top">
    <div class="listInfo">
      <router-link to='/main' tag='p'>歌单</router-link>
      <img src="https://vuejs.org/images/logo.png" alt="">
    </div>
    <play-bar keep-alive></play-bar>
  </div>
</template>

<script>
import playBar from './components/playBar.vue'
export default {
  components: {
    playBar
  }
}
</script>

<style lang="less" scoped>
  div.top {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #eee;
    div.listInfo {
      height: 40vh;
      background-color: #020225;
      padding: 1em;
      box-sizing: border-box;
      p {
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
  }
</style>
