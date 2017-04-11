<template>
  <div class="top">
    <router-link tag='div' class='shade' to='/main'></router-link>
    <div class="personArea">
      <div class="avator">

      </div>
      <p class='userInfo'>{{userName}}</p>
    </div>
    <p>设置</p>
    <p>定时停止播放</p>
  </div>
</template>
<script>
import Router from './router'
import {mapState} from 'vuex'
export default {
  mounted () {
  },
  computed: {
    ...mapState({
      userName: state => state.user.name
    })
  }
}
</script>
<style lang='less' scoped>
div.top {
  width: 80vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 14;
  div.shade {
    position: absolute;
    width: 100vw;
    height: 100%;
    right: 0;
    top: 0;
    transform: translateX(100%);
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1));
  }
  div.personArea {
    height: 30%;
    background-image: url('assets/rain.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    padding: 20% 5% 5%;
    color: #fff;
    font-size: 1.2em;
    div.avator {
      background-color: white;
      width: 4em;
      height: 4em;
      border-radius: 50%;
      background: url('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg') center / cover;
    }
    div.avator + p {
      margin: .5em auto;
    }
  }
  > p {
    padding: 0 4ch;
    position: relative;
    &::before {
      position: absolute;
      transform: translateX(-1.2ch);
      font-size: 1.5em;
      color: #888;
      font-family: 'icomoon' !important;
    }
  }
  > p:nth-of-type(1) {
    &::before {
      content: '\e994';
    }
  }
    > p:nth-of-type(2) {
      &::before {
        content: '\e94e';
      }
  }
}
</style>
