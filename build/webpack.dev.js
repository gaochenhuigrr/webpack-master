// ------ Global Objects ------
const webpack = require('webpack')
const path = require('path')
const { smart } = require('webpack-merge')

// ------ Constants ------
const COMMON_CONFIG = require('./webpack.common.js')

// ------ Functions ------
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// ------ Configuration ------
const DEV_CONFIG = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  // 热更新：
  // 1.安装webpack-dev-server
  // 2.打包命令 webpack --> webpack-dev-server
  // 3.webpack 配置文件中配置 devServer
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    hot: true,
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 在浏览器中显示ccompiler errors or warnings， 不配置则只在编辑器或cmd中显示，不直观
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // 转发根路径时 不能直接将路径配置为 '/'
      index: '',
      // 需要对多个路径用同一规则时
      // context: ['/api/employee', '/api/org'],
      // target: {}
      '/api/employee': {
        // 将请求转发去target配置的地址
        target: 'http://www.google.com',
        // 如果转发地址是 https 地址， 则需要配置 secure: false
        secure: false,
        bypass(req, res, proxyOptions) {
          // 对转发进行个性化过滤
          console.log(req, res, proxyOptions)
        },
        pathRewrite: {
          // 将路径中的header改为demo
          herder: 'demo'
        },
        // 针对发爬虫网站
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin() // 实现持久化缓存
  ],
  optimization: {
    usedExports: true
  }
}

module.exports = smart(COMMON_CONFIG, DEV_CONFIG)