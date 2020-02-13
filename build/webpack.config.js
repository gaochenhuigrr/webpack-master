const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
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
        open: true
    },
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        filename: 'js/[name]-[hash:6].js',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
            {
                test: /\.js/,
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
            // {
            //     test: /\.css/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test: /.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
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
                removeComments:true,
                collapseWhitespace:true
            }
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            styles: path.resolve(__dirname, '../src/styles/')
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