---
layout: post
title:  "手动实现new"
date:   2019-11-21
excerpt: "手动实现new"
handWriting: true
tag:
- javascript
comments: true
---


# 手动实现new

## new 做了什么操作

```shell
1、创建了一个空对象
2、链接到原型（空对象的`__proto__`成员指向构造对象`prototype`成员对象）
3、改变this的指向，让this指向新创建的实例对象
4、返回一个新对象
```

## 实现

new 的方法无法重写，模拟实现new 方法

```javascript
function myNew() {
    //1、创建一个空对象
    const obj = {}

    //2、取出参数第一个构造函数
    const contructor = [].shift.call(arguments);
    // 3、链接到原型
    obj.__proto__ = contructor.prototype;

    // 4、改变this的指向
    const result = contructor.apply(obj,arguments);

    // 5、返回一个新对象
    return typeof result === 'object'? result : obj;
}
```








