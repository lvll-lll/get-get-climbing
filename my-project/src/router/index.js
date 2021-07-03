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
      path: '/maps',
      name: 'maps',
      component: () => import('@/views/maps/geoQ/index.vue')
      // children: [
      //   {
      //     path: '/geoQ',
      //     name: 'geoQ',
      //     component: () => import('@/views/maps/geoQ/index.vue')
      //   }
      // ]
    }
  ]
})
