// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue'
import App from './App'
import router from './router'

import * as filter from './filters'
Object.keys(filter).forEach((key) => {
	Vue.filter(key, filter[key]);
})

import * as directive from './directives'
Object.keys(directive).forEach((key) => {
	Vue.directive(key, directive[key]);
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
