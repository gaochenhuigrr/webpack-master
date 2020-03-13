# 1 webpack-merge
# 2 SplitChunksPlugin
# 3 tree-shaking
# 4 DllPlugin

# eslint
* `Expected linebreaks to be 'LF' but found 'CRLF'.` 解决方法：`"linebreak-style": [0 ,"error", "windows"]` [Why](https://www.cnblogs.com/guangzan/p/11866261.html)

# webpack-cli
* 在项目中，我们更多地会把 webpack 作为项目的开发依赖来安装使用，这样可以指定项目中使用的 webpack
版本，更加方便多人协同开发
* 大多数前端框架都提供了简单的工具来协助快速生成项目基础文件，一般都会包含项目使用的 webpack
的配置
  * [create-react-app](https://github.com/facebook/create-react-app)
    - create-react-app 的 webpack 配置在这个项目下：react-scripts。
  * [angular/devkit/build-webpack]()
    - 通常 angular 的项目开发和生产的构建任务都是使用 angular-cli 来运行的，但 angular-cli 只是命令的使用接口，基础功能是由  angular/devkit 来实现的，webpack 的构建相关只是其中一部分，详细的配置可以参考 webpack-configs 。
  * [vue-cli](https://github.com/vuejs/vue-cli/)
    - vue-cli 使用 webpack 模板生成的项目文件中，webpack 相关配置存放在 build 目录下。

# loader
  - module type
    * webpack 4.x 版本强化了 module type，即模块类型的概念，不同的模块类型类似于配置了不同的 loader，webpack 会有针对性地进行处理，现阶段实现了以下 5 种模块类型。
      - javascript/auto：即 webpack 3 默认的类型，支持现有的各种 JS 代码模块类型 —— CommonJS、
      AMD、ESM
      - javascript/esm：ECMAScript modules，其他模块系统，例如 CommonJS 或者 AMD 等不支持，是
      .mjs 文件的默认类型
      - javascript/dynamic：CommonJS 和 AMD，排除 ESM
      - javascript/json：JSON 格式数据，require 或者 import 都可以引入，是 .json 文件的默认类型
      - webassembly/experimental：WebAssembly modules，当前还处于试验阶段，是 .wasm 文件的默认
      类型
    ```
      // 如果不希望使用默认的类型的话，在确定好匹配规则条件时，我们可以使用 type 字段来指定模块类型，例如把所有的 JS 代码文件都设置为强制使用 ESM 类型：
        {
          test: /\.js/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          type: 'javascript/esm', // 这里指定模块类型
        }
    ```

  - noParse
    - module.noParse 字段，可以用于配置哪些模块文件的内容不需要进行解析。对于一些不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度
    - 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。

# plugins
  - ProvidePlugin
    * 引用某些模块作为应用运行时的变量，从而不必每次都用 require 或者 import，
    ```
      new webpack.ProvidePlugin({
        identifier: 'module',
        // ...
      })
    ```
  - IgnorePlugin
    * 用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去。
    ```
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ```

# webpack-dev-server configuration
  * 建议将 devServer.publicPath 和 output.publicPath 的值保持一致。
  - public
    * 字段用于指定静态服务的域名，默认是 http://localhost:8080/
  - port
    * 默认是 8080
  - publicPath
    * 用于指定构建好的静态文件在浏览器中用什么路径去访问，默认是 /，例如，对于一个构建
      好的文件 bundle.js，完整的访问路径是 http://localhost:8080/bundle.js，如果你配置了
      publicPath: 'assets/'，那么上述 bundle.js 的完整访问路径就是
      http://localhost:8080/assets/bundle.js
  
# 在配置文件中区分mode
  * 配置文件不仅可以直接导出一个对象，还可以导出一个函数
  ```
    module.exports = (env, argv) => ({
      optimization: {
        minimize: false,
        // 使用 argv 来获取 mode 参数的值
        minimizer: argv.mode === 'production' ? [new UglifyJsPlugin({})] : []
      }
    })
  ```

# mainfest
  * webpack 内部运行时，会维护一份用于管理构建代码时各个模块之间交互的表数据，webpack 官方称之为 Manifest，其中包括入口代码文件和构建出来的 bundle 文件的对应关系。可以使用WebpackManifestPlugin 插件来输出这样的一份数据。