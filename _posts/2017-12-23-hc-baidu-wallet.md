---
layout: post
title:  "H5C3实现百度钱包"
date:   2017-12-12
excerpt: "利用Css3的3D，实现的图片翻转效果"
htmlCss: true
tag:
- markdown 
- Html
- css
comments: true
---

## 图片翻转效果

<img src="{{ site.url }}/assets/img/html-css/baidu1.gif" width="400" alt="">

关键点： 

- transform-style: preserve-3d;
- background-position: right;
- ::before 和 ::after 伪元素的使用

> ### 先准备一张 606*301的并列图片， 如下图：（如何你没有准备好图片，可直接保存下面图片使用^_^努力！）

<img src="{{ site.url }}/assets/img/html-css/baidu0.png" width="400" alt="">


> ### html

```html
    <div class="box"></div>
```

> ### css

```css
    body {
        background-color: #ccc;
    }
    .box {
        width: 303px;
        height: 301px;
        border-radius: 50%;
        margin: 100px auto;
        background-color: #fff;
        position: relative;
        /*将父元素的子元素设置为一个整体*/
        transform-style: preserve-3d;
        transition: 1s;
    }
    .box:before,.box:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: url(baidu.png);
        position: absolute;
    }
    .box:before {
        z-index: 1;
    }
    .box:after {
        background-position: right;
        transform: translateZ(0px) rotateY(180deg);
    }
    .box:hover {
        transform:translateZ(0px) rotateY(180deg);
    }
```

