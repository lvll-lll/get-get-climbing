// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as THREE from 'three'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(THREE)

/* eslint-disable no-new */
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
