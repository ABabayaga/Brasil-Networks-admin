import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Planos from './views/Planos.vue'
import Central from './views/Central.vue'

Vue.use(Router)
window.Vue = Vue

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{


      path: '/home',
      name: 'Home',
      component: Home
    },
    {


      path: '/planos',
      name: 'planos',
      component: Planos
    },
    {


      path: '/central',
      name: 'celtral',
      component: Central
    }
  
  ]
})