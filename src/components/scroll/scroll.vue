<template>
  <div class="list-wrapper" ref="wrapper">
    <div class="scroll-content" ref="content">

    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 1
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollBar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    }
  },
  created() {

  },
  
}
</script>

<style lang="stylus" scoped>

</style>
