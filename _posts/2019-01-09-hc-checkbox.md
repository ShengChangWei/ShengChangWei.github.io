---
layout: post
title:  "自定义checkbox样式"
date:   2017-12-12
excerpt: "纯css实现自定义单选框、多选框、switch开关"
htmlCss: true
tag:
- markdown 
- Html
- css
comments: true
---

# 自定义checkbox样式

> ### 关键点

* label的for属性可以关联一个具体的input元素
* 隐藏input元素，然后修改label样式

## 1、复选框样式

<img src="{{site.url}}/assets/img/html-css/checkbox.gif">

> ### html

```html
    <input type="checkbox" id="inputId">
    <label for="inputId"></label>
```

> ### css

```css
  input {
      display: none;
    }
  label {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #2eb5f0;
      position: relative;
      cursor: pointer;
  }
  label::before {
      display: inline-block;
      content: " ";
      width: 12px;
      border: 2px solid #fff;
      height: 4px;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      top: 5px;
      left: 3px;
      position: absolute;
      opacity: 0;
  }
  input:checked+label {
      background: #2eb5f0;
  }
  input:checked+label::before{
      opacity: 1;
      transform: all 0.5s;
  }
```

## 2、单选框

> ### html

<img src="{{site.url}}/assets/img/html-css/radio.gif">

```html
  <input type="radio" id="radioId">
  <label for="radioId"></label>
```

> ### css

```css
  label {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #2eb5f0;
      position: relative;
      cursor: pointer;
  }
  label::before {
      content: " ";
      display: inline-block;
      width: 7px;
      height: 7px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  input[type=radio] {
      display: none;
  }
  input[type=radio]:checked+label {
      background-color: #2eb5f0;
  }
```

## 3、switch开关

<img src="{{site.url}}/assets/img/html-css/switch.gif">

> ### html

```html
  <input type="checkbox" id="checkId" checked>
  <label for="checkId"></label>
```

> ### css

```css
  label {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
      background-color: red;
      border-color: red;
      border-radius: 10px;
  }
  label::before {
      content: " ";
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      position: absolute;
      right: 22px;
      top: 2px;
      background-color: #fff;
      transition: all 0.4s ease;
      cursor: pointer;
  }
  input {
      display: none;
  }
  input:checked+label {
      background-color: rgb(19, 206, 102);
      border-color: rgb(19, 206, 102);
  }
  input:checked+label::before {
      right: 2px;
  }
```