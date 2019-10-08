---
layout: post
title:  "H5C3实现360度旋转图片"
date:   2017-12-12
excerpt: "利用Css3的3D，实现的鼠标图片360度旋转效果"
htmlCss: true
tag:
- markdown 
- Html
- css
comments: true
---

## 图片翻转效果

<img src="{{ site.url }}/assets/img/html-css/rotate.gif" width="400" alt="">

关键点： 

- transform-origin: top right;
- 子绝父相
- transform: rotate(60deg);

> ### html

```html
    <div>
        <img src="images/6.jpg" alt=""/>
        <img src="images/5.jpg" alt=""/>
        <img src="images/4.jpg" alt=""/>
        <img src="images/3.jpg" alt=""/>
        <img src="images/2.jpg" alt=""/>
        <img src="images/1.jpg" alt=""/>
    </div>
```

```css
    div {
        width: 250px;
        height: 170px;
        margin: 200px auto;
        position: relative;
     }
    div img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.6s;
        transform-origin: top right;
    }
        /*鼠标经过div 第一张图片旋转*/
     div:hover img:nth-child(1){
         transform: rotate(60deg);
     }
     div:hover img:nth-child(2){
         transform: rotate(120deg);
     }
     div:hover img:nth-child(3){
         transform: rotate(180deg);
     }
     div:hover img:nth-child(4){
         transform: rotate(240deg);
     }
     div:hover img:nth-child(5){
         transform: rotate(300deg);
     }
     div:hover img:nth-child(6){
         transform: rotate(360deg);
     }
```