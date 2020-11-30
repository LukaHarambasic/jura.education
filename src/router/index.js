import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Cases from '@/views/Cases'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cases',
    name: 'Cases',
    component: Cases
  }
]

const router = new VueRouter({
  routes
})

export default router
