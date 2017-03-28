<template>
  <div class="top">
    <router-link tag='div' class='shade' to='/main'></router-link>
    <div class="personArea">
      <div class="avator">

      </div>
      <p class='userInfo'>UserName</p>
    </div>
    <p>设置</p>
    <p>定时停止播放</p>
  </div>
</template>
<script>
import Router from './router'
export default {
  mounted () {
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
    background-image: url('https://static1.squarespace.com/static/52bf3648e4b0b97e0fbce045/t/536017d6e4b0b0c3a3617e71/1398806488190/');
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
    }
  }
  > p {
    padding: 0 6ch;
  }
}
</style>
