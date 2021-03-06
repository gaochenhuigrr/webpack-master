import Vue from 'vue'
// import ElementUI from 'element-ui'
import { Button, Select } from 'element-ui';
import { difference } from 'lodash'
import App from './app.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
// 引入polyfill 2种方式：
// 推荐
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
// 不推荐
// import '@babel/polyfill' // 在webpack4中配置了{useBuiltIns: 'usage'}则不用显式引入poly fill
// .babelrc
// {
//   presets: [
//     [
//       "@babel/preset-env", {
//         useBuiltIns: 'usage'
//       }
//     ]
//   ]
// }
import 'styles/index'
import * as all from './js/index'

// 注册
// Vue.use(ElementUI)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)

console.log('all: ', all)

const echo = () => {
  console.log(THREEDIMENSION)
  console.log('env: ', process.env.NODE_ENV)
}
echo()

console.log('lodash/difference: ', difference([2, 1], [2, 3]))

// PWA ServiceWorker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//       console.log('SW registered: ', registration)
//     }).catch((registrationError) => {
//       console.log('SW registration failed: ', registrationError)
//     })
//   })
// }

// import vue
export const app = new Vue({
  el: '#app',
  template: '<App />',
  components: { App },
  router,
  store
})
