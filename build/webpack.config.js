const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = {
    mode: 'development',
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
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        filename: 'js/[name]-[hash:8].js',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ]
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
                    'css-loader'
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
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40960, 
                            name: 'assets/images/[name]-[contenthash:8].[ext]'
                            // webpack3 配置 不适用于webpack4
                            // fallback: {
                            //     loader: 'file-loader',
                            //     options: {
                            //         name: 'images/[name]-[contenthash:8].[ext]'
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
                            enabled: false,
                          },
                          pngquant: { // 使用 imagemin-pngquant 压缩 png
                            quality: [0.65, 0.90],
                            speed: 4
                          },
                          gifsicle: { // 压缩 gif 的配置
                            interlaced: false,
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
            minify:{
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[contenthash:8].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            styles: path.resolve(__dirname, '../src/styles/'),
            assets: path.resolve(__dirname, '../src/assets/')
        },
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules'
        ],
        extensions: [
            '.js', '.json', '.jsx', '.css', '.scss'
        ]
    }
}
// 先定义再导出方便更改配置
module.exports = config