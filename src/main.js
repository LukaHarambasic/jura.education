import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import '@/assets/styles/main.sass'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.prototype.$axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://jura.education/' : 'http://localhost:3000/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
