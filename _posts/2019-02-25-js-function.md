---
layout: post
title:  "函数"
date:   2019-02-25
excerpt: "javaScript权威指南第8章"
javascript: true
tag:
- javascript
- function
- javaScript权威指南
comments: true
---

# 一、函数

## 1、函数定义

```shell
    函数是这样的一段JavaScript代码，它只定义一次，但可能被执行或调用任意次。
    JavaScript函数是参数化的：函数的定义会包括一个称为形参（parameter）的标识符列表，
    这些参数在函数体中像局部变量一样工作。函数调用会为形参提供实参的值[1]。函数使用它
    们实参的值来计算返回值，成为该函数调用表达式的值。除了实参之外，每次调用还会拥有另
    一个值——本次调用的上下文——这就是this关键字的值。
```

## 2、函数调用-----方法链

```shell
    当方法的返回值是一个对象，这个对象还可以再调用它的方法。这种方法调用序列中
    （通常称为“链”或者“级联”）每次的调用结果都是另外一个表达式的组成部分。比如，
    基于jQuery库（参见第19章），我们常常会这样写代码
```

```javascript
    $(":header").map(function(){return this.id}).get().sort();
```

```shell
    当方法并不需要返回值时，最好直接返回this。如果在设计的API中一直采用这种方式（每个方法都返
    回this），使用API就可以进行“链式调用”[3]风格的编程，在这种编程风格中，只要指定一次要调用
    的对象即可，余下的方法都可以基于此进行调用：
```

## 3、函数的实参和形参

### 3.1 可选形参

```shell
    当调用函数的时候传入的实参比函数声明时指定的形参个数要少，剩下的形参都将设置为undefined值。
    因此在调用函数时形参是否可选以及是否可以省略应当保持较好的适应性。为了做到这一点，应当给省略
    的参数赋一个合理的默认值
```

```javascript
    //将对象o中可枚举的属性名追加至数组a中，并返回这个数组a
    //如果省略a，则创建一个新数组并返回这个新数组
    function getPropertyNames(o,/*optional*/a){
        if(a===undefined)a=[];//如果未定义，则使用新数组
        for(var property in o)a.push(property);
        return a;
    }
    //这个函数调用可以传入1个或2个实参
    var a=getPropertyNames(o);//将o的属性存储到一个新数组中
    getPropertyNames(p,a);//将p的属性追加至数组a中

    // 如果在第一行代码中不使用if语句，可以使用“||”运算符，这是一种习惯用法[4]：
    a=a||[];
```
### 3.2 可变长的实参列表：实参对象(arguments)

```shell
    当调用函数的时候传入的实参个数超过函数定义时的形参个数时，没有办法直接获得未命名值的引用。
    参数对象解决了这个问题。在函数体内，标识符arguments是指向实参对象的引用，实参对象是一个类
    数组对象（参照7.11节），这样可以通过数字下标就能访问传入函数的实参值，而不用非要通过名字来
    得到实参。
```

```javascript
    function max(/*...*/){
    var max=Number.NEGATIVE_INFINITY;//遍历实参，查找并记住最大值
    for(var i=0;i<arguments.length;i++)
    if(arguments[i]>max)max=arguments[i];//返回最大值
    return max;
    }
    var largest=max(1,10,100,2,3,1000,4,5,10000,6);//=＞10000
```
#### callee和caller属性区别：

##### * caller

```shell
    返回一个函数的引用，这个函数调用了当前的函数。
    1、这个属性只有当函数在执行时才有用
    2、如果在javascript程序中，函数是由顶层调用的，则返回null
```
```javascript
    var a = function() {
        console.log(a.caller)
    }

    var b = function() {
        a();
    }

    a(); // =>null
    b(); // var a = function() { a() } 返回的是当前调用的函数

```
##### * callee

```shell
    callee放回正在执行的函数本身的引用，它是arguments的一个属性，这是与caller一个很大的区别
    1、这个属性只有在函数执行时才有效
    2、它有一个length属性，可以用来获得形参的个数，因此可以用来比较形参和实参个数是否一致，即
    比较arguments.length是否等于arguments.callee.length
    3、它可以用来递归匿名函数。
```

```javascript
    var a = function() {
        console.log(arguments.callee)
    }

    var b = function() {
        a();
    }

    a();
    b(); // 两者返回一样，都是a函数本身

    // 补充：递归
   function sum (num){
        if(num <= 1){
            return 1;
        }else{
            return num * (sum(num - 1))
        }
    }
    console.log(sum(5))
    //为避免函数名称修改致使函数内部报错,改写成下面
    function sum (num){
    if(num <= 1){
        return 1;
    }else{
        return num * (arguments.callee(num - 1))
    }
}
console.log(sum(5))
//结果:5*4*3*2*1=120

function a(num1,num2,num3){
    console.log(arguments.length);//实参长度为1
    console.log(arguments.callee.length);//形参长度为3
}
a(0);
```

## 4、闭包

### 4.1、闭包实例

```javascript   

    var scope = "global scope"; // 全局变量
    function checkscope() {
        var scope = "local scope";
        function f() {return scope}
        return f
    }

    checkscope()();// => local scope
```
> JavaScript函数的执行用到了作用域链，这个作用域链是函数定义的时候创建的。嵌套的函数f()定义在这个作用域链里，其中的变量scope一定是局部变量，不管在何时何地执行函数f()，这种绑定在执行f()时依然有效。因此最后一行代码返回"local scope"，而不是"global scope"。

## 5、高阶函数

### 5.1定义
    高阶函数（higher-order function）就是操作函数的函数，它接收一个或多个函数作为参数，并返回一个新函数，

