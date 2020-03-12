const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const config = {
  mode: 'development',
  // 热更新：
  // 1.安装webpack-dev-server
  // 2.打包命令 webpack --> webpack-dev-server
  // 3.webpack 配置文件中配置 devServer
  devtool: 'eval-cheap-module-source-map',
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
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist/')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: [
          path.resolve(__dirname, '../src')
        ],
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css/,
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
        test: /.scss$/,
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40960,
              name: 'images/[name].[contenthash:8].[ext]'
              // webpack3 配置 不适用于webpack4
              // fallback: {
              //     loader: 'file-loader',
              //     options: {
              //         name: 'images/[name].[contenthash:8].[ext]'
              //     }
              // }
            }
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
      }
    ]
  },
  plugins: [
    // #1 happypack: 进行多线程构建，提高构建速度
    // #2 Commitlint
    // 统一规范 commit 格式，让 commit 信息整整齐齐的展示 安装 commitlint 、@commitlint/cli、@commitlint/config - conventional

    // Webpack 进行默认编译时会有很多无用的信息，需要进行清理，只显示少量信息，并便于排错。
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static'),
        ignore: ['.js']
      }
    ]),
    new FriendlyErrorsWebpackPlugin(),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      THREEDIMENSION: JSON.stringify('THREE BODY')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      title: 'hmtl webpack plugin title',
      // 打包好的资源注入到html的位置 default: 'body'
      // true | 'body' body结束标签前
      // 'head' head结束标签前
      inject: 'body',
      // 压缩打包后的html模板文件
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 折叠空白区域
        removeAttributeQuotes: true, // 移除属性的引号
        removeRedundantAttributes: true, // 删除多余的属性
        collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[hash].css',
      ignoreOrder: false
    }),
    new webpack.HashedModuleIdsPlugin(), // 实现持久化缓存
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      styles: path.resolve(__dirname, '../src/styles/'),
      assets: path.resolve(__dirname, '../src/assets/'),
      utils: path.resolve(__dirname, '../src/utils/')
    },
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules'
    ],
    extensions: [
      '.js', '.json', '.jsx', '.css', '.scss'
    ]
  },
  // webpack4 dev环境下默认不压缩
  // 若要完全压缩，则mode: 'production'
  optimization: {
    minimize: true
  }
}
// 先定义再导出方便更改配置
module.exports = config