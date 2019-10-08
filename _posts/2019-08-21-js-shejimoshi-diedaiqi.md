---
layout: post
title:  "《JavaScript设计模式与开发实践》-- 迭代器模式"
date:   2019-08-21
excerpt: "迭代器模式" 
javascript: true
tag:
- 设计模式
comments: true
---

# 迭代器模式

## 1、定义

迭代器模式: 是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示;（学完回来思考思考）


## 2、JQuery中的迭代器

i 为当前索引，n 为当前元素

```javascript
$.each([1,2,3], function(i, n) {
    console.log('当前下标为：' + i);
    console.log('当前值为：' + n);
})
```

## 3、实现自己的迭代器

代码如下：

```javascript
var each = function(ary, callback) {
    for(var i = 0;i < arr.length; i++) {
        callback.call(arr[i], i, ary[i]);
    }
};
each([1, 2, 3], function(i, n) {
    alert([i, n]);
})
```

## 4、内部迭代器和外部迭代器

### 4.1 内部迭代器

内部迭代器： 我们刚刚编写的 each 函数属于内部迭代器，each 函数的内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用。

缺点：由于内部迭代器的迭代规则已经被提前规定，上面的 each 函数就无法同时迭代 2 个数组了。

比如现在有个需求，要判断 2 个数组里元素的值是否完全相等， 如果不改写 each 函数本身的代码，我们能够入手的地方似乎只剩下 each 的回调函数了，代码如下：

```javascript
var compare = function(ary1, ary2) {
    if(ary1.length !== ary2.length) {
        throw new Error('ary1和ary2不相等');
    }
    each(ary1, function(i, n) {
        if(n !==ary2[i]) {
            throw new Error('ary1和ary2不相等');
        }
    });
    alert('ary1和ary2相等')
};
compare([1, 2, 3], [1, 2,4]); // throw new Error ( 'ary1 和 ary2 不相等' );
```
### 4.2 外部迭代器

外部迭代器：必须显式地请求迭代下一个元素。

优缺点：外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制迭代的过程或者顺序。

外部迭代器实现代码如下：

```javascript
var Iterator = function(obj) {
    var current = 0;
    var next = function() {
        current += 1;
    };
    var isDone = function() {
        return current >= obj.length
    };
    var getCurrItem = function() {
        return obj[current];
    };
    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
}
```

再看看如何改写 compare 函数：

```javascript
var compare = function( iterator1, iterator2 ){ 
    while( !iterator1.isDone() && !iterator2.isDone() ){ 
        if ( iterator1.getCurrItem() !== iterator2.getCurrItem() ){ 
        throw new Error ( 'iterator1 和 iterator2 不相等' ); 
        } 
        iterator1.next(); 
        iterator2.next(); 
    } 
    alert ( 'iterator1 和 iterator2 相等' ); 
}
var iterator1 = Iterator( [ 1, 2, 3 ] ); 
var iterator2 = Iterator( [ 1, 2, 3 ] );

compare( iterator1, iterator2 ); // 输出：iterator1 和 iterator2 相等
```

外部迭代器虽然调用方式相对复杂，但它的适用面更广，也能满足更多变的需求。内部迭代器和外部迭代器在实际生产中没有优劣之分，究竟使用哪个要根据需求场景而定。


## 5、迭代类数组对象和字面量对象

迭代器模式不仅可以迭代数组，还可以迭代一些类数组对象

在JavaScript中， for in语句可以用来迭代普通字面量对象的属性。jQuery中提供了$.each函数来封装各种迭代器

```javascript
$.each = function(obj, callback) {
    var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj);
        if(isArray) { // 迭代类数组
            for(; i<length; i++) {
                value = callback.call(obj[i], i, obj[i]);
                if(value === false) {
                    break;
                }
            }
        } else {
            for(i in obj) { // 迭代object 对象
                value= callback.call(obj[i], i, obj[i]);
                if(value === false) {
                    break;
                }
            }
        }
    return obj;
}
```

## 6、倒序迭代器

代码如下：

```javascript
var reverseEach = function(ary, callback) {
    for(var l = ary.length - 1; l >=0; l--) {
        callback(l,k ary[l]);
    }
};
reverseEach([0, 1, 2], function(i, n) {
    console.log(n); // 分别输出： 2, 1, 0
})
```

## 7、中止迭代器

在第 5 节中有如下代码：

```javascript
if(value === false) {
    break;
}
```
这句代码的意思是：约定如果回调函数的执行结果返回`false`,则提前终止循环，把之前的each函数改写一下：

```javascript
var each = function(ary, callback) {
    for(var i = 0; l= ary.length; i < l; i++) {
        if(callback(i, arr[i])=== false) {
            break;
        } 
    }
}
each([1,2,3,4,5], function(i, n) {
    if(n > 3) {
        return false;
    }
    console.log(n); // 分别输出： 1,2,3
})
```

## 8、迭代模式的应用举例

需求：根据不同的浏览器或flash插件，使用不同的插件

代码如下：

```javascript
var getActiveUploadObj = function(){ 
    try{ 
        return new ActiveXObject( "TXFTNActiveX.FTNUpload" ); // IE 上传控件
    }catch(e){ 
        return false; 
    } 
}; 
var getFlashUploadObj = function(){ 
    if ( supportFlash() ){ // supportFlash 函数未提供
        var str = '<object type="application/x-shockwave-flash"></object>'; 
        return $( str ).appendTo( $('body') ); 
    } 
    return false; 
}; 
var getFormUpladObj = function(){ 
    var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
    return $( str ).appendTo( $('body') ); 
};
```
迭代器代码如下：

```javascript
var iteratorUploadObj = function(){ 
    for ( var i = 0, fn; fn = arguments[ i++ ]; ){ 
        var uploadObj = fn(); 
        if ( uploadObj !== false ){ 
            return uploadObj; 
        } 
    } 
}; 
var uploadObj = iteratorUploadObj( getActiveUploadObj, getFlashUploadObj, getFormUpladObj );
```

## 9、小结

迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。目前的绝大部分语言都内置了迭代器。