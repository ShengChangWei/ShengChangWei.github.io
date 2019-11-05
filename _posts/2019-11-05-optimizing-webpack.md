---
layout: post
title:  "webpack--前端性能优化y与Gzip原理"
date:   2019-11-05
excerpt: "前端性能优化"
optimizing: true
tag:
- 前端性能
comments: true
---

## webpack--前端性能优化y与Gzip原理

## 目录

* ![webpack 的性能瓶颈](#webpack的性能瓶颈)
* ![webpack 优化方案](#webpack优化方案)
    - ![优化 Loader ](#优化Loader)
    - ![优化 Loader 的文件搜索范围](#优化Loader的文件搜索范围)
    - ![将 Babel 编译过的文件缓存起来](#将Babel编译过的文件缓存起来)
    - ![DllPlugin 打包第三方库](#DllPlugin打包第三方库)
    - ![HappyPack（并行打包）](#HappyPack（并行打包）)
    - ![Tree Shaking（删除冗余代码）](#Tree Shaking（删除冗余代码）)
    - ![按需加载](#按需加载)
    - 
 
## 前言

前不久看过掘金小册《前端性能优化原理与实践》，受益匪浅。“我深感性能优化实在是前端知识树中特别的一环——当你需要学习前端框架时，文档和源码几乎可以告诉你所有问题的答案，当你需要学习 Git 时，你也可以找到放之四海皆准的实践方案。但性能优化却不一样，它好像只能是一个摸索的过程。” 前端的性能优化一直是困扰我的一个问题， 我不知道哪些问题需要优化，这些问题又应该用什么方式和方法优化？即使知道却总感觉知之甚少，自己项目真正去做优化的却不多。“任何技术的掌握，都离不开一定比例的理论基础和实际操作的支撑。” 通过这个专题，记录自己了解的前端性能优化以及在自己的项目中去做优化。

## webpack 的性能瓶颈

* webpack 的构建过程太花时间
* webpack 打包的结果体积太大

## webpack 优化方案

### 优化Loader

#### 优化 Loader 的文件搜索范围

```javascript
module.exports = {
  module: {
    rules: [
      {
        // js 文件才使用 babel
        test: /\.js$/,
        loader: 'babel-loader',
        // 只在 src 文件夹下查找
        include: [resolve('src')],
        // 不会去查找的路径
        exclude: /node_modules/
      }
    ]
  }
}
```

#### 将 Babel 编译过的文件缓存起来

```javascript
loader: 'babel-loader?cacheDirectory=true'
```

### DllPlugin 打包第三方库


DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。

用 DllPlugin 处理文件，要分两步走：

* 基于 dll 专属的配置文件，打包 dll 库
* 基于 webpack.config.js 文件，打包业务代码

以自己的vue项目为例，我的dll配置文件如下：

新建`webpack.dll.config.js`文件

```javascript
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui']
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(['*.*'], {
      root: path.join(__dirname, dllPath)
    }),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}

```
在vue.config.js中配置dll 

```javascript
  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('./public/vendor/vendor-manifest.json')
    }),
    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: path.resolve(__dirname, './public/vendor/*.js'),
      // dll 引用路径
      publicPath: './vendor',
      // dll最终输出的目录
      outputPath: './vendor'
    }),
  ]
```

### HappyPack（并行打包）

受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。

HappyPack 可以将 Loader 的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了

```javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // id 后面的内容对应下面
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  })
]
```

### Tree Shaking（删除冗余代码）

从 webpack2 开始，webpack 原生支持了 ES6 的模块系统，并基于此推出了 Tree-Shaking。webpack 官方是这样介绍它的：

```shell
Tree shaking is a term commonly used in the JavaScript context for dead-code elimination, or more precisely, live-code import. It relies on ES2015 module import/export for the static structure of its module system.
```
意思是基于 import/export 语法，Tree-Shaking 可以在编译的过程中获悉哪些模块并没有真正被使用，这些没用的代码，在最后打包的时候会被去除。

在 Webpack3 中，我们一般使用 UglifyJS 来删除压缩代码，我们可以使用 uglifyjs-webpack-plugin 来并行运行 UglifyJsPlugin，从而提高效率。

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
 plugins: [
   new UglifyJsPlugin({
     // 允许并发
     parallel: true,
     // 开启缓存
     cache: true,
     compress: {
       // 删除所有的console语句    
       drop_console: true,
       // 把使用多次的静态值自动定义为变量
       reduce_vars: true,
     },
     output: {
       // 不保留注释
       comment: false,
       // 使输出的代码尽可能紧凑
       beautify: false
     }
   })
 ]
}
```

手动引入 UglifyJsPlugin 的代码其实是 webpack3 的用法，webpack4 现在已经默认使用 uglifyjs-webpack-plugin 对代码做压缩了——在 webpack4 中，我们是通过配置 optimization.minimize 与 optimization.minimizer 来自定义压缩相关的操作的。

### 按需加载

思想：

* 一次不加载完所有的文件内容，只加载此刻需要用到的那部分（会提前做拆分）
* 当需要更多内容时，再对用到的内容进行即时加载

已vue路由为例，把路由引入方式改为下面方式：

```javascript
{
name: 'login',
path: '/login',
component: () => import('@/views/login/login.vue') // 按需加载
}
```







