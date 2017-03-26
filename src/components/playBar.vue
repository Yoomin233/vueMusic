<template lang="html">
  <div class="playBar">
    <p>this is playBar</p>
  </div>
</template>

<script>
import config from '../config/config'
export default {
  data () {
    return {
      musicURL: `${config.musicServer.url}Maroon%205%20-%20Sugar.mp3`
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
  div.playBar {
    height: 3em;
    background-color: #ddd;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

</style>
