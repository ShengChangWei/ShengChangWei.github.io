---
layout: post
title:  "《JavaScript设计模式与开发实践》-- 命令模式"
date:   2019-08-27
excerpt: "命令模式" 
model: true
tag:
- 设计模式
comments: true
---

# 命令模式

## 1、定义（学习模式不是目的，一定要了解其思想）

命令模式: 是最简单和优雅的模式之一，指的是一个执行某些特定事情的指令。

应用场景：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么 ，此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

## 2、命令模式的例子——菜单程序

代码如下：（了解即可, 太啰嗦）

```html
<body>
    <button id="button1">点击按钮 1</button>
    <button id="button2">点击按钮 2</button> 
    <button id="button3">点击按钮 3</button>
</body>
```

```javascript
var button1 = document.getElementById( 'button1' ); 
var button2 = document.getElementById( 'button2' );
var button3 = document.getElementById( 'button3' );
var setCommand = function( button, command ){ 
    button.onclick = function(){ 
        command.execute(); 
    } 
};
var MenuBar = { 
    refresh: function(){ 
        console.log( '刷新菜单目录' ); 
    } 
}; 
var SubMenu = { 
    add: function(){ 
        console.log( '增加子菜单' ); 
    }, 
    del: function(){ 
        console.log( '删除子菜单' ); 
    } 
};
var RefreshMenuBarCommand = function( receiver ){ 
    this.receiver = receiver; 
}; 
RefreshMenuBarCommand.prototype.execute = function(){ 
    this.receiver.refresh(); 
}; 
var AddSubMenuCommand = function( receiver ){ 
    this.receiver = receiver; 
};
AddSubMenuCommand.prototype.execute = function(){ 
    this.receiver.add(); 
}; 
var DelSubMenuCommand = function( receiver ){ 
    this.receiver = receiver; 
}; 
DelSubMenuCommand.prototype.execute = function(){ 
    console.log( '删除子菜单' ); 
};
var addSubMenuCommand = new AddSubMenuCommand( SubMenu ); 
var delSubMenuCommand = new DelSubMenuCommand( SubMenu ); 
setCommand( button1, refreshMenuBarCommand ); 
setCommand( button2, addSubMenuCommand ); 
setCommand( button3, delSubMenuCommand );
```

## 3、JavaScript中的命令模式

上述代码是模拟传统面向对象语言的命令模式实现，用闭包实现的命令模式如下代码所示：

```javascript
var setCommand = function(button , func) { // 传入按钮，调用方法
    button.onclick = function() {
        func();
    }
};

// 命令模式的套路

var MenuBar = { // 一个对象有一个方法
    refresh: function() {
        console.log('刷新菜单页面');
    }
};

var RefreshMenuBarCommand = function(receiver) { // 返回一个方法
    return function() {
        receiver.refresh();
    }
};

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);

setCommand(button1, refreshMenuBarCommand)

```
当然，如果想更明确地表达当前正在使用命令模式，或者除了执行命令之外，将来有可能还要提供撤销命令等操作，那我们最好还要把执行函数改为调用execute方法：

```javascript
var RefreshMenuBarCommand = function(receiver) {
    return {
        execute: function() {
            receiver.refresh();
        }
    }
};

var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute();
    }
};

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand);
```

## 4、撤销命令

需求： 在`input`中输入数值，点击运动按钮让小球运动到`input`值的位置
代码如下：

```html
<div id="ball" style="position:absolute;background:#000;width:50px;height:50px"></div> 
输入小球移动后的位置：<input id="pos"/> 
<button id="moveBtn">开始移动</button> 
```
```javascript
var ball = document.getElementById( 'ball' ); 
var pos = document.getElementById( 'pos' ); 
var moveBtn = document.getElementById( 'moveBtn' ); 
moveBtn.onclick = function(){ 
    var animate = new Animate( ball );  // Animate 是一个动画js 传入值即可运动，了解作用就行
    animate.start( 'left', pos.value, 1000, 'strongEaseOut' ); 
}; 
```
现在希望有个撤回按钮，点击撤回小球回到上一次的位置

在给页面添加撤销按钮之前，先把目前的代码改为用命令模式实现

代码如下:

```javascript
var ball = document.getElementById('ball');
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');

var MoveCommand = function(receiver, pos) {
    this.receiver = receiver;
    this.pos = pos;
};

MoveCommand.prototype.execute = function() {
    this.receiver.start('left', this.pos, 1000, 'strongEAseOut');
};

var moveCommand;

moveBtn.onclick = function() {
    var animate = new Animate(ball);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute();
}
```

接下来增加撤销按钮：

```html
<div id="ball" style="position:absolute;background:#000;width:50px;height:50px"></div> 
输入小球移动后的位置：<input id="pos"/> 
<button id="moveBtn">开始移动</button> 
<button id="cancelBtn">cancel</cancel> <!--增加撤销按钮--> 
```
撤销操作的实现一般是给命令对象增加一个名为 unexecude 或者 undo 的方法，在该方法里执行 execute 的反向操作。在 command.execute 方法让小球开始真正运动之前，我们需要先记录小球的当前位置，在 unexecude 或者 undo 操作中，再让小球回到刚刚记录下的位置，代码如下：

