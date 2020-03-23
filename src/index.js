import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './app.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
// 引入polyfill 2种方式：
// 推荐
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// 不推荐
// import '@babel/polyfill' 配合 useBuiltIns: 'usage' 使用
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
Vue.use(ElementUI)

console.log('all: ', all)

const echo = () => {
  console.log(THREEDIMENSION)
  console.log('env: ', process.env.NODE_ENV)
}
echo()

console.log('lodash/difference: ', _.difference([2, 1], [2, 3]))

// PWA ServiceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('SW registered: ', registration)
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}

// import vue
export const app = new Vue({
  el: '#app',
  template: '<App />',
  components: { App },
  router,
  store
})
