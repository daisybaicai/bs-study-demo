<template>
  <div>
    Slider-demo3 加入下拉和上拉刷新 通过监听:pullingDown 来实现
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
import loading from './loading/loading'
export default {
  components: {
    loading
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
    // setTimeout(() => {
    //   this.initScroll()
    // }, 20)
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 上拉加载
      pullUpLoad: {
        // 当上拉距离超过30px时触发 pullingUp 事件
        threshold: -30
      },
      // 下拉刷新
      pullDownRefresh: {
        // 下拉距离超过30px触发pullingDown事件
        threshold: 30,
        // 回弹停留在距离顶部20px的位置
        stop: 20
      }
    })
    this.scroll.on('pullingUp', () => {
      console.log('处理上拉加载操作')
      setTimeout(() => {
        this.items.push('pullingup' + Math.random())
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        this.scroll.finishPullUp()
      }, 2000)
    })
    this.scroll.on('pullingDown', () => {
      console.log('处理下拉刷新操作')
      setTimeout(() => {
        this.items.unshift('pullingDown' + Math.random())
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
        this.scroll.finishPullDown()
      }, 2000)
    })
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
          },
          pullDownRefresh: {
            threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
            stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
          }
        })
        this.scroll.on('pullingDown', () => {
          console.log('pullingDown')
          this.items.push('pullingDown' + Math.random())
          this.scroll.finishPullDown()
        })
        this.scroll.on('pullingUp', () => {
          this.items.push('pullingup' + Math.random())
          this.scroll.finishPullUp()
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
