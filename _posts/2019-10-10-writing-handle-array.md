---
layout: post
title:  "数组去重、扁平、最值"
date:   2019-10-10
excerpt: "数组去重、扁平、最值"
handWriting: true
tag:
- javascript
comments: true
---


# 数组去重、扁平、最值

> 一、去重

* Object

用一个对象来标示元素是否出现过

```javascript
const unique=(array) => {
    const obj = {}
    return  array.filter((item, index) => {return obj.hasOwnProperty(item)? false : obj[item] = true})
}

unique([1,2,1,2,1,3,5,3,4,2,])
```

* indexOf + filter

indexOf 返回的是数组元素第一次出现的索引

```javascript
const unique =(array) => array.filter((item, i ) => array.indexOf(item) === i);
unique([1,2,1,2,1,3,5,3,4,2,]);
```

* set 

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

```javascript
// 第一种
const unique = array => Array.from(new Set(array));
// 第二种
const unique = array => [...new Set(array)];

unique([1,2,1,2,1,3,5,3,4,2,]);
```

* 排序去重

先排序然后比较相邻元素是否相等

```javascript
const unique = (array) => {
    array.sort((a, b) => a-b) ;
    //比较相邻
    let pre = 0;
    let resultArray = []
    for(let i = 0; i<array.length; i++) {
        if(!i || array[i] !== array[pre]) {
            resultArray.push(array[i])
        }
        pre = i;
    }
    return resultArray;
}
const res =  unique([1,2,1,2,1,3,5,3,4,2,]);
```

* 扩展去掉数组中重复的元素，不保留重复的元素

```javascript
const filterNonUnique = arr => arr.filter(i => 
  arr.indexOf(i) === arr.lastIndexOf(i)
)

 filterNonUnique([1,2,1,2,1,3,5,3,4,2,]); // [5 , 4]
```

> 二、数组扁平化

* 基本实现

```javascript
const flat = (array) => {
    let resultArray = [];
    for(let i = 0; i<array.length; i++) {
        if(Array.isArray(array[i])) {
            resultArray = resultArray.concat(flat(array[i]));
        }else {
            resultArray.push(array[i])
        }
    }
    return resultArray;
}
const res = flat([1,2,[3,2],[2,3],2,6,3,[6,4]]);
```

* 使用reduce简化

```javascript
function flatten(array) {
    return array.reduce(
    (prev, cur) =>
        Array.isArray(cur) ?
        prev.concat(flatten(cur)) :
        prev.concat(cur)
    , [])
}
```

扩展一下reduce用法

```javascript
arr.reduce(function(prev,cur,index,arr){
...
}, init);
```
arr 表示原数组；
prev 表示上一次调用回调时的返回值，或者初始值 init;
cur 表示当前正在处理的数组元素；
index 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
init 表示初始值。

* 根据指定深度扁平数组

```javascript
function flattenByDeep(array, deep = 1) {
    return array.reduce(
    (prev, cur) =>
        Array.isArray(cur) && deep > 1 ?
        prev.concat(flattenByDeep(cur, deep - 1)) :
        prev.concat(cur)
    , [])
}
```

> 三、最值

* reduce

```javascript
array.reduce((c,n)=>Math.max(c,n))
```

* Math.max

`Math.max`参数原本是一组数字，只需要让他可以接收数组即可。

```javascript
const array = [3,2,1,4,5];
Math.max.apply(null,array);
Math.max(...array);
```

> 四、使用reduce实现map

```javascript
Array.prototype.reduceToMap = function (handler) {
    return this.reduce((target, current, index) => {
        target.push(handler.call(this, current, index))
        return target;
    }, [])
};
```

> 五、使用reduce实现filter

```javascript
Array.prototype.reduceToFilter = function (handler) {
    return this.reduce((target, current, index) => {
    if (handler.call(this, current, index)) {
        target.push(current);
    }
    return target;
    }, [])
};
```



学习参考：

非常感谢：[https://github.com/ConardLi/awesome-coding-js](https://github.com/ConardLi/awesome-coding-js)



