<template>
  <div>
    Slider-demo6 touchEnd 来实现
    <div class="wrapper" ref="wrapper">
      <div class="content" ref="content">
        <ul>
          <li v-for="(item, index) in items" :key="index" class="item">{{item}}</li>
        </ul>
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <loading></loading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import loading from './loading/loading'
// const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
export default {
  components: {
    loading
  },
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
      ],
      pulldownMsg: '下拉刷新'
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
      // const that = this
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          //  初始化better-scroll
          probeType: 1, //  1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          click: true, //  是否派发click事件
          scrollbar: true,
          pullUpLoad: {
            threshold: -20
          }
        })
        //   滑动过程中事件
        // this.scroll.on('scroll', pos => {
        //   if (pos.y > 30) {
        //     this.pulldownMsg = '释放立即刷新'
        //   }
        // })
        //  滑动结束松开事件
        this.scroll.on('touchEnd', pos => {
          //  上拉刷新
          if (pos.y > 30) {
            console.log(pos)
            // setTimeout(() => {
            //   that.getData().then(res => {
            //     //  刷新数据
            //     that.data = res
            //     //  恢复刷新提示文本值
            //     that.pulldownMsg = '下拉刷新'
            //     //  刷新成功后提示
            //     that.refreshalert()
            //     //  刷新列表后，重新计算滚动区域高度
            //     that.scroll.refresh()
            //   })
            // }, 2000)
            this.items.unshift('upload' + Math.random())
            this.scroll.refresh()
          } else if (pos.y < this.scroll.maxScrollY - 30) {
            console.log('down', pos)
            this.items.push('download' + Math.random())
            // this.pullUpLoad = true
            this.scroll.refresh()
            //  下拉加载
            // this.pullupMsg = '加载中。。。'
            // setTimeout(() => {
            //   that.getData().then(res => {
            //     //  恢复文本值
            //     that.pullupMsg = '加载更多'
            //     that.data = this.data.concat(res)
            //     that.scroll.refresh()
            //   })
            // }, 2000)
          }
        })
      })
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
    .top-tip
      position: absolute
      top: -40px
      left: 0
      z-index: 1
      width: 100%
      height: 40px
      line-height: 40px
      text-align: center
      color: #555
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
      .pullup-wrapper
        width: 100%
        display: flex
        justify-content center
        align-items center
        padding: 16px 0
</style>
