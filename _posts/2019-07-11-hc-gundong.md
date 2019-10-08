---
layout: post
title:  "H5C3实现新闻上下无缝滚动"
date:   2019-07-11
excerpt: "项目中新闻上下无缝滚动效果"
htmlCss: true
tag: 
- Html
- css
comments: true
---

# H5C3实现新闻上下无缝滚动

<img src="{{ site.url }}/assets/img/html-css/gundong.gif">

```html
<div class="box">
    <div class="son">
        <p>1分地方地方地方地方大幅度</p>
        <p>2分地方地方地方地方大幅度</p>
        <p>3分地方地方地方地方大幅度</p>
        <p>4分地方地方地方地方大幅度</p>
        <p>5分地方地方地方地方大幅度</p>
        <p>6分地方地方地方地方大幅度</p>
        <p>7分地方地方地方地方大幅度</p>
        <p>8分地方地方地方地方大幅度</p>
        <p>1分地方地方地方地方大幅度</p>
        <p>2分地方地方地方地方大幅度</p>
        <p>3分地方地方地方地方大幅度</p>
        <p>4分地方地方地方地方大幅度</p>
        <p>5分地方地方地方地方大幅度</p>
        <p>6分地方地方地方地方大幅度</p>
        <p>7分地方地方地方地方大幅度</p>
        <p>8分地方地方地方地方大幅度</p>
    </div>
</div>
```

```css

p {
    margin: 0;
    padding: 0;
    height:21px;
    line-height: 21px;
}
.box {
    width: 300px;
    height: 168px;
    border: 1px solid pink;
    margin: 200px auto;
    overflow: hidden;
}
.son {
    width: 302px;
    height: 336px;
}
.box p {
    animation: move 5s infinite linear;
}
.box:hover p {
    animation-play-state: paused;
}
/*定义动画集*/
@keyframes move {
    from {

    }
    to {
        transform: translate(0,-168px);
    }
}
```