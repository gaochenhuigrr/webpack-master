const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    // import Vue from 'vue' 其实是引用的'vue/dist/vue.esm.js'，
    // 而webpack.dll.config.js并不知道vue指代的是'vue/dist/vue.esm.js'，
    // 所以我们需要修改webpack.dll.config.js配置： 'vue' -> 'vue/dist/vue.esm.js'

    // vendor: ['vue', 'vue-router', 'vuex', 'element-ui', 'axios', 'lodash']
    vendor: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'element-ui', 'axios', 'lodash']
    // vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
    // ui: ['element-ui'],
    // util: ['axios', 'lodash']
  },
  output: {
    path: path.resolve(__dirname, '../dll/'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanOnceBeforeBuildPatterns: ['../dll']
      // Cannot delete files/folders outside the current working directory. ->
      // Can be overridden with the`dangerouslyAllowCleanPatternsOutsideProject` option.

      // dangerouslyAllowCleanPatternsOutsideProject requires dry: false to be explicitly set
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
      name: '[name]_library'
    })
  ],
  optimization: {
    minimize: true,
    usedExports: true // 令webpack确定每个模块使用的导出，用于去除 dead-code 等
  }
}