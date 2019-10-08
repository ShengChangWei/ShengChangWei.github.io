---
layout: post
title:  "手动实现call、apply、bind"
date:   2019-09-22
excerpt: "手动实现call、apply、bind"
handWriting: true
tag:
- javascript
comments: true
---

# 一、原生实现的方法


> call 实现方法

实现思路：

* 不传入第一个参数，那么默认为 window
* 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```javascript
Function.prototype.myCall = function (context) {
  var context = context || window
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}
// 测试
var x = 0;
function f(y,z) {
    console.log(this.x + y+ z)
}
var obj = {
    x: 1
}
f.myCall(obj, 2,3); // 1+2+3=6
```

> apply 实现方法

* apply 实现思路和call差不多，只是在处理传入第二参数不同

```javascript
Function.prototype.myApply = function (context) {
  var context = context || window
  context.fn = this

  var result
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}
```

> bind 实现方法

```javascript
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```