import Vue from 'vue'
// import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

import theme from './plugins/theme'

// import './plugins'

// Vue.use(vuetify, {
//   iconfont: 'mdi',
//   theme
// })


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
