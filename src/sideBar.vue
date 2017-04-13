<template>
  <div class="top">
    <router-link tag='div' class='shade' to='/main'></router-link>
    <div class="personArea">
      <div class="avator" @click='showTip' :style='{"background-image": `url(${user.avator})`}'>
      </div>
      <p class='userInfo'>{{user.name}}</p>
    </div>
    <p>设置</p>
    <p>定时停止播放</p>
    <tip v-show='ifTipShow'>
      <p>再按{{tapRequired}}下!</p>
    </tip>
  </div>
</template>
<script>
import Router from './router'
import {mapState, mapActions} from 'vuex'
// import Store from ''

import Bus from './bus'

import tip from './components/tip.vue'

export default {
  data () {
    return {
      ifTipShow: false,
      tapRequired: 3,
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  components: {
    tip
  },
  methods: {
    showTip () {
      if (!this.tapRequired) {
        return
      }
      this.tapRequired --
      if (this.tapRequired === 0) {
        console.log('switching!')
        this.switchUser()
        return
      }
      clearTimeout(this.tipTimer)
      this.ifTipShow = true
      this.tipTimer = setTimeout(() => {
        this.ifTipShow = false
      }, 1.5 * 1e3)
    },
    ...mapActions({
      switchUser: 'SWITCH_USER_TO_MAY'
    })
  },
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
    background-image: url('./assets/rain.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    padding: 20% 5% 5%;
    color: #fff;
    font-size: 1.2em;
    div.avator {
      background-color: white;
      background-size: cover;
      width: 4em;
      height: 4em;
      border-radius: 50%;
      overflow: hidden;
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
