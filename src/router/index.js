import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import editor from '@/components/editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    },
    {
    	path: '/editor',
    	name: 'editor',
    	component: editor
    }
  ]
})
