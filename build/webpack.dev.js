const webpack = require('webpack')
const path = require('path')
const { smart } = require('webpack-merge')

const base = require('./webpack.common.js')

module.exports = smart(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  // 热更新：
  // 1.安装webpack-dev-server
  // 2.打包命令 webpack --> webpack-dev-server
  // 3.webpack 配置文件中配置 devServer
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    compress: true,
    hot: true,
    port: 8000,
    // 自动打开浏览器
    open: true,
    // 显示ccompiler errors or warnings
    overlay: {
      warnings: false,
      errors: true
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin() // 实现持久化缓存
  ]
})