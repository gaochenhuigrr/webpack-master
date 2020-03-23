/* eslint-disable arrow-parens */
/* eslint-disable no-else-return */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: '',
  timeout: 3000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
})

// 默认Content-Type配置
const methodList = ['post', 'put', 'delete']
methodList.forEach(v => {
  instance.defaults.headers[v]['Content-Type'] = 'application/json;charset=UTF-8'
})

instance.interceptors.request.use(config => {
  const { method } = config
  if (method === 'get' && window.navigator.userAgent.toLowerCase().includes('trident')) {
    config.headers['If-Modified-Since'] = new Date()
  }
  return config
}, (error) => Promise.reject(error))

instance.interceptors.response.use(response => response.data, (error) => {
  if (error.response) {
    const { status, data } = error.response
    if (status >= 500 && data.message) {
      Message({
        type: 'error',
        message: data.message
      })
    }
    return Promise.reject(error.response.data)
  } else {
    Message({
      type: 'error',
      message: '请求超时'
    })
    return Promise.reject(error)
  }
})

export default instance