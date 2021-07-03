// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import ol from 'ol'
import 'ol/ol.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
// Vue.use(ol)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
