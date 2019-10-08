---
layout: post
title:  "手动实现函数柯里化"
date:   2019-09-23
excerpt: "手动实现函数柯里化"
handWriting: true
tag:
- javascript
comments: true
---


# JS函数柯里化

在阅读书籍或其他资料时多次遇到函数柯里化，开始时没有太多的关注，而且“函数柯里化”这个名字太过高大上，也让我闻风丧胆，望而却步。 在手动实现bind方法时，又遇到函数柯里化概念时，不得不硬着头皮去了解一番，了解阅读相关资料和博客后，发现所谓的函数柯里化也不过如此(ps:大话说出去了，此时我对函数柯里化还一脸懵)。

人总是被未知的东西所打败，事情很小却也暴露了自身问题。自我反思，痛定思痛，对技术自身一定要：“战术上藐视敌人 战略上重视敌人”。


## 首先看看柯里化到底是什么？

本文属于手动实现js函数柯里化专题，注重具体的实现代码，不会过多的文字累赘原理

柯里化：英语：Currying 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。


> 第一版

```javascript
 // 第一版
var curry = function(fn) {
    // 去除第一个函数参数，保留剩余参数
    const args = [...arguments].slice(1);
    // 返回一个函数
    return function() {
        const newArgs = args.concat([...arguments]); // 保存第二个函数的参数，并与第一个参数合并
        return fn.apply(this, newArgs); // 函数调用是返回
    }
}


function add(a, b) {
    return [a, b];
}

// 测试一
// const addCurry = curry(add, 1,2);
// console.log(addCurry()) // => [1, 2]

// 测试二
// const addCurry = curry(add, 1);
// console.log(addCurry(2)); // => [1, 2]

// 测试三
const addCurry = curry(add);
console.log( addCurry(1, 2)); // => [1,3]

// 总结：感觉离柯里化不远了，继续努力
```

> 第二版

```javascript
// 第二版
function sub_curry(fn) {
    // 去除第一个函数参数， 保存后面的参数
    const args = [...arguments].slice(1);
    return function() {
    return fn.apply(this, args.concat([...arguments]));
    }
}

function curry(fn, length) {
    // length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，那些已定义了默认值的参数不算在内，比如function（xx = 0）的length是0
    length = length || fn.length;
    return function() {
    if(arguments.length < length) {
        const combined = [fn].concat([...arguments]);
        return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
        return fn.apply(this, arguments);
    }
    }
}

// 测试代码
const fn = curry(function(a, b, c) {
    return [a, b, c];
})

// 解析： fn 调用
// fn(1,2,3); // => [1,2,3]
fn(1, 2)(3) // => [1, 2, 3]
fn(1)(2)(3) // ["a", "b", "c"]
fn(1)(2, 3) // ["a", "b", "c"]

// 总结：
// 脑袋有点大，继续下一步，回过头来再看
```

> 第三版

```javascript
 function currying(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args);
    } else {
        return (...args2) => currying(fn, ...args, ...args2);
    }
}
```

## 总结

脑袋有点大，虽然自己可以写出来了，也明白其中的原理，但是对每一步的执行结果没有了然于胸，还需加油努力努力，加油加油！！！

参考：

[https://github.com/ConardLi/awesome-coding-js](https://github.com/ConardLi/awesome-coding-js)




