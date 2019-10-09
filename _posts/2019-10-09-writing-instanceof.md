---
layout: post
title:  "instanceof实现"
date:   2019-10-09
excerpt: "instanceof实现"
handWriting: true
tag:
- javascript
comments: true
---


# instanceof

> 基本用法

* instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```javaScript
a instanceof Object
```

> 复杂用法

```javascript
function Person() {}
console.log(Object instanceof Object);     //true
//第一个Object的原型链：Object=>
//Object.__proto__ => Function.prototype=>Function.prototype.__proto__=>Object.prototype
//第二个Object的原型：Object=> Object.prototype

console.log(Function instanceof Function); //true
//第一个Function的原型链：Function=>Function.__proto__ => Function.prototype
//第二个Function的原型：Function=>Function.prototype

console.log(Function instanceof Object);   //true
//Function=>
//Function.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
//Object => Object.prototype

console.log(Person instanceof Function);      //true
//Person=>Person.__proto__=>Function.prototype
//Function=>Function.prototype

console.log(String instanceof String);   //false
//第一个String的原型链：String=>
//String.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
//第二个String的原型链：String=>String.prototype

console.log(Boolean instanceof Boolean); //false
//第一个Boolean的原型链：Boolean=>
//Boolean.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
//第二个Boolean的原型链：Boolean=>Boolean.prototype

console.log(Person instanceof Person); //false
//第一个Person的原型链：Person=>
//Person.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
//第二个Person的原型链：Person=>Person.prototype
```

> 原生实现方法

```javascript
function myInstanceof(left, right) {
    // 获取的类型的原型
    let prototype = right.prototype;

    // 获得对象的原型
    let obj = left.__proto__;

    // 判断对象的类型是否等于类型的原型
    while(true) {
        if(obj === null) return false;
        if(obj === prototype) return true;
        // 如果都没有重新赋值
        obj = obj.__proto__;
    }
};
```

参考：

[https://www.cnblogs.com/SourceKing/p/5766210.html](https://www.cnblogs.com/SourceKing/p/5766210.html)

[https://juejin.im/post/5d2addffe51d455c8838e208](https://juejin.im/post/5d2addffe51d455c8838e208)


