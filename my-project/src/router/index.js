import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/transfer',
      name: 'transfer',
      component: () => import('@/views/transfer/transfer.vue')
    }, {
      path: '/map',
      name: 'map',
      component: () => import('@/views/map/index.vue')
    }, {
      path: '/webgl',
      name: 'webgl',
      component: () => import('@/views/webgl/webGlPage.vue')
    }, {
      path: '/task',
      name: 'task',
      component: () => import('@/views/maps/index.vue')
    }
  ]
})
