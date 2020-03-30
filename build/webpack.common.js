// ------ Global Objects ------
const webpack = require('webpack')
const path = require('path')

// ------ Plugins ------
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const FinishNotifyPlugin = require('../plugins/finish-notify-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')

// ------ Functions ------
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// ------ Configuration ------
const CONFIG = {
  entry: {
    main: resolve('src/index.js')
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: resolve('dist/')
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: [
      //     path.join(__dirname, '../node_modules')
      //   ]
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: [
          resolve('node_modules')
        ]
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: [
          resolve('node_modules')
        ]
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader'
      // },
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
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: resolve('src')
      }
    ]
  },
  plugins: [
    new FinishNotifyPlugin({
      name: 'FinishNotifyPlugin'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    // #1 happypack: 进行多线程构建，提高构建速度
    // #2 Commitlint
    // 统一规范 commit 格式，让 commit 信息整整齐齐的展示 安装 commitlint 、@commitlint/cli、@commitlint/config - conventional
    // #3 stylelint 样式规范检测
    // new webpack.ProvidePlugin({
    //   _: 'lodash'
    // }),
    new webpack.DefinePlugin({
      THREEDIMENSION: JSON.stringify('THREE BODY')
    }),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      filename: 'index.html',
      title: 'wp master',
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
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: resolve('dist/static'),
        ignore: ['*.js']
      },
      {
        from: resolve('dll'),
        to: resolve('dist/dll')
      }
    ]),
    // Webpack 进行默认编译时会有很多无用的信息，需要进行清理，只显示少量信息，并便于排错。
    new FriendlyErrorsWebpackPlugin()
    // new WorkboxPlugin.GenerateSW({
    // // these options encourage the ServiceWorkers to get in there fast
    // // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
  ],
  resolve: {
    modules: [
      resolve('src'),
      'node_modules'
    ],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      styles: resolve('src/styles/'),
      assets: resolve('src/assets/'),
      utils: resolve('src/utils/')
    },
    extensions: [
      '.js', '.json', '.jsx', '.css', '.scss'
    ],
    // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
    mainFiles: ['index']
  },
  optimization: {
    moduleIds: 'hashed', // fix: The vendor bundle changed because its module.id was changed.
    runtimeChunk: 'single', // split runtime code into a separate chunk
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // 至少被引用3次
      // minChunks: 3
      cacheGroups: {
        // extract third-party libraries to a separate vendor chunk
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
// 先定义再导出方便更改配置
module.exports = CONFIG