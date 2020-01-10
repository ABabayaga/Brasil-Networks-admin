import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Planos from './views/Planos.vue'
import Usuario from './views/Usuario.vue'
import Login from './views/Login.vue'
// import Whatsapp from './views/Whatsapp.vue'

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


    path: '/usuario',
    name: 'usuario',
    component: Usuario
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }

  ]
})