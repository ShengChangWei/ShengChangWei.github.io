---
layout: post
title:  "手动实现防抖"
date:   2019-10-16
excerpt: "手动实现防抖"
handWriting: true
tag:
- javascript
comments: true
---


# 手动实现防抖

## 含义

* 防抖：不管事件触发频率多高，一定是在时间触发n秒后才执行，如果你在事件触发n秒内又触发，就以新的事件的时间为准，重新计时。

## 实现

* 简单实现防抖

```javascript
function debounce(fn, wait) {
    // 缓存定时器
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

// 处理函数
function handle() {    
	console.log('测试防抖'); 
}

// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));
```

* 需要立即执行的防抖

```javascript
function debounce(fn, wait, immediate = true) {
    // 缓存定时器
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        if(immediate && !timer) {
            fn.apply(this, args)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
```

参考学习：

[https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E9%98%B2%E6%8A%96.md](https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E9%98%B2%E6%8A%96.md)







