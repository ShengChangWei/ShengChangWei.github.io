---
layout: post
title:  "《JavaScript设计模式与开发实践》-- 策略模式"
date:   2019-08-02
excerpt: "策略模式"
model: true
tag:
- 设计模式
comments: true
---


# 策略模式

## 1、定义

策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

## 2、使用策略模式计算奖金

很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为 S 的人年终奖有 4 倍工资，绩效为 A 的人年终奖有 3 倍工资，而绩效为 B 的人年终奖是 2 倍工资。假设财务部要求我们提供一段代码，来方便他们计算员工的年终奖。

### 1. 最初的实现代码 --（缺点太多）

编写calculateBonus函数接收两个参数： 员工的工资数额和他的绩效考核等级。
代码如下：

```javascript
 if ( performanceLevel === 'S' ){ 
 return salary * 4; 
 } 
 if ( performanceLevel === 'A' ){ 
 return salary * 3; 
 } 
 if ( performanceLevel === 'B' ){ 
 return salary * 2; 
 } 
}; 
calculateBonus( 'B', 20000 ); // 输出：40000 
calculateBonus( 'S', 6000 ); // 输出：24000
```

缺点：

* calculateBonus 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的逻辑
分支。
* calculateBonus 函数缺乏弹性，如果增加了一种新的绩效等级 C，或者想把绩效 S 的奖金系数改为 5，那我们必须深入 calculateBonus 函数的内部实现，这是违反开放封闭原则的。
* 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择只有复制和粘贴。

### 2. 使用组合函数重构代码 ---（改善有限）

代码如下：

```javascript
var performanceS = function( salary ){ 
    return salary * 4; 
}; 
2 
var performanceA = function( salary ){ 
    return salary * 3; 
}; 
3 
var performanceB = function( salary ){ 
    return salary * 2; 
}; 
var calculateBonus = function( performanceLevel, salary ){
    if ( performanceLevel === 'S' ){ 
        return performanceS( salary ); 
    } 

    if ( performanceLevel === 'A' ){ 
        return performanceA( salary ); 
    }
    if ( performanceLevel === 'B' ){ 
        return performanceB( salary ); 
    }
}; 
calculateBonus( 'A' , 10000 ); // 输出：30000 8
```
缺点： 这种改善非常有限，我们依然没有解决最重要的问题：calculateBonus 函数有可能越来越庞大，而且在系统变化的时候缺乏弹性。

### 3. 使用策略模式重构代码（模仿传统面向对象语言中的实现）（作为了解）

```javascript
// 绩效S
var performanceS = function(){};
performanceS.prototype.calculate = function(salary) {
    return salary * 4;
}
// 绩效A
var performanceA = function(){};
performanceA.prototype.calculate = function(salary) {
    return salary * 3;
}
// 绩效B
var performanceA = function(){};
performanceA.prototype.calculate = function(salary) {
    return salary * 2;
}

// 定义奖金类Bonus

var Bonus = function() {
    this.salary = null; // 原始工资
    this.strategy = null; // 绩效等级对应的策略对象
}
Bonus.prototype.setSalary = function(salary) {
    this.salary = salary; // 设置员工的原始工资
}
Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy; // 设置员工绩效等级对应的策略对象
}
Bonus.prototype.getBonus = function() {
    return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
}

// 使用
var bonus = new Bonus(); bonus.setSalary( 10000 ); 
bonus.setStrategy( new performanceS() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：40000 
bonus.setStrategy( new performanceA() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：30000
```
这段代码是基于传统面向对象语言模仿，自我感觉太过啰嗦，一些比较少的判断太过啰嗦


## 3、JavaScript 版本的策略模式 （平时自己写代码用的比较多的思想）

上一节我们让 strategy 对象从各个策略类中创建而来，这是模拟一些传统面向对象语言的实现。实际上在 JavaScript 语言中，函数也是对象，所以更简单和直接的做法是把 strategy直接定义为函数：

