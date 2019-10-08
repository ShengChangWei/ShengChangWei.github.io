---
layout: post
title:  "ES6-Set和Map数据结构"
date:   2019-05-10
excerpt: "ECMAScript 6 入门"
javascript: true
tag:
- ES6 
comments: true
---

## Set和Map数据结构

### 1、Set

#### 1.1 基本用法

`ES6` 提供了新的数据结构 `Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值。
`Set` 本身是一个构造函数，通过`new`生成 `Set` 数据结构。

```javascript

const s = new Set([1,2,3,2,3,1]);

console.dir(s);// set(3) {1,2,3}

typeof s; // Object

```
上面代码表明 通过`new Set()` 创建的实例类型是`Object`，`Set`结构不会是重复的值。

`Set`函数可以接受一个数组（或者具有 `iterable` 接口的其他数据结构）作为参数，用来初始化。

```javascript
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

```

上面代码也展示了一种去除数组重复成员的方法。

```javascript

// 去除数组的重复成员
[...new Set(array)]

```

注意： 向 `Set` 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。`NaN`等于自身。例：

```javascript

let set = new Set();
let a = NaN;
let b = NaN;
set.add(a); // add是Set的一个方法，可用来向set中添加数据
set.add(b);
set // Set {NaN}

```

另外，两个对象总是不相等的。

```javascript
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2

```

### 1.2 Set的实例属性和方法

`Set` 结构的实例有以下属性。

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。

`Set` 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

- `add(value)`：添加某个值，返回 `Set` 结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

上面这些属性和方法的实例如下。

```javascript

s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

```

下面是一个对比，看看在判断是否包括一个键上面，`Object`结构和`Set`结构的写法不同。

```javascript
// 对象的写法
const properties = {
  'width': 1,
  'height': 1
};

if (properties[someName]) {
  // do something
}

// Set的写法
const properties = new Set();

properties.add('width');
properties.add('height');

if (properties.has(someName)) {
  // do something
}
```
Array.from方法可以将 Set 结构转为数组, 两者结合可用来数组去重

```javascript

const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

```
