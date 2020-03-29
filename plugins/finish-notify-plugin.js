/* eslint-disable */
class FinishNotifyPlugin {
  constructor(options) {
    console.log('FinishNotifyPlugin-开始实例化')
    console.log('FinishNotifyPlugin配置信息： ', options)
    console.log('FinishNotifyPlugin-完成实例化')
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('FinishNotifyPlugin', (compilation, cb) => {
      compilation.assets['notify.md'] = {
        source: () => 'Finish!!!',
        size: () => 50
      }
      cb()
    })
  }
}

module.exports = FinishNotifyPlugin