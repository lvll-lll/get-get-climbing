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
      path: '/webglFirst',
      name: 'webglFirst',
      component: () => import('@/views/webgl/webglFirst.vue')
    }, {
      path: '/transfer',
      name: 'transfer',
      component: () => import('@/views/transfer/transfer.vue')
    }, {
      path: '/map',
      name: 'map',
      component: () => import('@/views/map/index.vue')
    }
  ]
})
