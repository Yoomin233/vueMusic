<template>
  <div class="top">
    <div class="searchBar">
      <span>back</span>
      <input type="search" placeholder="search for music...">
    </div>
    <play-bar></play-bar>
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
<style scoped lang='less'>
div.searchBar {
  height: 3em;
  background-color: red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .5em .2em;
  box-sizing: border-box;
  input[type=search] {
    width: 80%;
  }
}
</style>