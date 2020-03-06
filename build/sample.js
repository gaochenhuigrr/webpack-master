const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // 入口文件配置项
  entry: {
    app: [path.resolve(__dirname, 'src/index.js')],
  },
  // 输出文件配置项
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: ""
  },
  // 开发工具
  devtool: 'cheap-module-source-map',
  // webpack4.x 环境配置项
  mode: "production",
  // 加载器 loader 配置项
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(png|jp?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,        // 小于8192字节的图片打包成base 64图片
              name: 'images/[name].[hash:8].[ext]',
              publicPath: ''
            }
          }
        ]
      },
      {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'fonts/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      }, {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'audios/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      }, {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'videos/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "img:data-src"]
            }
          }
        ]
      }
    ]
  },
  // webpack4.x 新增配置项
  optimization: {
    minimizer: [ // 用于配置 minimizers 和选项
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  // 插件配置项
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),// 实现持久化缓存
    new HtmlWebpackPlugin({
      filename: 'index.html',// 输出文件的名称
      template: path.resolve(__dirname, 'src/index.html'),// 模板文件的路径
      title: 'webpack-主页',// 配置生成页面的标题
      minify: {
        removeRedundantAttributes: true, // 删除多余的属性
        collapseWhitespace: true, // 折叠空白区域
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除注释
        collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
      },
      favicon: ''
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[hash].css"
    })
  ],
}