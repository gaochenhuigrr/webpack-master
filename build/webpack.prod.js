const { smart } = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const base = require('./webpack.common.js')

module.exports = smart(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
          publicPath: '/dist/css'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          publicPath: '/dist/css'
        })
      },
      // 图片压缩
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: { // 压缩 jpeg 的配置
            progressive: true,
            quality: 65
          },
          optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
            enabled: false
          },
          pngquant: { // 使用 imagemin-pngquant 压缩 png
            quality: [0.65, 0.90],
            speed: 4
          },
          gifsicle: { // 压缩 gif 的配置
            interlaced: false
          },
          webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
            quality: 75
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[hash].css',
      // 踩坑： 文件名不应包含路径，否则会引起静态资源引用不到，文件放置位置应该通过publicPath配置
      // filename: 'css/[name].[contenthash:8].css',
      // chunkFilename: 'css/[name].[hash].css',
      ignoreOrder: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: 3
    })
  ]
})