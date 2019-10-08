---
layout: post
title:  "js实现的几种继承方式"
date:   2018-03-23
excerpt: "js几种继承方式,学习中的总结。他山之石，可以攻玉,本人一直以谦虚的态度学他人之所长,补自己之所短"
javascript: true
tag:
- javascript 
- object
- function
- prototype
- 继承
comments: true
---

## 1、借用构造函数继承

- 优点：可以继承实例属性
- 缺点：原型中的方法无法继承
-  关键点：通过call的方式，修改this的指向

```javascript
// 设置需要被继承的构造函数Animal
function Animal(name, age) {
  this.name = name;
  this.age = age;
}
// 原型方法
Animal.prototype.eat = function() {
  console.log('吃各种好吃的')
}

// 再设置一个猫咪构造函数
 function Cat(name, age) {
   Animal.call(this, name, age)
 }
 var cat = new Cat('jack', 18)
 console.log (cata);// 属性继承，但原型中的方法没有继承
```

## 2、原型继承

优点：

- 可以继承原型中的方法。
缺点：

- 实例属性虽然有，但是无法传参(跟没有一样)
- 要想为子类新增属性和方法，必须要在new Animal()这样的语句之后执行 否则会被覆盖
- 无法实现多继承
- 需要重新设置被覆盖的constructor属性 让constructor重新指向Cat

关键点：

- 原型链：查找规则，优先查找自身，如果没有则查找__proto__中是否存在； 原型链是用来描述实例对象与原型对象之间关系的一种方式。

```javascript
  function Animal(name, age) {
    this.name = name;
    this.age = age;
  }
  Animal.prototype.eat = function() {
    console.log('吃各种好吃的')
  }

  function Cat(color) {
    this.color = color;
  }

  // 继承的核心代码 必须写在前面 ，否则会覆盖子类的方法
  Cat.prototype = new Animal('jack', 18); 
  ////设置被覆盖的constructor属性 让constructor重新指向Cat
  Cat.prototype.constructor = Cat;
  Cat.prototype.shangshu = function() {
    console.log('猫咪会爬树');
  }
  var cat = new Cat();
  console.log(cat);
  console.log(cat.name)//jack
  console.log(cat.age)//18
```

## 3、组合继承

- 使用前面两种继承方式时发现各有优缺点，所以将两种方式结合即可。
- 这种结合使用的方式称为组合继承,组合继承是最常用的一种继承方式。

总结一下原型链：

- 原型链：查找规则，优先查找自身，如果没有则查找_ _proto_ _中是否存在； 原型链是用来描述实例对象与原型对象之间关系的一种方式
- Animal构造函数在设置时没用继承自其它的构造函数
- Animal的原型对象也是一个对象
- 对象都是通过Object这个构造函数创建的
- Animal.prototype这个对象_ _proto_ _就应该指向Object.prototype
- 通过观察我们发现确实含有一个属性constructor，并且值为Object构造函数
- Object.prototype中没有_ _proto_ _属性了，说明这个对象是原型对象的终点。若果使用一个对象的属性时，在整个原型对象中均没找到，值即为undefined Object。prototype._ _proto_ _打印为null
- 扩展：在作用域中，都没有找到会报错

```javascript
  function Animal(name, age) {
    this.name = name;
    this.age = age;
  }
  Animal.prototype.eat = function(){
    console.log("吃各种吃的");
  };

  function Cat(name,age,color){
    //使用借用构造函数的方式继承：
    Animal.call(this,name,age);
    this.color = color;
  }

  //原型继承的核心代码：
  //使用组合继承方式后，在构造函数体中就设置了实例属性，此处不需要传参
  Cat.prototype = new Animal();
  //设置被覆盖的constructor属性
  Cat.prototype.constructor = Cat;
  Cat.prototype.shangShu = function(){
      console.log("猫咪可以爬树");
  };

  var Cat = new Cat("rose",20,"red");
  console.log(Cat);
```
## 4、对组合继承的优化方式

个人认为:

- 虽然可以省去不需要继承的实例属性
- 这种方式的确会比组合继承的方式性能更好，但是略麻烦(了解即可)

```javascript
  function Animal(name,age){
    this.name = name;
    this.age = age;
  }
  Animal.prototype.eat = function(){
    console.log("吃各种吃的");
  };


  function Cat(name,age,color){
    //使用借用构造函数的方式继承：
    Animal.call(this,name,age);
    this.color = color;
  }

  //原型继承方式中希望获取到Animal的原型方法
  //Cat.prototype = new Animal();

  //可以省去不需要继承的实例属性
  //这种方式的确会比组合继承的方式性能更好，但是略麻烦(了解即可)
  function Fun (){}
  Fun.prototype = Animal.prototype;
  Cat.prototype = new Fun();

  Cat.prototype.constructor = Cat;
  Cat.prototype.shangShu = function(){
    console.log("猫咪可以爬树");
  };
  
  var cat = new Cat("rose",20,"red");
  console.log(cat);
```

## 5、拷贝继承

- 优点：使用继承的原型中的方法时，查找的次数会降低
- 缺点：效率较低，内存占用高（因为要拷贝父类的属性）

```javascript
  function Animal(name,age){
    this.name = name;
    this.age = age;
  }
  Animal.prototype.eat = function(){
    console.log("吃各种吃的");
  };

  function Cat(name,age){
    Animal.call(this,name,age)
  }

  //核心代码
  for(var k in Animal.prototype){
    Cat.prototype[k] = Animal.prototype[k];//添加属性
  }
  Cat.prototype.constructor = Cat;
  Cat.prototype.shangShu = function(){
    console.log("猫咪可以爬树");
  };
  var cat = new Cat("rose",20,"red");
  console.log(cat);
```
## 6、补充一下:对象之间的继承

```javascript
  var obj={
    name:'jack',
    age:12,
    gender:'男',
    sayHai:function(){
      console.log("我是人")
    }
   }
   // 问题：obj2想要继承obj的属性
   // (1)拷贝继承：
   var obj2={};
   for(var k in obj){
     obj2[k]=obj[k];
   }
   //(2)原型继承：
   function Fun(){};
   Fun.prototype=obj;
   var obj2=new Fun();
   console.log(obj2);
```



