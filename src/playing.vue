<template>
  <div class='top'>
    <p></p>
    <audio controls autoplay name='media'>
      <source src='http://192.168.31.169:8091/Maroon%205%20-%20Sugar.mp3' type='audio/mpeg'/>
    </audio>
  </div>
</template>
<script>
import config from '../config/config'
export default {
  data () {
    return {
      data1: 0
    }
  },
  mounted () {
  }
}
<script>
<style scoped>
div.top {
  background-color: black;
}
</style>
