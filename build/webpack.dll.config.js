const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue', 'vue-router', 'vuex', 'element-ui', 'axios', 'lodash']
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dist/[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}