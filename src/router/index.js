import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SpiderConfig from '@/views/SpiderConfig'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/config',
      name: 'spider-config',
      component: SpiderConfig
    }
  ]
})