```javascript
var strategies = {
    'S':function(salary) {
        return salary * 4;
    },
    'A':function(salary) {
        return salary * 3;
    },
    'B':function(salary) {
        return salary * 2;
    }
}
var calculateBonus = function( level, salary ){ 
    return strategies[ level ]( salary ); 
};
console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000 
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000
```

在自己平时项目开发中，遇到许多if-else判断时，首先考虑到将这些不变的条件独立封装成一个对象，然后根据判断条件从对象中获取对应的值，在这里多说几句，其实个人感觉我们在实际开发中或多或少的都用到一些设计模式，只是自己没有将一些思想提取出来，没有归类总结。而学习设计模式正是将我们实际开发中自己用到的一些思想归类，将那种模糊想要抓住的思想用一个名称去标识，下次遇到同样的业务问题可以很快的定位到自己要使用的模式，这是一种提升，废话少说，继续下文。


## 4、策略模式 -- 表单验证

规则：
* 用户名不能为空
* 密码长度不能少于6位
* 手机密码必须符合格式

### 4.1 第一版本（最基础的）


> html

 ```html
<form action="http:// xxx.com/register" id="registerForm" method="post">
    请输入用户名：<input type="text" name="userName"/ >
    请输入密码： <input type="text" name="password"/ >
    请输入手机号码：<input type="text" name="phoneNumber"/ > 
    <button>提交</button>
</form>
 ```

 > js

 ```javascript
var registerForm = document.getElementById( 'registerForm' ); 
 registerForm.onsubmit = function(){ 
    if ( registerForm.userName.value === '' ){ 
        alert ( '用户名不能为空')
        return false; 
    } 
    if ( registerForm.password.value.length < 6 ){ 
        alert ( '密码长度不能少于 6 位' ); 
        return false; 
    } 
    if ( !/(^1[3|5|8][0-9]{9}$)/.test( registerForm.phoneNumber.value ) ){ 
          alert ( '手机号码格式不正确' ); 
        return false; 
      
    } 
 }
 ```

 缺点:

* registerForm.onsubmit 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的校验规则。
* registerForm.onsubmit 函数缺乏弹性，如果增加了一种新的校验规则，或者想把密码的长度校验从 6 改成 8，我们都必须深入 registerForm.onsubmit 函数的内部实现，这是违反开放—封闭原则的。
* 算法的复用性差，如果在程序中增加了另外一个表单，这个表单也需要进行一些类似的校验，那我们很可能将这些校验逻辑复制得漫天遍野。

### 4.2 策略模式重构表单校验

代码如下：

```javascript
var strategies = {
    isNonEmpty: function(value, errorMsg) { // 不能为空
        if(value === '') {
            return errorMsg;
        }
    },
    minLength: function(value, length, errorMsg) { // 限制长度
        if(value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function(value, errorMsg) {
        if( !/(^1[3|5|8][0-9]{9}$)/.test( value )) {
            return errorMsg;l
        }
    }
}

```

接下来我们准备实现 Validator 类。Validator 类在这里作为 Context，负责接收用户的请求并委托给 strategy 对象。在给出 Validator 类的代码之前，有必要提前了解用户是如何向 Validator类发送请求的，这有助于我们知道如何去编写 Validator 类的代码。代码如下：

```javascript
var validataFunc = function() {
    var validator = new Validator(); // 创建一个对象 Validtor类在下面
    /*****************添加一些校验规则*******************/
    validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
    validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位 ');
    validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');
    var errorMsg = validator.start(); // 获得校验结果
    return errorMsg; // 返回校验结果
}
 var registerForm = document.getElementById( 'registerForm' );
 registerForm.onsubmit = function() {
     var errorMsg = validataFunc();
     if(errorMsg) {
         alert(errorMsg);
         return false;
     }
 }
```
最后是Validator类的实现

