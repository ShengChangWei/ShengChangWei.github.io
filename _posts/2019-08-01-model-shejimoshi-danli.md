---
layout: post
title:  "《JavaScript设计模式与开发实践》-- 单例模式"
date:   2019-08-01
excerpt: "单例模式"
model: true
tag:
- 设计模式
comments: true
---

> 原来只是听过设计模式，却不晓得其真面目，今天，终于步入了设计模式学习的殿堂，想想还有点小兴奋呢

## 1、定义

单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。（这句话能理解多少是多少，学完整章回来品品）；

单例模式的核心是确保只有一个实例，并提供全局访问。

## 2、实现单例模式（简单）

要实现一个标准的单例模式并不复杂，无非是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。代码如下：

```javascript
// 构造函数
var Singleton = function(name) {
    this.name = name;
    this.instance = null;
};
// 原型方法
Singleton.prototype.getName = function() {
    alert(this.name);
}
Singleton.getInstance = function(name) {
    if(!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
};

var a = Singleton.getInstance('a');
var b = singleton.getInstance('b');
console.log(a === b); // true

/**或者**/
var Singleton = function(name) {
    this.name = name;
}
Singleton.prototype.getName = function() {
    alert(this.name);
}
Singleton.getInstance = (function() {
    var instance = null;
    return function (name) {
        if(!instance) {
            instance = new Sinleton(name);
        }
        return instance;
    }
})();
```
缺点： 这种方式相对简单，但有一个问题，就是增加了这个类的“不透明性”，Singleton 类的使用者必须知道这是一个单例类， 跟以往通过 new XXX 的方式来获取对象不同，这里偏要使用 Singleton.getInstance 来获取对象。

## 3、透明的单例模式

我们现在的目标是实现一个“透明”的单例类，用户从这个类中创建对象的时候，可以像使用其他任何普通类一样。在下面的例子中，我们将使用 CreateDiv 单例类，它的作用是负责在页面中创建唯一的 div 节点，代码如下：

```javascript
var CreateDiv = (function() {
    var instance;
    var CreateDiv = function(html) {
        if(instance) {
            return instance;
        }
        this.html = html;
        this.init();
        return instance = this;
    }
    CreateDiv.prototype.init = function() {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };
    return CreateDiv;
})();

//创建对象
var a = new CreateDiv('sven1');
var b = new CreateDiv('sven2');
console.log(a === b); // true
```
缺点：在这段代码中，CreateDiv 的构造函数实际上负责了两件事情。第一是创建对象和执行初始化 init 方法，第二是保证只有一个对象。虽然我们目前还没有接触过“单一职责原则”的概念，但可以明确的是，这是一种不好的做法，至少这个构造函数看起来很奇怪。

## 4、用代理实现单例模式

现在我们通过引入代理类的方式，来解决上面提到的问题。

```javascript
var CreateDiv = function(html) {
    this.html = html;
    this.init();
}
CreateDiv.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div)
}

// 接下来引入代理类 ProxySingletonCreateDiv
var ProxySingletonCreateDiv = (function(){
    var instance;
    return function(html){
        if(!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();
 
 var a = new ProxySingletonCreateDiv('sven1');
 var b = new ProxySingletonCreateDiv('sven2');

 // 单例模式
 console.log(a === b);
```

## 5、JavaScript中单例模式

前面提到的几种单例模式的实现，更多的是接近传统面向对象语言中的实现，单例对象从“类”中创建而来。在以类为中心的语言中，这是很自然的做法。比如在 Java 中，如果需要某个对象，就必须先定义一个类，对象总是从类中创建而来的。
但 JavaScript 其实是一门无类（class-free）语言，也正因为如此，生搬单例模式的概念并无
意义。在 JavaScript 中创建对象的方法非常简单，既然我们只需要一个“唯一”的对象，为什
么要为它先创建一个“类”呢？这无异于穿棉衣洗澡，传统的单例模式实现在 JavaScript 中并
不适用。

单例模式的核心是确保只有一个实例，并提供全局访问。

全局变量不是单例模式，但在 JavaScript 开发中，我们经常会把全局变量当成单例来使用。但全局变量会造成全局污染。

以下几种方式可以相对降低全局变量带来的命名污染。

### 1.使用命名空间 

```javascript
var namespace1 = { 
    a: function(){ 
        alert (1); 
    }, 
    b: function(){ 
        alert (2); 
    } 
};

// 以动态地创建命名空间
var MyApp = {};
MyApp.namespace = function( name ){ 
    var parts = name.split( '.' ); 
    var current = MyApp; 
    for ( var i in parts ){ 
        if ( !current[ parts[ i ] ] ){ 
            current[ parts[ i ] ] = {}; 
        } 
        current = current[ parts[ i ] ];
    } 
};
MyApp.namespace( 'event' ); 
MyApp.namespace( 'dom.style' ); 
console.dir( MyApp ); 
// 上述代码等价于：
 var MyApp = { 
    event: {}, 
    dom: { 
        style: {} 
    }
 };
```
### 2. 使用闭包包装私有变量

```javascript
var user = (function() {
    var _name = 'sven',
    _age = 29;
    return {
        getUserInfo: function() {
            return _name + '-' + _age;
        }
    }
})
```

## 6、惰性单例

惰性单例指的是在需要的时候才创建对象实例。（单例就是创建好实例不用重复创建，只会创建一个实例）

```javascript
var createLoginLayer = (function() {
    var div;
    return function() {
        if(!div) {
            div = document.createElement('div');
            div.innerHTML = '我是登录页面';
            div.style.display = 'none';
            document.body.appendChild(div);
        }
        return div
    }
})();
document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
}
```

缺点： 
* 这段代码仍然是违反了单一职责原则的，创建对象和管理单例的逻辑都放在createLoginLayer对象内部
* 如果我们创建iframe还要把 div 改成iframe


## 7、通用单例模式

```javascript
// 保持单例的唯一性
var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}
// 创建的单例的方法
var createSingleframe = getSingle(function() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
})

// 惰性创建实例并跳转页面
document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createSingleIframe();
    loginLayer.src = 'http://shengchangwei.github.io'
}
```

在这个例子中，创建对象的职责和管理单例的职责分别放置在两个方法里，这两个方法可以独立变化而互不影响，当它们连接在一起的时候，就完成了创建唯一实例对象的功能

这种单例模式的用途远不止创建对象，比如我们通常渲染完页面中的一个列表之后，接下来要给这个列表绑定 click 事件，如果是通过 ajax 动态往列表里追加数据，在使用事件代理的前提下，click 事件实际上只需要在第一次渲染列表的时候被绑定一次，但是我们不想去判断当前是
否是第一次渲染列表，如果借助于 jQuery，我们通常选择给节点绑定 one 事件：

```javascript
var bindEvent = function(){ 
    $( 'div' ).one( 'click', function(){ 
    alert ( 'click' );  }); 
}; 
var render = function(){ 
    console.log( '开始渲染列表' ); 
    bindEvent(); 
}; 
render();
render(); 
render();
```
如果利用 getSingle 函数，也能达到一样的效果。代码如下：

```javascript
var bindEvent = getSingle(function(){ 
    document.getElementById( 'div1' ).onclick = function(){ 
    alert ( 'click' ); 
 } 
    return true; 
}); 
var render = function(){ 
    console.log( '开始渲染列表' ); 
    bindEvent(); 
}; 
render(); 
render(); 
render();
```

## 小结

在javascript中实现单例模式，不可避免的用到闭包，闭包在创建单例时的作用就是保存已经创建好的实例，不需要再次创建。