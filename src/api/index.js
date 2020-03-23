import axios from 'axios'
import fetch from '../utils/request'
const { CancelToken } = axios
export default (() => {
  let name = ''
  const cancels = {}
  let cancelParam = 'default'
  return function request() {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.from(arguments)
    const [config, funcName, data, isCancel] = args
    cancelParam = data ? data.cancelParam : 'default'
    if (isCancel && name === funcName) {
      if (cancels[cancelParam + funcName]) {
        cancels[cancelParam + funcName](`请求${name}被阻断，请检查是否重复发送同一请求，如需取消重复请求阻断，请配置api中isCancel为false`)
      }
    }
    name = funcName
    if (typeof config[funcName] !== 'object') {
      throw new Error('调用api函数函数错误，请检查函数名称是否错误')
    }
    const newConfig = JSON.parse(JSON.stringify(config[funcName]))
    if (data) {
      newConfig.url = newConfig.url.replace(/\{([\d\w_-]+)\}/g, (word, $1) => {
        const res = data[$1]
        delete data[$1]
        return res
      })
      const { method, headers } = config[funcName]
      if (method.toLowerCase() === 'get' || !method) {
        newConfig.params = data
      } else {
        newConfig.data = data
        if (method.toLowerCase() === 'post' && headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          Object.keys(newConfig.data).forEach((key) => {
            if (Array.isArray(newConfig.data[key]) && newConfig.data[key].length > 8000) {
              newConfig.data[key] = newConfig.data[key].join(',')
            }
          })
        }
      }
    }
    if (isCancel) {
      newConfig.cancelToken = new CancelToken((c) => { cancels[cancelParam + funcName] = c })
    }
    return fetch(newConfig)
  }
})()