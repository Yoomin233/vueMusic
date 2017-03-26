<template>
  <div class="top">
    <!-- navigation -->
    <nav>
      <span class='menu'></span>
      <span :class='{focus: currentSlider === 0}' @click='switchSlider($event, 0)'>我的</span>
      <span :class='{focus: currentSlider === 1}' @click='switchSlider($event, 1)'>发现</span>
      <span :class='{focus: currentSlider === 2}' @click='switchSlider($event, 2)'>动态</span>
      <router-link to='/search' tag='span' class='search'></router-link>
    </nav>
    <!-- three components -->
    <section class='threeSlide'>
      <mine-music-component :style="{'margin-left': (-100 * currentSlider) + '%'}"></mine-music-component>
      <discovery-component></discovery-component>
      <activity-component></activity-component>
    </section>
    <!-- play bar -->
    <play-bar keep-alive></play-bar>
  </div>
</template>

<script>
// import bannerSwipe from './components/bannerSwipe.vue'
import playBar from './components/playBar.vue'
import mineMusicComponent from './components/mineMusic.vue'
import discoveryComponent from './components/discovery.vue'
import activityComponent from './components/activity.vue'

import hideLoader from './tools/hideLoader'
export default {
  name: 'mainUI',
  data () {
    return {
      currentSlider: 0
    }
  },
  components: {
    playBar,
    mineMusicComponent,
    discoveryComponent,
    activityComponent
  },
  mounted () {
    hideLoader()
  },
  methods: {
    switchSlider (e, num) {
      this.currentSlider = num
    }
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
    color:#ddd;
    padding: 0 1em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    > span {
      font-family: 'icomoon' !important;
    }
    > span.focus {
        color: #fff;
    }
    > span:first-child {
      &::before {
        font-size: 1.2em;
        content: "\e9bb"
      }
    }
    > span:last-child {
      &::before {
        font-size: 1.2em;
        content: "\e986"
      }
    }
  }
  section.threeSlide {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    > div {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      transition: all .3s ease;
    }
  }
</style>