```javascript
var Validator = function() {
    this.cache = [];
};
Validator.prototype.add = function(dom, rule, errorMsg) {
    var ary = rule.split(':');
    this.cache.push(function() {
        var strategy = ary.shift();
        ary.unshift(dom.value);
        ary.push(errorMsg);
        return strategies[strategy].apply(dom, ary);
    })
};
Validator.prototype.start = function() {
    for(var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ];) {
        var msg = validatorFunc();
        if ( msg ){ // 如果有确切的返回值，说明校验没有通过
            return msg; 
        }
    }
}
```

### 4.3 给某个文本输入框添加多种校验规则

期待校验方式：

```javascript
validator.add( registerForm.userName, 
    [{ 
        errorMsg: '用户名不能为空' 
        strategy: 'isNonEmpty', 
    }, { 
        strategy: 'minLength:6', 
        errorMsg: '用户名长度不能小于 10 位' 
    }] 
 );
```

下面提供的代码可用于一个文本输入框对应多种校验规则：

```html
<form action="http:// xxx.com/register" id="registerForm" method="post"> 
    请输入用户名：<input type="text" name="userName"/ > 
    请输入密码：<input type="text" name="password"/ > 
    请输入手机号码：<input type="text" name="phoneNumber"/ > 
    <button>提交</button> 
</form>
```

```javascript
/***********************策略对象**************************/
var strategies = { 
    isNonEmpty: function( value, errorMsg ){ 
        if ( value === '' ){ 
            return errorMsg; 
        } 
    }, 
    minLength: function( value, length, errorMsg ){ 
        if ( value.length < length ){ 
            return errorMsg; 
        } 
    }, 
    isMobile: function( value, errorMsg ){ 
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){ 
            return errorMsg; 
        } 
    } 
 };
 /***********************Validator 类**************************/
 var Validator = function(){ 
    this.cache = []; 
 };
 Validator.prototype.add = function( dom, rules ){ 
    var self = this; 
    for ( var i = 0, rule; rule = rules[ i++ ]; ){ 
        (function( rule ){ 
            var strategyAry = rule.strategy.split( ':' ); 
            var errorMsg = rule.errorMsg; 
            self.cache.push(function(){ 
                var strategy = strategyAry.shift();
                strategyAry.unshift( dom.value ); 
                strategyAry.push( errorMsg );
                return strategies[ strategy ].apply( dom, strategyAry ); 
        }); 
        })( rule ) 
    } 
 };
 Validator.prototype.start = function(){  
    for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){ 
        var errorMsg = validatorFunc(); 
        if ( errorMsg ){ 
            return errorMsg; 
        } 
    } 
 };
 /***********************客户调用代码**************************/ 
 var registerForm = document.getElementById( 'registerForm' ); 
 var validataFunc = function(){ 
    var validator = new Validator(); 
        validator.add( registerForm.userName, [{ 
        strategy: 'isNonEmpty', 
        errorMsg: '用户名不能为空' 
        }, { 
        strategy: 'minLength:6', 
        errorMsg: '用户名长度不能小于 10 位' 
        }]); 
        validator.add( registerForm.password, [{ 
        strategy: 'minLength:6', 
        errorMsg: '密码长度不能小于 6 位' 
        }]); 
        validator.add( registerForm.phoneNumber, [{ 
        strategy: 'isMobile', 
        errorMsg: '手机号码格式不正确' 
        }]); 
        var errorMsg = validator.start(); 
        return errorMsg; 
 } 
 registerForm.onsubmit = function(){ 
    var errorMsg = validataFunc(); 
    if ( errorMsg ){ 
        alert ( errorMsg ); 
        return false; 
    }
 };
```

## 5、策略模式的优缺点

优点：

* 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
* 策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
* 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
* 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

缺点：（了解）

* 使用策略模式会在程序中增加许多策略类或者策略对象，但实际上这比把它们负责的逻辑堆砌在 Context 中要好。
* 要使用策略模式，必须了解所有的 strategy，必须了解各个 strategy 之间的不同点，这样才能选择一个合适的 strategy。违反最少知识原则的。

## 6、小结

在平时项目开发中，遇到许多if-else判断时，首先考虑策略模式的思想，将一些不变的东西单独封装成对象或函数。