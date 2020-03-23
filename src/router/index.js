import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/product',
    name: 'product',
    component: () => import('../pages/product.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../pages/order.vue')
  }
]

export default new VueRouter({
  routes
})
