// 引入polyfill 2种方式：
// 推荐
import 'core-js/stable';
import 'regenerator-runtime/runtime';
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

console.log('all: ', all)

const echo = () => {
  console.log(THREEDIMENSION)
  console.log('env: ', process.env.NODE_ENV)
}
echo()

console.log('lodash/difference: ', _.difference([2, 1], [2, 3]))