import 'styles/index'
import * as all from './js/index'

console.log('all: ', all)

const echo = () => {
  console.log(THREEDIMENSION)
  console.log('env: ', process.env.NODE_ENV)
}
echo()