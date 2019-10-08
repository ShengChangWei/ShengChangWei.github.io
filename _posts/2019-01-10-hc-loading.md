---
layout: post
title:  "预加载loading效果"
date:   2019-01-10
excerpt: "5种预加载动画效果"
htmlCss: true
tag:
- markdown 
- Html
- css
- loading
comments: true
---

# 预加载动画效果

## 1、双旋圈

<img src="{{ site.url }}/assets/img/html-css/loading0.gif" alt="双旋圈">

> ### html

```html
    <body style="background: #ab69d9" >
        <div id="preloader-1">
            <span></span>
            <span></span>
        </div>
    </body>
```

> ### css

```css
    #preloader-1{
        position: relative;
    }
    #preloader-1 span{
        position: absolute;
        border:8px solid #fff;
        border-top:8px solid transparent;
        border-radius: 50%;
    }
    #preloader-1 span:nth-child(1){
        width:80px;
        height: 80px;
        animation: spin-1 2s infinite linear;
    }
    #preloader-1 span:nth-child(2){
        top:20px;
        left:20px;
        width:40px;
        height: 40px;
        animation: spin-2 1s infinite linear;
    }
    @keyframes spin-1{
        0%{transform: rotate(360deg); opacity: 1.0;}
        50%{transform: rotate(180deg); opacity: 0.5;}
        100%{transform: rotate(0deg);opacity: 0;}
    }
    @keyframes spin-2{
        0%{transform: rotate(0deg); opacity: 0.5;}
        50%{transform: rotate(180deg); opacity: 1;}
        100%{transform: rotate(360deg);opacity: 0.5;}
    }

```

## 2、交错圈

<img src="{{ site.url }}/assets/img/html-css/loading1.gif">

> ### html

```html
    <body style="background: #4ad3b4">
        <div id="preloader-2">
            <span></span>
            <span></span>
        </div>
    </body>
```

> ### css

```css
    #preloader-2{
        position: relative;
    }
    #preloader-2 span{
        position: absolute;
        width:30px;
        height: 30px;
        background: #fff;
        border-radius: 50%;
    }
    #preloader-2 span:nth-child(1){
        animation: cross-1 1.5s infinite linear;
    }
    #preloader-2 span:nth-child(2){
        animation: cross-2 1.5s infinite linear;
    }
    @keyframes cross-1{
        0%{transform: translateX(0); opacity: 0.5;}
        50%{transform: translateX(80px); opacity: 1;}
        100%{transform: translateX(0);opacity: 0.5;}
    }
    @keyframes cross-2{
        0%{transform: translateX(80px); opacity: 0.5;}
        50%{transform: translateX(0); opacity: 1;}
        100%{transform: translateX(80px);opacity: 0.5;}
    }
```

## 3、旋转圈

<img src="{{ site.url }}/assets/img/html-css/loading2.gif">

> ### html

```html
    <body style="background: #ab69d9;">
        <div id="preloader-3">
            <span></span>
        </div>
    </body>
```
> ### css

```css
    #preloader-3{
    position: relative;
    width:80px;
    height: 80px;
    border:4px solid rgba(255,255,255,.25);
    border-radius: 50%;
    
    }
    #preloader-3 span{
        position: absolute;
        width:80px;
        height:80px;
        border:4px solid transparent;
        border-top:4px solid #fff;
        border-radius: 50%;
        top:-4px;
        left:-4px;
        animation: rotate 1s infinite linear;
    }
    @keyframes rotate{
        0%{transform: rotate(0deg);}
        100%{transform: rotate(360deg);}
    }
```

## 4、跳动圈

<img src="{{ site.url }}/assets/img/html-css/loading3.gif">

> ### html

```html
    <body style="background: #c1d64a;">
        <div id="preloader-4">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </body>
```
> ### css

```css
    #preloader-4{
        position: relative;
    }
    #preloader-4 span{
        position:absolute;
        width:16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        animation: bounce 1s infinite linear;
    }
    #preloader-4 span:nth-child(1){
        left:0;
        animation-delay: 0s;
    }
    #preloader-4 span:nth-child(2){
        left:20px;
        animation-delay: 0.25s;
    }
    #preloader-4 span:nth-child(3){
        left:40px;
        animation-delay: 0.5s;
    }
    #preloader-4 span:nth-child(4){
        left:60px;
        animation-delay: 0.75s;
    }
    #preloader-4 span:nth-child(5){
        left:80px;
        animation-delay: 1.0s;
    }
    @keyframes bounce{
        0%{transform: translateY(0px);opacity: 0.5;}
        50%{transform: translateY(-30px);opacity: 1.0;}
        100%{transform: translateY(0px);opacity: 0.5;}
    }

```

## 5、雷达图

<img src="{{ site.url }}/assets/img/html-css/loading4.gif">

> ### html

```html
    <body style="background: #f9553f;">
        <div id="preloader-5">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </body>
```
> ### css

```css
    #preloader-5{
        position: relative;
    }
    #preloader-5 span{
        position:absolute;
        width:50px;
        height: 50px;
        border:5px solid #fff;
        border-radius: 50%;
        opacity: 0;
        animation: radar 2s infinite linear;
    }
    #preloader-5 span:nth-child(1){
        animation-delay: 0s;
    }
    #preloader-5 span:nth-child(2){
        
        animation-delay: 0.66s;
    }
    #preloader-5 span:nth-child(3){
        animation-delay: 1.33s;
    }

    @keyframes radar{
        0%{transform: scale(0);opacity: 0;}
        25%{transform: scale(0);opacity: 0.5;}
        50%{transform: scale(1);opacity: 1.0;}
        75%{transform: scale(1.5);opacity: 0.5;}
        100%{transform: scale(2);opacity: 0;}
    }
```

# 本文借鉴博客： 

* <a href="https://www.cnblogs.com/moqiutao/p/6408252.html">CSS3效果：5种预载动画效果</a>

* <a href="http://www.ibloger.net/assets/demos/css3-page-preload-30-animations/index.html">30种CSS3炫酷页面预加载loading动画特效</a>


