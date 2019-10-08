---
layout: post
title:  "前端面试题-综合"
date:   2019-03-31
excerpt: "综合 汇总"
interview: true
tag:
- interview
comments: true
---

<h1>目录</h1>

<h4>HTTP相关</h4>

&emsp;[1. HTTP有什么特点](#h1)

&emsp;[2. http和https协议有什么区别](#h2)

&emsp;[3. http状态码有那些？分别代表是什么意思](#h3)

&emsp;[4. 什么是HTTP持久化和管线化](#h4)

&emsp;[5. Http报文](#h5)

&emsp;[6. 从输入URL到页面加载全过程](#h6)

&emsp;[7. 为什么利用多个域名来存储网站资源会更有效](#h7)

<h4>浏览器相关</h4>

&emsp;[1. 浏览器是由什么组成的](#l1)

&emsp;[2. 浏览器缓存机制](#l2)

&emsp;[3. 浏览器渲染机制](#l3)

&emsp;[4. 几个很实用的BOM属性对象方法](#l4)

<h4>其他</h4>

&emsp;[1. 谈谈你对SEO的理解](#q1)

&emsp;[2. 前端怎么控制管理路由](#q2)

&emsp;[3. 防抖和节流的区别](#q3)

&emsp;[4. 页面重构怎么操作](#q4)


### HTTP相关

<h5 id='h1'>1. HTTP有什么特点</h5>

- 简单快速：客户向服务器请求服务时，只需传送请求方法和路径
- 灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由 `Content-Type` 加以标记
- 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接 (深入-持久连接、管线化)
- 无状态：HTTP协议是无状态协议( `Cookie` 的出现)

<h5 id='h2'>2. http和https协议有什么区别</h5>

> http: 是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（`TCP`），用于从`WWW`服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少

> https: 是以安全为目标的HTTP通道，简单讲是 `HTTP` 的安全版，即 `HTTP` 下加入 `SSL` 层，`HTTPS` 的安全基础是 `SSL` ，因此加密的详细内容就需要 `SSL`

- `http` 是超文本传输协议，信息是明文传输，`https` 则是具有安全性的 `ssl` 加密传输协议
- `http` 和 `https` 使用的是完全不同的连接方式，用的端口也不一样，前者是 `80` ，后者是 `443`
- `http` 的连接很简单，是无状态的；`HTTPS` 协议是由 `SSL+HTTP` 协议构建的可进行加密传输、身份认证的网络协议，比 `http` 协议安全

参考 [http与https的区别](https://juejin.im/entry/58d7635e5c497d0057fae036)

<h5 id='h3'>3. http状态码有那些？分别代表是什么意思</h5>

常用 `http` 状态码：

- `200` `OK` 服务器成功处理了请求
- `301/302` `Moved Permanently`（重定向）请求的URL已移走
- `404` `Not Found` (页面丢失)未找到资源
- `403`  服务器拒绝请求
- `408` （请求超时） 服务器等候请求时发生超时
- `501` `Internal Server Error` 服务器遇到一个错误，使其无法对请求提供服务
- `502` （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应
- `504` （网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求

更多 参考 [这里](https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660?fr=aladdin)

<h5 id='h4'>4. 什么是HTTP持久化和管线化</h5>

> 出现背景： `HTTP` 最初的版本中，每进行一次 `HTTP` 通信，就要断开一次 `TCP` 连接（无连接）

为解决上述问题，`HTTP/1.1` 增加了持久连接（HTTP Persistent Connections ）的方法，其特点是，**只要一方未明确提出断开连接，则另一方保持 `TCP` 连接状态**

> 管线化是指将多个 `HTTP` 请求整批发送，在发送过程中不用等待对方响应

管线化是在持久连接的基础上实现的，管线化的实现，能够同时并行发送多个请求，而不需要一个接一个的等待响应

<h5 id='h5'>5. Http报文</h5>

> `HTTP` 报文是面向文本的，报文中的每一个字段都是一些 `ASCII` 码串，各个字段的长度是不确定的。`HTTP` 有两类报文：**请求报文和响应报文**

> HTTP的这两种报文都由三部分组成：开始行、首部行、实体主体

参考 [这里](https://www.jianshu.com/p/a2c4ede32d11)


<h5 id='h6'>6. 从输入URL到页面加载全过程</h5>

参考 [这里](https://www.jianshu.com/p/fc95603b8cf0)

<h5 id='h7'>7. 为什么利用多个域名来存储网站资源会更有效</h5>

- `CDN` 缓存更方便
- 突破浏览器并发限制
- 节约 `cookie` 带宽
- 节约主域名的连接数，优化页面响应速度
- 防止不必要的安全问题

### 浏览器相关

<h5 id='l1'>1. 浏览器是由什么组成的</h5>

> 从原理构成上分为七个模块，分别是 `User Interface（用户界面）`、 `Browser engine（浏览器引擎）` 、 `Rendering engine（渲染引擎）` 、 `Networking（网络）` 、 `JavaScript Interpreter（js解释器）` 、 `UI Backend（UI后端）` 、`Date Persistence（数据持久化存储）`

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/Other/images/%E6%B5%8F%E8%A7%88%E5%99%A8.png)

> 其中，最重要的是渲染引擎（内核）和 `JavaScript` 解释器（`JavaScript`引擎）

> 浏览器内核主要负责 `HTML` 、`CSS` 的解析，页面布局、渲染与复合层合成; `JavaScript` 引擎负责 `JavaScript` 代码的解释与执行

<h5 id='l2'>2. 浏览器缓存机制</h5>

> 浏览器的缓存机制也就是我们说的 `HTTP` 缓存机制，其机制是根据 `HTTP` 报文的缓存标识进行的

参考 [这里](https://juejin.im/entry/5ad86c16f265da505a77dca4)

<h5 id='l3'>3. 浏览器渲染机制</h5>

参考 [这里](https://juejin.im/entry/59e1d31f51882578c3411c77)

<h5 id='l4'>4. 几个很实用的BOM属性对象方法</h5>

> location 对象：主要存储 url 相关信息

![image](https://raw.githubusercontent.com/ltadpoles/web-document/master/Other/images/location.jpg)

> history 对象：浏览历史信息相关

```js
history.go() // 前进或后退指定的页面数 history.go(num);
history.back() // 后退一页
history.forward() // 前进一页
```
 
> navigator 对象：浏览器信息相关

```js
navigator.userAgent  //返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
navigator.cookieEnabled // 返回浏览器是否支持(启用)cookie
```

### 其他

<h5 id='q1'>1. 谈谈你对SEO的理解</h5>

> SEO：搜索引擎优化，其目的是为了使网站能够更好的被搜索引擎抓取，提高在搜索引擎内的自然排名，从而带来更多的免费流量，获取收益

> SEO主要有两种方法，站内优化和站外优化

[前端SEO优化](https://imweb.io/topic/5682938b57d7a6c47914fc00)

<h5 id='q2'>2. 前端怎么控制管理路由</h5>

路由就是浏览器地址栏中的 `url` 与所见网页的对应关系

前端路由的实现方式：

> 基于 `hash`（`ocation.hash+hashchange`事件）

展示层面也就是切换 `#` 后面的内容，呈现给用户不同的页面。现在越来越多的单页面应用，基本都是基于  `hash` 实现

特性：
 
- `url` 中 `hash` 值的变化并不会重新加载页面
- `hash` 值的改变，都会在浏览器的访问历史中增加一个记录，也就是能通过浏览器的回退、前进按钮控制 `hash` 的切换
- 我们可以通过 `hashchange` 事件，监听到 `hash` 值的变化，从而响应不同路径的逻辑处理

> 基于 `istory` 新 `API`（ `history.pushState()+popState` 事件）

```js

window.history.pushState(null, null, "http://www.google.com");

```

这两个 `API` 的相同之处是都会操作浏览器的历史记录，而不会引起页面的刷新。不同之处在于，`pushState` 会增加一条新的历史记录，而 `replaceState` 则会替换当前的历史记录

详见[History API -MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

<h5 id='q3'>3. 防抖和节流的区别</h5>

> 防抖：任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行

> 节流：指定时间间隔内只会执行一次任务

推荐 [这里](https://juejin.im/post/5c87b54ce51d455f7943dddb#chapter-three-one)

<h5 id='q4'>4. 页面重构怎么操作</h5>

> 页面重构就是根据原有页面内容和结构的基础上，通过 `div+css` 写出符合 `web` 标准的页面结构。

具体实现要达到以下三点：

- 功能不全页面的重构：页面功能符合用户体验、用户交互结构完整，可通过标准验证，
- 代码重构：代码质量、`SEO` 优化、页面性能、更好的语义化、浏览器兼容、`CSS` 优化
- 充分考虑到页面在站点中的“作用和重要性”，并对其进行有针对性的优化