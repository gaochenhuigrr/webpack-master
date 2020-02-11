const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        compress: true,
        port: 8000
    },
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        filename: '[name]-[hash:6].js',
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
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
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
            title: 'hmtl webpack plugin title'
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