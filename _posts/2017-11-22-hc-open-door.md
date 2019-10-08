---
layout: post
title:  "H5C3实现开门大吉效果"
date:   2017-11-22
excerpt: "利用Css3的3D，实现的开门效果"
htmlCss: true
tag:
- markdown 
- Html
- css
comments: true
---

## 开门大吉效果

<img src="{{ site.url }}/assets/img/html-css/door.gif" width="400" alt="">

关键点： css3的3D属性

- transform-style: preserve-3d;
- perspective: 800px; 距离眼睛的距离

> ### html
>
> 百度钱包

```html
    <div class="box"></div>
```

> ### css

```css
    .box {
        width: 450px;
        height: 300px;
        background: url(images/3.jpg);
        border: 1px solid #000;
        margin: 100px auto;
        position: relative;
        transform-style: preserve-3d;
        /*眼睛距离屏幕的距离*/
        perspective: 800px;
        }
    .box:before,.box:after {
        content: "";
        display: block;
        width: 50%;
        height: 100%;
        background: url(images/bg.png);
        position: absolute;
        transition: all 1s;
    }
    .box:before {
        left: 0;
        top: 0;
        transform-origin: left;
    }
    .box:after {
        transform-origin: right;
        right: 0;
        top: 0;
    }
    .box:hover.box:before {
        transform: rotateY(-180deg);
    }
    .box:hover.box:after {
        transform: rotateY(180deg);
    }
```