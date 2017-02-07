<template>
  <div class="top">
    <div id='bannerSwipe'>
      <div class="slider"></div>
      <div class="slider"></div>
      <div class="slider"></div>
      <div class="slider"></div>
    </div>
    <button @click='prev($event)'>prev</button>
    <button>next</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '333',
      sliderIndex: 0,
      sliderCollection: null
    }
  },
  methods: {
    prev (e) {
      console.log(e)
    }
  },
  mounted () {
    let sliderCollect = [...document.querySelectorAll('div#bannerSwipe > div')]
    let sliderParent = document.querySelector('div#bannerSwipe')
    let firstSlider = sliderCollect[0]
    let lastSlider = sliderCollect[sliderCollect.length - 1]
    let firstSliderClone = firstSlider.cloneNode(true)
    let lastSliderClone = lastSlider.cloneNode(true)
    // clone first and last slider
    sliderParent.insertBefore(firstSliderClone, firstSlider)
    sliderParent.appendChild(lastSliderClone)
    // push to sliderCollect
    sliderCollect.push(lastSliderClone)
    sliderCollect.unshift(firstSliderClone)
    this.sliderCollection = sliderCollect
    // init
    sliderCollect.forEach((elem) => {
      elem.setAttribute('style', this.sliderTranslate)
    })
  },
  computed: {
    sliderTranslate () {
      return `transform: translate3d(${(this.sliderIndex + 1) * -100}%, 0, 0)`
    }
  },
  watch: {
    sliderIndex: function(newVal, old) {
      this.sliderCollection.forEach((elem) => {
        elem.setAttribute('style', this.sliderTranslate)
      })
    }
  }
}
</script>
<style lang='less'>
div.top {

}
div#bannerSwipe {
  width: 100%;
  height: 50vw;
  overflow-x: hidden;
  white-space: nowrap;
  div.slider {
    display: inline-block;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    background: url('../assets/logo.png') no-repeat center / 50vw;
    transition: all .5s ease;
  }
}
</style>
