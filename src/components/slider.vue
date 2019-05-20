<template>
  <div>
    Slider-demo 基本版本 了解bs 使用需要一个外容器以及容器:
    <div class="wrapper" ref="wrapper">
      <div class="content" ref="content">
        <ul>
          <li v-for="(item, index) in items" :key="index" class="item">{{item}}</li>
        </ul>
      </div>
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
      default: function () {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
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
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    }
  },
  data () {
    return {
      items: [

      ]
    }
  },
  created () {
    for (let i = 0; i < 10; i++) {
      this.items.push('this is No' + i)
    }
  },
  mounted () {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll () {
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      }
      console.log(options)
      this.scroll = new BScroll(this.$refs.wrapper)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .wrapper
    position relative
    height: 400px
    border 1px solid red
    background: #fff
    overflow hidden
    .content
      position: relative
      z-index: 10
      background: #fff
      .item
        list-style: none
        height: 60px
        line-height: 60px
        font-size: 18px
        padding-left: 20px
        border-bottom: 1px solid #e5e5e5
</style>
