import Vue from 'vue'
import VueRouter from 'vue-router'
import ThreeViewer from '../views/threeViewer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ThreeViewer',
    component: ThreeViewer
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
