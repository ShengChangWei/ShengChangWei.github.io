---
layout: post
title:  "原型链随记"
date:   2019-10-09
excerpt: "又遇原型链，逃不掉的坎"
javascript: true
tag:
- javascript
comments: true
---


# 原型链

```javascript
function Person() {
    this.name = 'sheng'
}
// 实例化对象
let person = new Person();
console.log( person instanceof Person)
```

* prototype 是构造函数才会有的属性
* 属性`__proto__`:每一个javaScript对象都具有一个属性，叫`__proto__`,这个属性会指向该对象的原型
* Person.prototype 是原型对象
* constructor: 每个原型对象都有一个constructor属性指向关联的构造函数

