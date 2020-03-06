/**
 * 1.this onfiguration file is for postcss-loader
 * 2.postcss-preset-env & cssnano need to be installed standalone
 * 3.postcss-preset-env includes autoprefixer, so adding it separately is not necessary if you already use the preset.
 * 
 * 4.use mini-css-extract-plugin to extract styles into separate file
 * 5.browserslist use for autoprefixer & babel-preset-env
*/

/**
 * 1.入口文件中引入的样式文件都会按照配置进行压缩、autoprefix
 * 2.如果没在入口文件引入，则通过@import引入的文件，则必须安装postcss-import，才能正确压缩、autoprefix
 */
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': {}
  }
}