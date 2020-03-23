import request from '../index'
export const config = {
  getArticles: {
    method: 'post',
    url: 'https://web-api.juejin.im/query',
    headers: { 'X-Agent': 'Juejin/Web' }
  }
}

// eslint-disable-next-line max-len
export default (funcName, data, isToken = true, isCancel = true) => request(config, funcName, data, isToken, isCancel)