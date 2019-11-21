---
layout: post
title:  "《JavaScript设计模式与开发实践》-- 基础知识准备"
date:   2019-07-27
excerpt: "JavaScript设计模式与开发实践"
model: true
tag:
- javascript
comments: true
---

# 《JavaScript设计模式与开发实践》


### 1、在不支持 Object.create 方法的浏览器中，则可以使用以下代码：

```javascript
Object.create = Object.create || function(obj) {
    var F = function(){};
    F.prototype = obj;
    return new F();
}
```

### 2、原型构造函数

```javascript
// 构造函数
function Animal(name) {
    this.name = name;
}
var dog = new Animal('jack');
console.log(dog.name);
console.log(dog)

// 说明：
// ① Animal 是构造函数
// ② dog 是通过 Animal 创建的实例
// ③ dog 的原型是构造函数 Animal
```

<img src="{{site.url}}/assets/img/js/yx.jpg">


### 3、this的指向

除去不常用的 with 和 eval 的情况，具体到实际应用中，this 的指向大致可以分为以下 4 种。

 作为对象的方法调用。
 作为普通函数调用。
 构造器调用。
 Function.prototype.call 或 Function.prototype.apply 调用。

```javascript
window.id = 'window'; 

 document.getElementById( 'div1' ).onclick = function(){ 
    alert ( this.id ); // 输出：'div1'
    var callback = function(){ 
        alert ( this.id ); // 输出：'window' 11 
    } 
    callback(); 
 };

 // 提前保存this
 document.getElementById( 'div1' ).onclick = function(){ 
    var that = this; // 保存 div 的引用
    var callback = function(){ 
        alert ( that.id ); // 输出：'div1' 
    } 
    callback(); 
};

// 在 ECMAScript 5 的 strict 模式下，这种情况下的 this 已经被规定为不会指向全局对象，而是 undefined：
function func(){ 
 "use strict" 
 alert ( this ); // 输出：undefined 
} 
func();

```

### 4、闭包

```javascript
    var func = function() {
        var a = 1; // 退出函数后局部变量a将被销毁
        alert(a);
    }
    func();
    /*************************/
    var func = function() {
        var a = 1;
        return function() {
            a++;
            alert(a);
        }
    };


    func()(); // 2
    func()(); // 2
    var func();
    f(); // 2
    f(); // 3 
    f(); // 4

```

#### 4.1 利用闭包封装

```javascript
    var mult = (function(){
        var cache = {};
        var calculate = function() {
            var a = 1;
            for(var i = 0;i < arguments.length < 1; i++) {
                a = a * arguments[i];
            }
            return a;
        };
        return function() {
            var args = Array.prototype.join.call(arguments, ',');
            if(args in cache) {
                return cache[args]
            }
            return cache[ args ] = calculate.apply(null, arguments);
        }
    })();
```