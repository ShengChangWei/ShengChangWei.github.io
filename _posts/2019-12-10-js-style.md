---
layout: post
title:  "是你需要的前端编码风格吗？"
date:   2019-12-10
excerpt: "编程规范、编程风格"
javascript: true
tag: javascript
comments: true
---

<!-- TOC -->

- [一、HTML](#一html)
    - [1、基本原则](#1基本原则)
    - [2、class 命名规则](#2class-命名规则)
- [二、CSS](#二css)
    - [1、基本规则](#1基本规则)
    - [2、注释](#2注释)
    - [3、边框](#3边框)
    - [4、Sass](#4sass)
- [三、JavaScript](#三javascript)
    - [1、基本格式化](#1基本格式化)
        - [1.1 缩进层级](#11-缩进层级)
        - [1.2 语句结尾](#12-语句结尾)
        - [1.3 行的长度](#13-行的长度)
        - [1.4 换行](#14-换行)
        - [1.5 命名](#15-命名)
            - [1.5.1 变量和函数](#151-变量和函数)
            - [1.5.2 常量](#152-常量)
            - [1.5.3 函数](#153-函数)
            - [1.5.3 构造函数](#153-构造函数)
    - [2、注释](#2注释-1)
        - [2.1 单行注释](#21-单行注释)
        - [2.2 多行注释](#22-多行注释)
    - [3、语句和表达式](#3语句和表达式)
        - [3.1 所有的块语句都应当使用花括号，包括](#31-所有的块语句都应当使用花括号包括)
        - [3.2 语句和表达式 前后加空格](#32-语句和表达式-前后加空格)
        - [3.2 switch 语句](#32-switch-语句)
        - [3.3 with 语句](#33-with-语句)
        - [3.4 for 循环](#34-for-循环)
        - [3.5 for-in 循环](#35-for-in-循环)
    - [4、汇总](#4汇总)
        - [4.1 对象](#41-对象)
        - [4.2 数组](#42-数组)
        - [4.3 解构](#43-解构)
        - [4.4 字符串](#44-字符串)
        - [4.5 使用模板字符串代替字符串连接](#45-使用模板字符串代替字符串连接)
        - [4.5 函数](#45-函数)
        - [4.6 箭头函数](#46-箭头函数)
        - [4.7 构造器](#47-构造器)
        - [4.8 模块](#48-模块)
        - [4.9 比较运算符和等号](#49-比较运算符和等号)
        - [4.10 空格](#410-空格)
        - [4.11 分号](#411-分号)
        - [4.12 类型转换](#412-类型转换)
- [四、针对vue的代码风格](#四针对vue的代码风格)
    - [1、项目结构（vue-cli 3.0）](#1项目结构vue-cli-30)
    - [2、api 文件夹](#2api-文件夹)
    - [3、assets 文件夹](#3assets-文件夹)
    - [4、router 路由](#4router-路由)
    - [5、vue 文件](#5vue-文件)
- [其他风格指南](#其他风格指南)
- [参考文献：](#参考文献)

<!-- /TOC -->

> 程序是写给人读的，只是偶尔让计算机执行一下   -- Donald Knuth

以下代码风格仅供参考，没有明确规定那种书写方式好，那种书写方式一定就不好，代码风格的统一，目的就是提高代码的可读性。


# 一、HTML

## 1、基本原则

* `html`(结构)、`css`(样式)、`js`(样式)分离
* 标签具有语义化
* 2个空格字符为一个缩进层级，设置敲入 `Tab` 键时插入2个空格
* 标签名使用一律小写字母，`vue`组件名必须使用小写
* 标签需闭合，自闭合（`self-closing`）标签，无需闭合 ( 例如： `img` `input` `br` `hr` 等 );
* 不要使用`id`选择器，`class`命名多个单词采用中划线`-`连接
* 属性按照特定的顺序出现保证易读性，`id`、`class`、`name`、`src`、`for`、`type`、`href`、`title`和`alt`
* 禁止行内元素嵌套块级元素
* `<!--放注释内容-->`独占一行

## 2、class 命名规则

* 不能出现中文
* 以字母开头，不能使用其他格式开头
* 以名见义 命名需要有规范，有含义、可以快速的理解这个标签的具体意义

很早以前收藏的表格，具体出处自己记不清了，如有侵权，可与本人联系，谢谢

|          命名          |           说明           |
|:----------------------:|:------------------------:|
|        .wrapper        | 页面外围控制整体布局宽度 |
|  .container或.content  |     容器,用于最外层      |
|        .layout         |           布局           |
|     .head, .header     |         页头部分         |
|     .foot, .footer     |         页脚部分         |
|          .nav          |          主导航          |
|        .subnav         |         二级导航         |
|         .menu          |           菜单           |
|        .submenu        |          子菜单          |
|        .sideBar        |           侧栏           |
| .sidebar_a, .sidebar_b |      左边栏或右边栏      |
|         .main          |         页面主体         |
|          .tag          |           标签           |
|     .msg .message      |         提示信息         |
|         .tips          |          小技巧          |
|         .vote          |           投票           |
|      .friendlink       |         友情连接         |
|         .title         |           标题           |
|        .summary        |           摘要           |
|       .loginbar        |          登录条          |
|      .searchInput      |        搜索输入框        |
|          .hot          |         热门热点         |
|        .search         |           搜索           |
|       .searchBar       |          搜索条          |
|    .search_results     |         搜索结果         |
|       .copyright       |         版权信息         |
|       .branding        |           商标           |
|         .logo          |       网站LOGO标志       |
|       .siteinfo        |         网站信息         |
|     .siteinfoLegal     |         法律声明         |
|    .siteinfoCredits    |           信誉           |
|        .joinus         |         加入我们         |
|        .partner        |         合作伙伴         |
|        .service        |           服务           |
|       .regsiter        |           注册           |
|       arr/arrow        |           箭头           |
|         .guild         |           指南           |
|        .sitemap        |         网站地图         |
|         .list          |           列表           |
|       .homepage        |           首页           |
|        .subpage        |      二级页面子页面      |
|    .tool, .toolbar     |          工具条          |
|         .drop          |           下拉           |
|       .dorpmenu        |         下拉菜单         |
|        .status         |           状态           |
|        .scroll         |           滚动           |
|          .tab          |          标签页          |
|  .left .right .center  |       居左、中、右       |
|         .news          |           新闻           |
|       .download        |           下载           |
|        .banner         |    广告条(顶部广告条)    |



# 二、CSS

## 1、基本规则

* 使用 2 个空格作为缩进
* 不要使用`id`选择器，`class`命名多个单词采用中划线`-`连接
* 在左大括号`{`前加上一个空格, 右大括号`}`独占一行
* 在属性的冒号`: `后面加上一个空格，前面不加空格
* 

## 2、注释

* 建议使用行注释 (在` Sass`中是`//`) 代替块注释。
* 建议注释独占一行。避免行末注释。

## 3、边框

在定义无边框样式时，使用`0 `代替`none`

```css
.nav {
  border: none;  
}

// good
.nav {
  border: 0;  
}
```

## 4、Sass

* 使用`.scss`的语法，不使用`.sass`原本的语法。
* 变量名使用驼峰命名`$borderLine`



# 三、JavaScript

## 1、基本格式化

### 1.1 缩进层级

2个空格字符为一个缩进层级，设置敲入 `Tab` 键时插入2个空格

### 1.2 语句结尾

语句结尾使用分号

### 1.3 行的长度

单行代码长度不超过80个字符

vscode配置如下：

``` json
{
  "editor.wordWrap": "wordWrapColumn",
  "editor.wordWrapColumn": 80
}
```

### 1.4 换行

当一行长度达到了单行最大字符数限制时，就需要手动将一行拆成两行。通常我们会在运算符后换行，下一行会增加两个层级的缩进。

### 1.5 命名

命名长度应尽可能短，并抓住重点，尽量在变量名中体现出值的数据类型。比如，命名 `count` 、 `length` 和 `size` 表明数据类型是数字，而命名 `name` 、 `title` 和 `message` 表明数据类型是字符串。但用单个字符命名的变量诸如i、j、和k通常在循环中使用。使用这些能够体现出数据类型的命名，可以让你的代码容易被别人和自己读懂。

不要使用下划线 `_` 结尾或开头来命名属性和方法。

#### 1.5.1 变量和函数

变量：遵守驼峰大小写命名法，并且命名前缀应当是名词。

``` javascript
let count = 0;
let myName = 'sheng';
let visible = true;
```

函数：遵守驼峰大小写命名法，并且命名前缀应当是动词。

``` javascript
function getName() {};

function setName() {};
```

使用动词常见约定

| 动词 |         含义         |
|:----:|:--------------------:|
| can  |  函数返回一个布尔值  |
| has  |  函数返回一个布尔值  |
|  is  |  函数返回一个布尔值  |
| get  | 函数返回一个非布尔值 |
| set  |  函数用来保存一个值  |

#### 1.5.2 常量

常量: 必须使用 `const` 定义常量

``` javascript
const count = 10;
const url = 'http://baidu.com';
```

#### 1.5.3 函数

* 在控制语句（ `if` 、 `while` 等）的小括号前放一个空格。在函数调用及声明中，不在函数的参数列表前加空格。

``` javascript
// bad
function getName () {
    return userName;
}

// good
function getName() {
    return userName;
}
```

* 别保存 this 的引用。使用箭头函数或 Function#bind。

``` javascript
// bad
function getName() {
    const self = this;
    return function() {
        console.log(self);
    }
}
// bad
function getName() {
    const that = this;
    return function() {
        console.log(that);
    };
}
// good
function getName() {
    return () => {
        console.log(this);
    };
}
```

#### 1.5.3 构造函数

在 `JavaScript` 中，构造函数只不过是前面冠以new运算符的函数，用来创建对象

构造函数：遵照大驼峰命名法（Pascal Case）

``` javascript
function Person(name) {
    this.name = name
}
```

## 2、注释

### 2.1 单行注释

* 缩进层级与下一行代码保持一致
* 双斜杠后敲入一个空格， 保持注释文本有一定的偏移
* 在代码行的尾部注释，代码结束到注释之间有一个缩进，超过单行最大字符限制，应移动当前代码行的上方。

``` javascript
// bad
//这是一个Person构造函数
function Person(name) {
    this.name = name
}

// good
// 这是一个Person构造函数
function Person(name) {
    this.name = name
}

// bad
const MAX_COUNT = 10; //这是一个常量

// good
const MAX_COUNT = 10; // 这是一个常量
```

### 2.2 多行注释

``` javascript
// bad 注释之前无空格
if (condition) {
    /**
     * 如果代码执行到这里
     * 说明判断条件成立，可以执行下面程序
     */
    console.log('Hello world!');
}

// bad 星号后无空格
if (condition) {

    /**
     *如果代码执行到这里
     *说明判断条件成立，可以执行下面程序
     */
    console.log('Hello world!');
}

// bad 错误的缩进
if (condition) {

    /**
     * 如果代码执行到这里
     * 说明判断条件成立，可以执行下面程序
     */
    console.log('Hello world!');
}

// good
if (condition) {

    /**
     * 如果代码执行到这里
     * 说明判断条件成立，可以执行下面程序
     */
    console.log('Hello world!');
}
```

## 3、语句和表达式

### 3.1 所有的块语句都应当使用花括号，包括

* `if` 
* `for` 
* `while` 
* `do...while...` 
* `try...catch...finally` 

``` javascript
// bad
if (condition) console.log('Hello world!');

// good
if (condition) {
    console.log('Hello world!');
}
```

### 3.2 语句和表达式 前后加空格

``` javascript
// bad 前后无空格
if(condition){
    doSomething();
}else{
    doElseSomething();
}

// good
if (condition) {
    doSomething();
} else {
    doElseSomething();
}
```

### 3.2 switch 语句

``` javascript
// bad
switch (condition) {
case 0:
    console.log(0);
    break;
case 1:
    console.log(1);
    break;
default:
    console.log('default');
}

// good
switch (condition) {
    case 0:
        console.log(0);
        break;
    case 1:
        console.log(1);
        break;
    default:
        console.log('default');
}
```

### 3.3 with 语句

禁止使用with语句

### 3.4 for 循环

尽可能避免使用 `continue`

``` javascript
// bad
for (let i = 0; i < array.length; i++) {
    if (i === 2) {
        continue; // 跳过本次迭代
    };
    doSomething();
}

// good
for (let i = 0; i < array.length; i++) {
    if (i !== 2) {
        doSomething();
    };
}
```

### 3.5 for-in 循环

* 必须使用 `hasOwnProperty()` 方法来为 `for-in` 循环过滤出实例属性，除非想查找原型链
* 禁止使用 `for-in` 遍历数组

``` javascript
// bad
for (let k in obj) {
    console.log(obj[k]);
}

// good
for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
        console.log(obj[k]);
    }
}
```

## 4、汇总

### 4.1 对象

* 使用字面量创建对象

``` javascript
// bad
const obj = new Object();

// good
const obj = {};
```

* 创建有动态属性名对象时，使用可被计算的属性名称

``` javascript
function getKey(k) {
    return `a key name ${k}` ;
};

// bad
const obj = {
    id: 1,
    name: 'sheng'
};
obj[getKey('hidden')] = true;

// good
const obj = {
    id: 1,
    name: 'sheng',
    [getKey('hidden')] = true
}
```

* 使用对象方法的简写

``` javascript
// bad
const obj = {
    name: 'sheng',
    setName: function(name) {
        return obj.name + name;
    }
}

// good
const obj = {
    name: 'sheng',
    setName(name) {
        return obj.name + name;
    }
}
```

### 4.2 数组

* 使用字面量创建数组

``` javascript
// bad
const arr = new Array();

// good
const arr = [];
```

* 使用扩展运算符 `...` 复制数组

``` javascript
// bad
let arr = [1, 2, 3];
let newArr = [];
for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i];
};

// good
const newArry = [...arr];
```

### 4.3 解构

* 使用解构存取和使用多属性对象

``` javascript
// bad
function getUserInfo(user) {
    const name = user.name;
    const age = user.age;
}

// good
function getUserInfo(user) {
    const {
        name,
        name
    } = user;
}
```

* 对数组使用解构赋值

``` javascript
const arr = [1, 2, 3, 4];

// bad
const num0 = arr[0];
const num1 = arr[1];

// good
const [num0, num1] = arr;
```

### 4.4 字符串

* 字符串使用单引号

``` javascript
// bad
const name = "sheng";

// good
const name = 'sheng';
```

### 4.5 使用模板字符串代替字符串连接

``` javascript
// bad
window.open(configService.domain + '/exportFile');

// good
window.open( `${configService.domain}/exportFile` );
```

### 4.5 函数

* 使用函数声明代替函数表达式

``` javascript
// bad
const getName = function() {

};

// good
function getName() {

}
```

* 立即调用的函数

``` javascript
(() => {
    console.log('Hello world!');
})();
```

* 不要使用arguments。可以使用rest语法 `...` 替代

``` javascript
// bad
function getName () {
    const args = Array.prototype.slice.call(arguments);
    return args.join('')
}

// good
function getName(...args) {
    return args.join('');
}
```

### 4.6 箭头函数

``` javascript
let arr = [1, 2, 3];

// bad
arr.map(function(x) {
    return x + 1;
})

// good
arr.map(x => {
    return x + 1;
})

// good
arr.map(x => x + 1);
```

### 4.7 构造器

* 使用 `class` ，避免使用 `prototype` 

``` javascript
// bad
function User(user) {
    this.userName = user.name
}
User.prototype.getName = function() {
    return this.userName;
}

// good
class User {
    constructor(user) {
        this.userNmae = user.name
    }
    getName() {
        return this.userName;
    }
}
```

### 4.8 模块

* 使用（ `import` / `export` ）而不是其他模块系统, 除非特殊情况

``` javascript
// bad
const data = require('./data.js');
module.exports = data;

// good
import data from './data.js';
export default data;
```

### 4.9 比较运算符和等号

* 优先使用 `===` 和 `!==` 而不是 `==` 和 `!=` ; 
* 条件表达式例如 `if` 语句通过抽象方法 `ToBoolean` 强制计算它们的表达式并且总是遵守下面的规则：
  + 对象被计算为 `true` 
  + `undefined` 被计算为 `false` 
  + `null` 被计算为 `false` 
  + `boolean` 被计算为 `boolean` 
  + 数字如果为+0、-0、或 `NaN` 被计算为 `false` , 否则为 `true` 
  + 字符串如果是空字符串 `''` 被计算为 `false` , 否则为 `true` 

``` javascript
// bad
if (name !== '') {

}

// good
if (name) {

}

// bad
if (arr.length > 0) {

}

// good
if (arr.length) {

}
```

### 4.10 空格

* 使用空格把运算符隔开

``` javascript
// bad 
const y=x+1

// good
const y = x + 1;
```

### 4.11 分号

* 使用分号

``` javascript
// bad
function getName() {}

// good
function getName() {};
```

### 4.12 类型转换

``` javascript
// bad
const str = 0 + '';

// good
const str = String(0);

// bad
const num = +'4';

// good
const num = Number('4');

// bad
const b = new Boolean(0);

// good
const b = Boolean(0);

// good

const b = !!0;
```

# 四、针对vue的代码风格

仅适用于个人团队，当然你也可以提出建议，一起交流学习。

## 1、项目结构（vue-cli 3.0）

以下示例项目结构适用于现阶段的业务开发，后期根据业务场景可增删,详情个人[github](https://github.com/ShengChangWei/vue-start)

src 文件夹
``` shell
|-- api                          (请求接口的文件夹)   
    |-- rain-search
    |   |-- rian-search.api.js       (对应页面的后端请求)
    |-- water-info
    |   |-- use-water-manage.api.js
    |   |-- use-water-search.api.js
|-- assets
|-- components                   (全局通用组件)
|-- environments                 (环境配置，包括开发环境和生产环境)
    |-- environment.dev.js
    |-- environment.prod.js
|-- services
    |-- auth.service.js          (封装和用户授权相关函数)
    |-- config.service.js        (导出开发环境和生成环境的配置项)  
    |-- request.service.js       (封装axios,以及一些请求拦截)
|-- styles
    |-- element-ui.scss
    |-- index.scss
|-- utils                         (全局通用的方法)
|-- views
    |-- errorPage
    |   |-- 404.vue
    |   |-- 401.vue
    |-- home
    |-- rain-search               (当前导航只有一级菜单)
    |   |-- components            (只存放当前页面使用的组件)
    |   |-- index.vue             (当前目录的入口页面，都命名index.vue)
    |-- water-info                (当前导航有二级菜单)
    |   |-- use-water-manage
    |       |-- components
    |       |-- index.vue
    |   |-- use-water-search
    |       |-- components
    |       |-- index.vue
    |-- APP.vue
    |-- main.js
    |-- router.js
    |-- store.js
```

* 页面文件不同单词使用`-`连接符命名

## 2、api 文件夹

* `api`文件夹中创建文件夹名称要与`views`文件夹中页面保持一致，方便快速页面对应的后端接口
* 导出的文件名以`Api`作为后缀，可以明确文件的作用， 如下：

```javascript
import request from '../services/request.service';
const useWaterSearchApi = {
    getUserResources() {
        return request.get('/mock/getUserResources.json');
    }
};
export default useWaterSearchApi; // 以 Api作为后缀
```

* 页面引入接口名称与导出名称保持一致

## 3、assets 文件夹

* `assets`文件夹主要存放三个主要文件夹, 分别为`fonts`(字体)、`images`(图片)、`js`(外部引入的js文件)

## 4、router 路由

* 路由的`path`和`name`值，是对应页面文件的驼峰命名, 有利于通过地址栏找到对应的页面

![路由示例]({{ site.url }}/assets/img/js/router.png)

* 页面的一级和二级菜单使用嵌套的`children`写法
* 路由对象添加`meta`对象, `meta`对象有两个属性，一个`title`是当前导航将要在页面中显示的名称，另一个是`hidden`用来判断是否在页面显示

示例

```javascript
new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/rainSearch',
      meta: { title: '雨量查询' },
      children: [
        {
          path: 'rainSearch',
          name: 'rainSearch',
          component: () => import('@/views/rain-search/index.vue'),
          meta: { title: '雨量查询' }
        }
      ]
    },
    {
      path: '/waterInfo',
      component: Home,
      redirect: '/waterInfo/useWaterManage',
      meta: { title: '雨量信息' },
      children: [
        {
          path: 'useWaterManage',
          name: 'useWaterManage',
          component: () => import('@/views/water-info/use-water-manage/index.vue'),
          meta: { title: '用水管理' }
        },
        {
          path: 'useWaterSearch',
          name: 'useWaterSearch',
          component: () => import('@/views/water-info/use-water-search/index.vue'),
          meta: { title: '用水查询' }
        }
      ]
    },
    {
      path: '*',
      meta: { title: '404', hidden: true },
      component: () => import('@/views/errorPage/404')
    },
  ]
});
```

## 5、vue 文件

* 文件结构总体安照`template`、`js`、`css`顺序，
* js文件中，组件、属性/状态、生命周期、方法的顺序，
* 生命周期方法的顺序依照执行顺序排序
* `name`以文件名命名

```vue
<template>
</template>
<script>
export default {
  name: 'use-water-search'
  components: {},
  props: {},
  filters: {},
  data () {
    return {}
  },
  computed: {},
  watch() {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  methods: {},
}
</script>
<style lang="scss" scoped>
</style>
```

* 所有的引入的文件后缀不要省略，如组件后缀`.vue`、`.js`
* 对引入的文件`.vue`、`.js`进行分组，`.vue`放在最前方，`.js`紧跟其后

```javascript
import sideBar from './components/side-bar/side-bar.vue';
import navBar from './components/nav-bar/nav-bar.vue';
import useWaterSearchApi from '@/api/water-info/use-water-search.js'
```

* `css`必须加上`scoped`属性
* 属性按照特定的顺序出现并换行保证易读性,如下

```html
 <el-pagination ref="pagination"
                class="bottom-pagination"
                layout="total, prev, pager, next"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :total="totalCount"
                @size-change="sizeChange"
                @current-change="handleCurrentChange"></el-pagination>
```



* 引入文件尽可能使用绝对路径，当前页面的组件使用相对路径，这样移动文件夹时，避免依赖文件找不到


# 其他风格指南

* [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
* [jQuery Core Style Guidelines](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
* [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwldrn/idiomatic.js/)

# 参考文献：

* [编写可维护的JavaScript](https://book.douban.com/subject/21792530/)
* [yuche/javascript](https://github.com/yuche/javascriptt)
* [css-style-guide](https://github.com/Zhangjd/css-style-guide)