```javascript
var ball = document.getElementById('ball');
var pos = document.getElementBy('pos');
var moveBtn = document.getElementById('moveBtn');
var canceBtn = document.getElementById('canceBtn');
// 面向对象开发
var MoveCommand = function(receiver, pos) { //receiver 将要传入animate方法， pos出入输入框的值
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
};

MoveCommand.prototype.execute = function() {
    this.receiver.start('left', this.pos, 100, 'strongEAseOut');
    this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]; // 记录小球开始移动前的位置
};

MoveCommand.prototype.undo = function() {
    this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut');
    // 回到小球移动前记录的位置
};

var moveCommand;

moveBtn.onclick = function() {
    var animate = new Animate(ball);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute() // 调用移动的方法
};

cancelBtn.onclick = function() {
    moveCommand.undo(); // 撤销命令
}

```

## 5、撤销和重做

我们把用户在键盘的输入都封装成命令， 执行过的命令将被存放到堆栈中。播放录像的时候只需要从头开始依次执行这些命令便可，代码如下：

```html
 <body> 
    <button id="replay">播放录像</button> 
 </body>
```

```javascript
var Ryu = {
    attack: function() {
        console.log('攻击');
    },
    defense: function() {
        console.log('防御')
    },
    jump: function() {
        console.log('跳跃')
    },
    crouch: function() {
        console.log('蹲下')
    }
};

var makeCommand = function(receiver, state) { // 创建命令
    return function() {
        receiver[state]();
    }
};


var commands = {
    '119': 'jump', // W
    '115': 'crouch', // S
    '97': 'defense', // A
    '100': 'attack' // D
};

var commandStack = []; // 保存命令的堆栈

document.onkeypress = function(ev) {
    var keyCode = ev.keyCode,
        command = makeCommand(Ryu, commands[keyCode]);
    
    if(command) {
        command(); // 执行命令
        commandStack.push(command); // 将刚刚执行过的命令保存进堆栈
    }
};

// 点击回放按钮

document.getElementById('replay').onclick = function() {
    var command;
    while(command = commandStack.shift()) { // 从堆栈里一次取出命令并执行
        command();
    }
}
```

## 6、宏命令

宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令。想象一下，家里有一个万能遥控器，每天回家的时候，只要按一个特别的按钮，它就会帮我们关上房间门，顺便打开电脑并登录 QQ。 

下面我们看看如何逐步创建一个宏命令。首先，我们依然要创建好各种 Command： 

```javascript
var closeDoorCommand = {
    execute: function() {
        console.log('关门')
    }
};

var openPcCommand = {
    execute: function() {
        console.log('开电脑');
    }
};

var openQQCommand = {
    execute: function() {
        console.log('登录QQ');
    }
};
```

接下来定义宏命令 MacroCommand， 它的结构也很简单。 macroCommand.add 方法表示把子命令添加进宏命令对象，当调用宏命令对象的 execute 方法时，会迭代这一组子命令对象，并且依次执行它们的 execute 方法：

```javascript
var MacroCommand = function() {
    return {
        commandsList: [],
        add: function(command) {
            this.commandsList.push(command);
        },
        execute: function() {
            for(var i = 0,command; command = this.commandsList[i++];) {
                command.execute();
            }
        }
    }
};

var macroCommand = MacroCommand();

macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
```

当然我们还可以为宏命令添加撤销功能，跟 macroCommand.execute 类似，当调用macroCommand.undo 方法时，宏命令里包含的所有子命令对象要依次执行各自的 undo 操作。

## 7、智能命令与傻瓜命令


再看一下上节创建的命令： 
```javascript
var closeDoorCommand = { 
    execute: function(){ 
        console.log( '关门' ); 
    } 
}; 
```
很奇怪，closeDoorCommand 中没有包含任何 receiver 的信息，它本身就包揽了执行请求的行为，这跟我们之前看到的命令对象都包含了一个 receiver 是矛盾的。  一般来说，命令模式都会在 command 对象中保存一个接收者来负责真正执行客户的请求，这种情况下命令对象是“傻瓜式”的，它只负责把客户的请求转交给接收者来执行，这种模式的好处是请求发起者和请求接收者之间尽可能地得到了解耦。

但是我们也可以定义一些更“聪明”的命令对象， “聪明”的命令对象可以直接实现请求，这样一来就不再需要接收者的存在，这种“聪明”的命令对象也叫作智能命令。没有接收者的智能命令，退化到和策略模式非常相近，从代码结构上已经无法分辨它们，能分辨的只有它们意图的不同。策略模式指向的问题域更小，所有策略对象的目标总是一致的，它们只是达到这个目标的不同手段， 它们的内部实现是针对 “算法” 而言的。 而智能命令模式指向的问题域更广， command对象解决的目标更具发散性。命令模式还可以完成撤销、排队等功能。

## 8、小结

本章我们学习了命令模式。跟许多其他语言不同，JavaScript 可以用高阶函数非常方便地实现命令模式。命令模式在 JavaScript语言中是一种隐形的模式。
