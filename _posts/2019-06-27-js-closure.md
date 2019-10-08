---
layout: post
title:  "又遇闭包"
date:   2019-06-27
excerpt: "闭包问题"
javascript: true
tag:
- javascript
comments: true
---


> 我爱你，不光是因为你的样子，还因为和你在一起，我的样子。 《爱》——罗伊·克里夫特

## 1、前言

看了自己一些博客，发现所有的文章都是东凑凑西凑凑，最后整理成一篇文章，还美名其曰这是我写的东西，细看之下，垃圾至极！(纯属正确观点自嘲)。废话少说，言归正传，再让我凑一篇文章，学习总结，满足一下自己的虚荣心

## 2、闭包概念

  对这个概念曾经看过别人的介绍：闭包就是定义在一个函数内部的函数，所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。也曾将这句话记住，最后发现只是记住理解不了。最近又遇到闭包的概念，又再次加深了对闭包的理解，概念如下：
   
   ```shell
    闭包： 函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。
   ```
   ```javascript
    function A() {
        let a = 1;
        function B() {
            console.log(a);
        }
        return B;
    }
    let returnB = A(); // 此时调用只是返回函数B；
    returnB(); // => 1
    // 直接调用
    A()(); // => 1
   ```

   你是否会疑惑，为什么函数 A 已经弹出调用栈了，为什么函数 B 还能引用到函数 A 中的变量。因为函数 A 中的变量这时候是存储在堆上的。现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。

## 3、经典面试题

> 循环中使用闭包解决 var 定义函数的问题

```javascript

for ( var i=1; i<=6; i++) {
	setTimeout( function timer() {
		console.log( i ); 
	}, 1000 );
}

```
首先要理解异步和同步的问题，同步总会先于异步执行，setTimeout 是个异步函数，那么只有当同步循环全部执行完毕才会执行，此时i就是6;所以会输出6。 (ps:Today针对同步和异步说了很多废话，愿莫嫌)

> 解决办法两种，第一种使用闭包

```javascript

for (var i = 1; i <= 5; i++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, 1000);
  })(i);
}

```

此时每次执行的时候i都会是自执行函数的实参传递给setTimeout,这时会执行完这个函数才会进行下一次的循环


> 第二种就是使用 setTimeout 的第三个参数

```javascript

for ( var i=1; i<=5; i++) {
	setTimeout( function timer(j) {
		console.log( j );
	}, 1000, i);
}

```
setTimeout 第三个参数会作为前面回调函数的附加参数，setTimeout 从第三个位起，所有的参数都会作为前面函数的参数

```javascript
  setTimeout((a,b,c) => {
      console.log(a+b+c) // 6
  },1000, 1,2,3)
```

> 第三种就是使用 let 定义 i 了

```javascript

for ( let i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, 1000 );
}

```
因为对于 let 来说，他会创建一个块级作用域，相当于

```javascript
{ // 形成块级作用域
  let i = 0
  {
    let ii = i
    setTimeout( function timer() {
        console.log( ii );
    }, 1000 );
  }
  i++
  {
    let ii = i
  }
  i++
  {
    let ii = i
  }
  ...
}

```

## 4、思考题

思考: 几秒打印一次6

```javascript
for ( var i=1; i<=6; i++) {
	setTimeout( function timer() {
		console.log( i ); 
	}, i * 1000 );
}
```



