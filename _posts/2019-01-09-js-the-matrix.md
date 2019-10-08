---
layout: post
title:  "炫酷的黑客帝国"
date:   2017-12-12
excerpt: "借鉴网上众多大牛的实现的黑客帝国效果"
javascript: true
tag:
- markdown 
- javascript
- canvas
comments: true
---

# 黑客帝国

> 关键点： 
* canvas

<img src="{{site.url}}/assets/img/js/matrix.gif">

> ### html

```html
  <canvas id="canvas">请使用高版本浏览器，IE8以及一下不支持canvas</canvas>
```

> ### css

```css
   html,body{height:100%;overflow:hidden}
```

> ### js

```javascript
  window.onload = function() {
      var width,height,
      canvas = document.getElementById("canvas");
      canvas.width = width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      canvas.height = height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var ctx = canvas.getContext('2d');
      var num = Math.ceil(width / 10);
      var y = Array(num).join(0).split('');
      var draw = function() {
            ctx.fillStyle = 'rgba(0,0,0,.05)'; //核心代码，创建黑色背景，透明度为0.05的填充色。
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#0f0'; //设置了字体颜色为绿色
            ctx.font = '10px Microsoft YaHei';//设置字体大小与family
            for(i = 0; i < num; i++) {
                var x = (i * 10) + 10;
                text = String.fromCharCode(65 + Math.random() * 62);
                var y1 = y[i];
                ctx.fillText(text, x, y1);
                if(y1 > Math.random() * 10 * height) {
                    y[i] = 0;
                } else {
                    y[i] = parseInt(y[i]) + 10;
                }
            }
        }
    
        ;(function(){
            setInterval(draw, 100);
        })();
      }
```