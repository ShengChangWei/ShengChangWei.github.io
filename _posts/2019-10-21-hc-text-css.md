---
layout: post
title:  "字体特效"
date:   2019-10-21
excerpt: "纯css实现酷炫的字体特效"
htmlCss: true
tag:
- markdown 
- Html
- css
comments: true
---

## 划线特效

![划线特效]({{ site.url }}/assets/img/html-css/dt.gif)

关键点：

* `scaleX` 实现缩放，相比于设置width，会启用 GPU，避免重绘。
* `transform-origin`属性来修改动画方向

```html
<span>划线特效</span>
```

```css
span {
    color: #000;
    position: relative;
    padding: 2px;
}
span::before,
span::after {
    content: "";
    left: 0;
    right: 0;
    height: 2px;
    background: #e8520b;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
}
span::before {
    top: 0;
    transform-origin: center right;
}
span::after {
  bottom: 0;
  transform-origin: center left;
}
span:hover {
  cursor: pointer;
}
span:hover::before {
  transform-origin: center left;
  transform: scaleX(1);
}
span:hover::after {
  transform-origin: center right;
  transform: scaleX(1);
}
```

