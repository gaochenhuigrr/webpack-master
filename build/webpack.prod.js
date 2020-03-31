// ------ Global Objects ------
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const { smart } = require('webpack-merge')

// ------ Plugins ------
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

// ------ Constants ------
const COMMON_CONFIG = require('./webpack.common.js')
const smp = new SpeedMeasurePlugin()

// ------ Functions ------
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// ------ Configuration ------

const plugins = [
  // new UglifyJsPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[hash].css',
    // 踩坑： 文件名不应包含路径，否则会引起静态资源引用不到，文件放置位置应该通过publicPath配置
    // filename: 'css/[name].[contenthash:8].css',
    // chunkFilename: 'css/[name].[hash].css',
    ignoreOrder: false
  })
  // new BundleAnalyzerPlugin({
  //   generateStatsFile: true // 是否生成stats.json文件
  // })
]


const fileList = fs.readdirSync('dll')
fileList.forEach((file) => {
  if (/.*manifest\.json$/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: require(resolve(`dll/${file}`))
    }))
  }
})
console.log('plugins: ', plugins)

const PROD_CONFIG = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
      // 图片压缩
      // {
      //   loader: 'image-webpack-loader',
      //   options: {
      //     mozjpeg: { // 压缩 jpeg 的配置
      //       progressive: true,
      //       quality: 65
      //     },
      //     optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
      //       enabled: false
      //     },
      //     pngquant: { // 使用 imagemin-pngquant 压缩 png
      //       quality: [0.65, 0.90],
      //       speed: 4
      //     },
      //     gifsicle: { // 压缩 gif 的配置
      //       interlaced: false
      //     },
      //     webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
      //       quality: 75
      //     }
      //   }
      // }
    ]
  },
  plugins,
  // webpack4 dev环境下默认不压缩
  // 若要完全压缩，则mode: 'production'
  optimization: {
    minimize: true,
    usedExports: true // 令webpack确定每个模块使用的导出，用于去除 dead-code 等
  }
}

module.exports = smp.wrap(smart(COMMON_CONFIG, PROD_CONFIG))