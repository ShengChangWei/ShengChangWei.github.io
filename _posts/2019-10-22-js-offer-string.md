---
layout: post
title:  "剑指offer--字符串"
date:   2019-10-22
excerpt: "剑指offer--字符串" 
javascript: true
tag:
- 剑指offer
comments: true
---

# 字符串

## 目录

* [替换空格](#1、替换空格)


## 1、替换空格

### 题目描述 (2019-10-22)

请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。

```javascript
function replaceSpace(str) {
    str = str.split('');
    for(let i = 0; i< str.length; i++) {
        if(str[i] === " ") {
            str[i] = "%20"
        }
    }
    return str.join("");
}
// 或者正则替换
function replaceSpace(str) {
    const re = / /g;
    return str.replace(re, "%20");
}
```


