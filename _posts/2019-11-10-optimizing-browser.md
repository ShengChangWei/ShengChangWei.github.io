---
layout: post
title:  "浏览器缓存--前端性能优化"
date:   2019-11-10
excerpt: "浏览器缓存"
optimizing: true
tag:
- 前端性能优化
comments: true
---

## 目录

* [前言](#前言)
* [何为图片的优化](#何为图片的优化)
* [不同业务场景下的图片方案选型](#不同业务场景下的图片方案选型)
  - [图片格式](#图片格式)
  - [不同图片格式的优缺点和应用场景](#不同图片格式的优缺点和应用场景)
    * [JPEG/JPG](#jpeg/jpg)
    * [PNG](#png)
    * [SVG](#svg)
    * [Base64](#base64)
    * [WebP](#webp)
* [小结](#小结)
* [参考学习](#参考学习)
* [我想对你说](#我想对你说)



## 前言

前端页面加载网络资源是必不可少的，因此前端性能的优化也就必须考虑到浏览器缓存。缓存可以说是性能优化中简单高效的一种优化方式了。一个优秀的缓存策略可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷。

Chrome 官方给出的解释：

```shell
通过网络获取内容既速度缓慢又开销巨大。较大的响应需要在客户端与服务器之间进行多次往返通信，
这会延迟浏览器获得和处理内容的时间，还会增加访问者的流量费用。因此，缓存并重复利用之前获取
的资源的能力成为性能优化的一个关键方面。
```

## 浏览器缓存机制

浏览器缓存机制有四个方面，它们按照获取资源时请求的优先级依次排列如下：

1. Memory Cache
2. Service Worker Cache
3. HTTP Cache
4. Push Cache（HTTP2 的新特性）

## MemoryCache

###  介绍

MemoryCache 是指存在内存中的缓存(与之相对 disk cache 就是硬盘上的缓存)。从优先级上来说，它是浏览器最先尝试去命中的一种缓存。从效率上来说，它是响应速度最快的一种缓存。但是当进程结束后，也就是tab页关闭以后，内存里的数据也将不复存在。

### 那么哪些文件会被放入内存呢？

引用《前端性能优化原理与实践》说法

事实上，这个划分规则，一直以来是没有定论的。不过想想也可以理解，内存是有限的，很多时候需要先考虑即时呈现的内存余量，再根据具体的情况决定分配给内存和磁盘的资源量的比重——资源存放的位置具有一定的随机性。

虽然划分规则没有定论，但根据日常开发中观察的结果，包括我们开篇给大家展示的 Network 截图，我们至少可以总结出这样的规律：资源存不存内存，浏览器秉承的是“节约原则”。我们发现，Base64 格式的图片，几乎永远可以被塞进 memory cache，这可以视作浏览器为节省渲染开销的“自保行为”；此外，体积不大的 JS、CSS 文件，也有较大地被写入内存的几率——相比之下，较大的 JS、CSS 文件就没有这个待遇了，内存资源是有限的，它们往往被直接甩进磁盘。

## Service Worker Cache

### 介绍

Service Worker 是一种独立于主线程之外的 Javascript 线程。Service Worker 能够操作的缓存是有别于浏览器内部的 memory cache 或者 disk cache 的。这个缓存是永久性的，即关闭 tab 或者浏览器，下次打开依然还在(而 memory cache 不是)。有两种情况会导致这个缓存中的资源被清除：手动调用 API cache.delete(resource) 或者容量超过限制，被浏览器全部清空。

### Service Worker 的生命周期

Service Worker 的生命周期包括 install、active、working 三个阶段。

### 使用 Service Worker 实现离线缓存

`注意`:  Server Worker 对协议是有要求的，必须以 https 协议为前提。

```javascript
window.navigator.serviceWorker.register('/test.js').then(
   function () {
      console.log('注册成功')
    }).catch(err => {
      console.error("注册失败")
    })
```
在 test.js 中，我们进行缓存的处理。假设我们需要缓存的文件分别是 test.html,test.css 和 test.js：

```javascript
// Service Worker会监听 install事件，我们在其对应的回调里可以实现初始化的逻辑  
self.addEventListener('install', event => {
  event.waitUntil(
    // 考虑到缓存也需要更新，open内传入的参数为缓存的版本号
    caches.open('test-v1').then(cache => {
      return cache.addAll([
        // 此处传入指定的需缓存的文件名
        '/test.html',
        '/test.css',
        '/test.js'
      ])
    })
  )
})

/**
Service Worker会监听所有的网络请求，网络请求的产生触发的是fetch事件，
我们可以在其对应的监听函数中实现对请求的拦截，
进而判断是否有对应到该请求的缓存，实现从Service Worker中取到缓存的目的
*/ 
self.addEventListener('fetch', event => {
  event.respondWith(
    // 尝试匹配该请求对应的缓存值
    caches.match(event.request).then(res => {
      // 如果匹配到了，调用Server Worker缓存
      if (res) {
        return res;
      }
      // 如果没匹配到，向服务端发起这个资源请求
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }
        // 请求成功的话，将请求缓存起来。
        caches.open('test-v1').then(function(cache) {
          cache.put(event.request, response);
        });
        return response.clone();
      });
    })
  );
});
```

## HTTP Cache

HTTP 缓存是开发中最用的最多的，也是比较熟悉的缓存机制，它又分为强缓存和协商缓存。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存。















