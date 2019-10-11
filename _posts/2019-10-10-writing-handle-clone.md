---
layout: post
title:  "手动实现深拷贝"
date:   2019-10-10
excerpt: "手动实现深拷贝"
handWriting: true
tag:
- javascript
comments: true
---


# 手动实现深拷贝

## 一、浅拷贝和深拷贝的定义

* 浅拷贝： 创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

* 深拷贝： 将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象


## 二、实现深拷贝

### 乞丐版

```javascript
JSON.parse(JSON.stringify());
```

* 缺陷： 这种写法非常简单，而且可以应对大部分的应用场景，但是它还是有很大缺陷的，比如拷贝其他引用类型、拷贝函数、循环引用等情况。

### 基础版本

```javascript
function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};

// 测试
const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    }
};
```

缺陷： 没有考虑数组

### 考虑数组

```javascript
function clone(target) {
    if(typeof target === 'object') {
        let cloneTarget =  Array.isArray(target)? [] : {}
        for(const k in target) {
            cloneTarget[k] = clone(target[k])
        } 
        return cloneTarget;
    } else {
        return target;
    }
}

// 测试
const target = {
field1: 1,
field2: undefined,
field3: 'ConardLi',
field4: {
    child: 'child',
    child2: {
        child2: [1,2,3,4]
    }
}
};

const res = clone(target);
console.log(res);
```

深拷贝到此已经很不错了，但还要考虑其他情况未完待续……








学习参考：

非常非常感谢：[如何写出一个惊艳面试官的深拷贝](http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html)



