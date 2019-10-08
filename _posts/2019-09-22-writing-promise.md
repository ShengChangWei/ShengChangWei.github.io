---
layout: post
title:  "手动实现promise"
date:   2019-09-22
excerpt: "手动实现promise，加深理解"
handWriting: true
tag:
- javascript
comments: true
---

# 一、原生实现的方法

> 基本使用方法

<!-- ```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```


> 思路解析

* 首先Promise是个构造函数
* MyPromise接收一个函数executor，executor有两个参数resolve方法和reject方法
* resolve将PENDING改变为FULFILLED
* reject将PENDING改变为FULFILLED
* promise变为FULFILLED状态后具有一个唯一的value
* promise变为REJECTED状态后具有一个唯一的reason
* then方法接受两个参数onFulfilled、onRejected，它们分别在状态由PENDING改变为FULFILLED、REJECTED后调用
* 同步调用：状态已经改变，直接调用onFulfilled方法
* 异步调用：状态还是PENDING，将onFulfilled、onRejected分别加入两个函数数组onFulfilledCallbacks、onRejectedCallbacks，当异步调用resolve和reject时，将两个数组中绑定的事件循环执行。

> 具体代码

```javascript
// 手动实现promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(executor) {
    this.state = PENDING; // 状态pending
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
        if(this.state === PENDING) {
            this.state = FULFILLED;
            this.value = value;
            this.onFulfilledCallbacks.forEach(fun => {
                fun();
            })
        }
    }
    const reject = (reason) => {
        if(this.state === 'PENDING') {
            this.state = 'REJECTED';
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fun => {
                fun();
            })
        }
    }
    try {
        executor(resolve, reject)
    } catch(reason) {
        reject(reason)
    }
    
}

// then的方法
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    switch(this.state) {
        case FULFILLED:
        onFulfilled(this.value);
        break;
        case REJECTED:
        onFulfilled(this.value);
        break;
        case PENDING:
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.value);
            })
            break;
    }
}

let promise = new MyPromise(function(resolve, reject) {
        resolve('测试数据')
})
promise.then((res) => {
    console.log(res);
})
```

* 未完待续




学习参考：

* [ECMAScript 6 入门](http://es6.ruanyifeng.com/)

* [用JavaScript实现的算法和数据结构，附详细解释和刷题指南](https://github.com/ConardLi/awesome-coding-js) -->

