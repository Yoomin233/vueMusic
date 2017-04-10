<template>
  <transition name='tipTransition'>
    <div class="tip">
      <slot>
      </slot>
    </div>
  </transition>
</template>
<script>
import bus from '../bus'
export default {
  mounted () {

  }
}
</script>
<style lang='less'>
.tip {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10%;
  width: 30%;
  margin: auto;
  color: white;
  background-color: rgba(0,0,0,0.7);
  padding: .5em 1em;
  text-align: center;
  > p {
    margin: 0;
  }
}
.tipTransition-enter-active, .tipTransition-leave-active {
  transition: all .3s cubic-bezier(.08,.62,.71,1.43);
}
.tipTransition-enter, .tipTransition-leave-to {
  bottom: 0;
  transform: translateY(100%);
}
</style>
