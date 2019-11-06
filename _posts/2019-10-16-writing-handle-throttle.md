---
layout: post
title:  "手动实现节流"
date:   2019-10-16
excerpt: "手动实现节流"
handWriting: true
tag:
- javascript
comments: true
---


# 手动实现节流

## 含义

* 节流: 在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。



## 实现

```javascript
function throttle(fn, time) {
    let pre = 0;
    let timer = null;
    return function(...args) {
        if(Date.now() - pre > time) {
            clearTimeout(timer);
            timer = null;
            pre = Date.now();
            fn.apply(this, args);
        } else if(!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args);
            })
        }
    }
}
```





参考学习：

[https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E8%8A%82%E6%B5%81.md](https://github.com/ConardLi/awesome-coding-js/blob/master/JavaScript/%E8%8A%82%E6%B5%81.md)







