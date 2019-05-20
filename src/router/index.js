import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import slider from '@/components/slider'
import slider3 from '@/components/slider3'
import slider6 from '@/components/slider6'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/slider',
      name: 'slider',
      component: slider
    },
    {
      path: '/slider3',
      name: 'slider3',
      component: slider3
    },
    {
      path: '/slider6',
      name: 'slider6',
      component: slider6
    }
  ]
})
