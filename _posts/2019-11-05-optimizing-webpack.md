---
layout: post
title:  "webpack--前端性能优化与Gzip原理"
date:   2019-11-05
excerpt: "前端性能优化"
optimizing: true
tag:
- 前端性能优化
comments: true
---

## webpack--前端性能优化与Gzip原理

## 目录

* [前言](#前言)
* [webpack 的性能瓶颈](#webpack-的性能瓶颈)
* [webpack 优化方案](#webpack-优化方案)
    - [优化Loader](#优化loader)
    - [DllPlugin 打包第三方库](#dllplugin-打包第三方库)
    - [HappyPack 并行打包](#happypack-并行打包)
    - [Tree Shaking 删除冗余代码](#tree-shaking-删除冗余代码)
    - [按需加载](#按需加载)
* [Gzip 压缩原理](#gzip-压缩原理)
 
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

### HappyPack 并行打包

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

### Tree Shaking 删除冗余代码

从 webpack2 开始，webpack 原生支持了 ES6 的模块系统，并基于此推出了 Tree-Shaking。webpack 官方是这样介绍它的：

```shell
Tree shaking is a term commonly used in the JavaScript context for dead-code elimination, 
or more precisely, live-code import. It relies on ES2015 module import/export for the static 
structure of its module system.
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

### Gzip 压缩原理

摘自《前端性能优化原理与实践》

说到压缩，可不只是构建工具的专利。我们日常开发中，其实还有一个便宜又好用的压缩操作：开启 Gzip。

具体的做法非常简单，只需要你在你的 request headers 中加上这么一句：

```javascript
accept-encoding:gzip
```

HTTP 压缩:

```shell
HTTP 压缩是一种内置到网页服务器和网页客户端中以改进传输速度和带宽利用率的方式。在使用 HTTP 压缩的情况下，
HTTP 数据在从服务器发送前就已压缩：兼容的浏览器将在下载所需的格式前宣告支持何种方法给服务器；
不支持压缩方法的浏览器将下载未经压缩的数据。最常见的压缩方案包括 Gzip 和 Deflate。
```

以上是摘自百科的解释，事实上，大家可以这么理解：

##### HTTP 压缩就是以缩小体积为目的，对 HTTP 内容进行重新编码的过程

Gzip 的内核就是 Deflate，目前我们压缩文件用得最多的就是 Gzip。可以说，Gzip 就是 HTTP 压缩的经典例题。

#### 该不该用 Gzip

如果你的项目不是极端迷你的超小型文件，我都建议你试试 Gzip。

有的同学或许存在这样的疑问：压缩 Gzip，服务端要花时间；解压 Gzip，浏览器要花时间。中间节省出来的传输时间，真的那么可观吗？

答案是肯定的。如果你手上的项目是 1k、2k 的小文件，那确实有点高射炮打蚊子的意思，不值当。但更多的时候，我们处理的都是具备一定规模的项目文件。实践证明，这种情况下压缩和解压带来的时间开销相对于传输过程中节省下的时间开销来说，可以说是微不足道的。

#### Gzip 是万能的吗

首先要承认 Gzip 是高效的，压缩后通常能帮我们减少响应 70% 左右的大小。

但它并非万能。Gzip 并不保证针对每一个文件的压缩都会使其变小。

Gzip 压缩背后的原理，是在一个文本文件中找出一些重复出现的字符串、临时替换它们，从而使整个文件变小。根据这个原理，文件中代码的重复率越高，那么压缩的效率就越高，使用 Gzip 的收益也就越大。反之亦然。

#### webpack 的 Gzip 和服务端的 Gzip

一般来说，Gzip 压缩是服务器的活儿：服务器了解到我们这边有一个 Gzip 压缩的需求，它会启动自己的 CPU 去为我们完成这个任务。而压缩文件这个过程本身是需要耗费时间的，大家可以理解为我们以服务器压缩的时间开销和 CPU 开销（以及浏览器解析压缩文件的开销）为代价，省下了一些传输过程中的时间开销。

既然存在着这样的交换，那么就要求我们学会权衡。服务器的 CPU 性能不是无限的，如果存在大量的压缩需求，服务器也扛不住的。服务器一旦因此慢下来了，用户还是要等。Webpack 中 Gzip 压缩操作的存在，事实上就是为了在构建过程中去做一部分服务器的工作，为服务器分压。

因此，这两个地方的 Gzip 压缩，谁也不能替代谁。它们必须和平共处，好好合作。作为开发者，我们也应该结合业务压力的实际强度情况，去做好这其中的权衡。





