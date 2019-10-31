---
layout: post
title:  "简单算法--字符串"
date:   2019-10-22
excerpt: "简单算法--字符串" 
algorithm: true
tag:
- 数据结构与算法
comments: true
---

# 字符串

## 目录

* [替换空格](#1替换空格2019-10-22)
* [字符串全排序](#2字符串全排序2019-10-23)
* [反转字符串中的单词](#3反转字符串中的单词2019-10-24)
* []


## 1、替换空格（2019-10-22）

### 题目描述

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

## 2、字符串全排序（2019-10-23）

### 题目描述

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。

要求： 输入一个字符串,长度不超过9(可能有字符重复),字符只包括大小写字母。

参考学习：[牛客网](https://www.nowcoder.com/questionTerminal/fe6b651b66ae47d7acce78ffdd9a96c7)

#### 递归全排列法：

* 把字符串分为两部分：第一部分为第一个字符，第二部分为第一个字符以后的字符串。
* 然后接下来求后面那部分的全排列。
* 再将第一个字符与后面的那部分字符逐个交换

```javascript
function Permutation(str) {
    let res=[];
    if(str.length<=0) return res;
    arr=str.split("");//将字符串转化为字符数组
    res=permutate(arr,0,res);
    res=[...new Set(res)];
    res.sort();
    return res;
}
function permutate(arr,index,res) {
    if(arr.length==index){
        let s="";
        for(let i=0;i<arr.length;i++){
            s+=arr[i];
        }
        return res.push(s);
    }else{
        for(var i=index;i<arr.length;i++){
            [arr[index],arr[i]]=[arr[i],arr[index]];
            permutate(arr,index+1,res);
            [arr[index],arr[i]]=[arr[i],arr[index]];
        }
    }
    return res;
}
```

#### 回溯法:

也就是利用树去尝试不同的可能性，不断地去字符串数组里面拿一个字符出来拼接字符串，当字符串数组被拿空时，就把结果添加进结果数组里，然后回溯上一层。（通过往数组加回去字符以及拼接的字符串减少一个来回溯。）

```javascript
function Permutation(str) {
    let res=[],pStr="";
    if(str.length<=0) return res;
    arr=str.split("");//将字符串转化为字符数组
    res=permutate(arr,pStr,res);
    return res;
}
function permutate(arr,pStr,res) {
    if(arr.length==0){
        return res.push(pStr);
    }else{
        let isRepeated=new Set();
        for(let i=0;i<arr.length;i++){
            if(!isRepeated.has(arr[i])){//避免相同的字符交换
                let char=arr.splice(i,1)[0];
                pStr+=char;
                permutate(arr,pStr,res);
                arr.splice(i,0,char);//恢复字符串，回溯
                pStr=pStr.slice(0,pStr.length-1);//回溯
                isRepeated.add(char);
            }
        }
    }
    return res;
}
```

## 3、反转字符串中的单词（2019-10-24）

### 题目描述

给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

`示例：`

```shell
输入: "Let's take LeetCode contest"
输出: "s'teL ekat edoCteeL tsetnoc" 
```

`注意：` 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

```javascript
/**
 * @param {string} str
 * @return {string}
 */
function reverseWords(str) {
    // 可把空格换成`/\s/g`
    return str.split(" ").map(item => {
        return item.split('').reverse().join('')
    }).join(" ")
}
// 或者(match)
function reverseWords(str) {
     return str.match(/[\w']+/g).map(item => {
        return item.split('').reverse().join('')
    }).join(" ")
}
```

## 4、请你来实现一个 atoi 函数，使其能将字符串转换成整数。

### 题目描述

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

### 说明：

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

```javascript
function myAtoi() {

}
```


参考学习：

[leetCode](https://leetcode-cn.com/problems/string-to-integer-atoi/)
[心谭博客](https://xin-tan.com/passages/2019-06-23-str-atoi/)

