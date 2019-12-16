---
layout: post
title:  "String"
date:   2019-10-22
excerpt: "字符串" 
algorithm: true
tag:
- 数据结构与算法
comments: true
---

<!-- TOC -->

- [0.1. 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。](#01-给定一个字符串请你找出其中不含有重复字符的-最长子串-的长度)
- [0.2. 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。](#02-给定一个字符串-s找到-s-中最长的回文子串你可以假设-s-的最大长度为-1000)

<!-- /TOC -->

## 0.1. 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例：

```shell
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let len = 0;
    let str = '';
    for (let i = 0; i < s.length; i++) {
        if (str.indexOf(s[i]) === -1) {
            str += s[i];
            if (str.length > len) {
                len = str.length;
            }
        } else {
            str += s[i];
            str = str.slice(str.indexOf(s[i]) +1);
        }
    }
    return len;
};
```

## 0.2. 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

回文：通俗的说，就是倒着念正者念都一样，前后对称。如： “上海自来水来自海上”。

示例：

```shell
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```



