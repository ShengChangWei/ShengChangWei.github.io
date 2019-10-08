---
layout: post
title:  "Object.assign()"
date:   2017-12-12
excerpt: "学习Object.assign()的用法"
javascript: true
tag:
- javascript
comments: true
---

## Object.assign()

### 一、介绍

```shell
  Object.assign() 方法用于将所有可枚举属性的值从一个或多
  个源对象复制到目标对象。它将返回目标对象。
```

### 二、JavaScript Demo

```javascript

  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };

  const returnedTarget = Object.assign(target, source);

  console.log(target); // { a: 1, b: 4, c: 5 }
  console.log(returnedTarget); // { a: 1, b: 4, c: 5 }

```

### 三、注意点：

```shell
  * 如果目标对象中的属性具有相同的键，则属性将被源
  对象中的属性覆盖。后面的源对象的属性将类似地覆盖
  前面的源对象的属性。
  * Object.assign 不会跳过那些值为 null 或 undefined 的源对象。
```

### 四、示例

#### 1、复制一个对象

```javascript
    const obj = {a: 1}
    const copy = Object.assign({}, obj)
    console.log(copy); // {a:1}
```