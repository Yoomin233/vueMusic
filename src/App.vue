<template>
  <div id="app">
    <nav>
      <span class='menu'></span>
      <span>我的</span>
      <span>发现</span>
      <span>动态</span>
      <span class='search'></span>
    </nav>
    <!-- <bannerSwipe></bannerSwipe> -->
  </div>
</template>

<script>
// import bannerSwipe from './components/bannerSwipe.vue'
import hideLoader from './tools/hideLoader'
export default {
  data () {
    return {
      msg: ''
    }
  },
  components: {
    // bannerSwipe
  },
  mounted () {
    hideLoader()
  }
}
</script>

<style lang='less' scoped>
  nav {
    height: 3em;
    background-color: red;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color:#eee;
    padding: 0 1em;
    > span {
      font-family: 'icomoon' !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    > span:first-child {
      font-size: 1.2em;
      &::before {
        content: "\e9bb"
      }
    }
    > span:last-child {
      font-size: 1.2em;
      &::before {
        content: "\e986"
      }
    }
  }
</style>
