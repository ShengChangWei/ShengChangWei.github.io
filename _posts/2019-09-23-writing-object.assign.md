---
layout: post
title:  "Object.assign实现"
date:   2019-09-23
excerpt: "Object.assign实现"
handWriting: true
tag:
- javascript
comments: true
---


# Object.assign

*  `Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
* 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
* 针对深拷贝，需要使用其他办法，因为 `Object.assign()`拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。


```javascript
 //取出源对象到目标对象中，相同键的会被覆盖
Object['myAssign'] = function (target) {
    for (let i = 1; i < arguments.length; i++) {
        let nextObj = arguments[i];
        if (nextObj != null) {
            for (let key in nextObj) {
                if (nextObj.hasOwnProperty(key)) {
                    target[key] = nextObj[key];
                }
            }
        }
    }
    return target;
}

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnTarget = Object.myAssign(target, source)
console.log(returnTarget)
```



