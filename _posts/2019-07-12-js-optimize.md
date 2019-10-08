---
layout: post
title:  "PC前端性能优化策略"
date:   2019-07-12
excerpt: "来源他人博客，记录于此，学习"
javascript: true
tag:
- javascript
comments: true
---

# PC前端性能优化策略

## 网络加载类

### 减少 HTTP 资源请求次数

* 合并静态资源图片、JavaScript 或 CSS 代码，减少页面请求数和资源请求消耗
* 避免重复的资源，防止增加多余请求

### 减小 HTTP 请求大小

* 减少没必要的图片、JavaScript、CSS 及 HTML 代码
* 对文件进行压缩优化
* 使用 gzip 等方式压缩传输文件

### 将 CSS 或 JavaScript 放到外部文件中，避免使用 <style> 或 <script> 标签直接引入

* 在 HTML 文件中引用外部资源可以有效利用浏览器的静态资源缓存

### 避免页面中空的 href 和 src

* 当`<link>`标签的`<link>`属性为空，或 `<script>`、`<img>`、`<iframe>` 标签的 src 属性为空时，浏览器在渲染的过程中仍会将 href 属性或 src 属性中的空内容进行加载，直至加载失败，这样就阻塞了页面中其他资源的下载进程，而且最终加载到的内容是无效的，因此要尽量避免

```javascript
// 不推荐
<img src="" alt="photo">
<a href="">点击链接</a>
```

### 为 HTML 指定 Cache-Control 或 Expires

* 为 HTMl 内容设置 CaChe-Control 或 Expires 可以将 HTML 内容缓存起来，避免频繁向服务器端发送请求。

```javascript
<meta http-equiv="Cache-Control" content="max-age=7200" />
<meta http-equiv="Expires" content="Mon, 20 Jul 2016 23:00:00 GMT" />
```

### 合理设置 Etag 和 Last-Modified

* 合理设置 Etag 和 Last-Modified 使用浏览器缓存，对于未修改的文件，静态资源服务器会向浏览器端返回304，让浏览器从缓存中读取文件，减少 Web 资源下载的带宽消耗并降低服务器负载

```javascript
<meta http-equiv="last-modified" content="Mon, 03 Oct 2016 17:45:57 GMT" />
```

### 减少页面重定向

* 页面每次重定向都会延长页面内容返回的等待延时，一次重定向大约需要600毫秒的时间开销，为了保证用户尽快看到页面内容，要尽量避免页面重定向

### 使用静态资源分域存放来增加下载并行数

* 浏览器在同一时刻向同一个域名请求文件的并行下载数是有限的，因此可以利用多个域名的主机来存放不同的静态资源，增大页面加载时资源的并行下载数，缩短页面资源加载的时间

### 使用静态资源 CDN 来存储文件

* 如果条件允许，可以使用 CDN 网络加快同一个地理区域内重复静态资源文件的响应下载速度，缩短资源请求时间

### 使用 CDN Combo 下载传输内容

* CDN Combo 是在 CDN 服务器端将多个文件请求打包成一个文件的形式来返回的技术，这样可以实现 HTTP 连接传输的一次性复用，减少浏览器的 HTTP 请求数，加快资源下载速度
例如同一个域名 CDN 服务器上的 a.js，b.js，c.js 就可以按如下方式在一个请求中下载：

```javascript
<script src="//cdn.domain.com/path/a.js,b.js,c.js"></script>
```

### 使用可缓存的 AJAX

* 可以返回内容相同的请求，没必要每次都直接从服务器端拉取，合理使用 AJAX 缓存能加快 AJAX 响应速度来减轻服务器压力

```javascript
$.ajax({
   url: url,
   type: 'get',
   cache: true, // 推荐使用缓存
   data: {},
   success() {
       // ....
   },
   error() {
       // ...
   }
});
```

### 使用 GET 来完成 AJAX 请求

* 使用 XMLHttpRequest 时，浏览器中的 POST 方法发送请求首先发送文件头，然后发送 HTTP 正文数据，而使用 GET 时只发送头部，所以在拉取服务端数据时使用 GET 请求效率更高

