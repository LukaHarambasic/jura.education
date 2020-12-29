import Vue from 'vue'
import axios from 'axios'
import VueGtag from 'vue-gtag'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import '@/assets/styles/typefaces.css'
import '@/assets/styles/main.sass'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.prototype.$axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://jura.education/' : 'http://localhost:3000/'

const getGDPR = localStorage.getItem('GDPR:accepted')
Vue.use(VueGtag, {
  config: { id: 'G-XN5VCRF3TF' },
  params: {
    anonymize_ip: true
  },
  appName: 'jura.education',
  bootstrap: getGDPR === 'true',
  enabled: getGDPR === 'true',
  pageTrackerScreenviewEnabled: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