```javascript
$.ajax({
   url: url,
   type: 'get', // 推荐使用 get 完成请求
   data: {},
   success() {
       // ....
   },
   error() {
       // ...
   }
});
```

### 减少 Cookie 的大小并进行 Cookie 隔离

* HTTP 请求通常默认带上浏览器的 Cookie 一起发送给服务器，所以在非必要的情况下，要尽量减少 Cookie 来减小 HTTP 请求的大小
* 对应静态资源，尽量使用不同的域名来存放，因为 Cookie 默认不能跨域的，这样就做到了不同域名下静态资源请求的 Cookie 隔离

### 缩小 favicon.ico 并缓存

* 有利于 favicon.ico 的重复加载，因为一般一个 Web 应用的 favicon.ico 是很少改变的

### 推荐使用异步 JavaScript 资源

* 异步的 JavaScript 资源不会阻塞文档解析，所以允许在浏览器中优先渲染页面，延后加载脚本执行。
* 使用 async 时，加载和渲染后续文档元素的过程和 main.js 的加载与执行是并行的。使用 defer 时，加载后续文档元素的过程和 main.js 的加载是并行的，但是 main.js 的执行要在页面所有元素解析完成之后才开始执行。

```javascript
<script src="main.js" defer></script>
<script src="main.js" async></script>
```

### 消除阻塞渲染的 CSS 及 JavaScript

* 对于页面中加载时间过长的 CSS 或 JavaScript 文件，需要进行合理拆分或延后加载，保证关键路径的资源能快速加载完成

### 避免使用 CSS import 引用加载 CSS

* CSS 中的 @import 可以从另一个样式文件引入样式，但应该避免这种用法，因为这样会增加 CSS 资源加载的关键路径长度，带有 @import 的 CSS 样式需要在 CSS 文件串行解析到 @import 时才会加载另外的 CSS 文件，大大延后 CSS 渲染完成的时间

## 页面渲染类

### 把 CSS 资源引用放到 HTML 文件顶部

* 一般推荐将所有 CSS 资源尽早指定在 HTML 文档 中，这样浏览器可以优先下载 CSS 并尽早完成页面渲染

### JavaScript 资源引用放到 HTML 文件底部

* JavaScript 资源放到 HTML 文档底部可以防止 JavaScript 的加载和解析执行对页面渲染造成阻塞，这是因为 JavaScript 资源默认是解析阻塞的，除非被标记为异步或者通过其他的异步方式加载

### 不要在 HTML 中直接缩放图片

* 在 HTML 中直接缩放图片会导致页面的重排重绘，此时可能会使页面中的其他操作产生卡顿，因此要尽量减少在页面中直接进行图片缩放

### 减少 DOM 元素数量和深度

* HTML 中标签元素越多，标签的层级越深，浏览器解析 DOM 并绘制到浏览器中所花的时间就越长，所以尽可能保持 DOM 元素简洁和层级较少

### 尽量避免使用 <table>、<iframe> 等慢元素

* `<table>`内容的渲染是将 table 的 DOM 渲染树全部生成完成并一次性绘制到页面上的，所以在长表格渲染时很耗性能，应该尽量避免使用它，可以考虑使用列表元素 `<ul>` 代替
* 尽量使用异步的方式动态添加 iframe，因为 iframe 内资源的下载进程会阻塞父页面静态资源的下载与 CSS 及 HTML DOM 的解析

### 避免运行耗时的 JavaScript

* 长时间运行的 JavaScript 会阻塞浏览器构建 DOM 树、DOM 渲染树、渲染页面。所以，任何与页面初次渲染无关的逻辑功能都应该延迟加载执行，这和 JavaScript 资源的异步加载思路是一致的

### 避免使用 CSS 表达式或 CSS 滤镜

* CSS 表达式或 CSS 滤镜的解析渲染速度是比较慢的，在有其他解决方案的情况下应该尽量避免使用

```javascript
// 不推荐
.opacity {
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);
}
```

文章来源： [https://www.cnblogs.com/laixiangran/p/9314652.html](https://www.cnblogs.com/laixiangran/p/9314652.html)