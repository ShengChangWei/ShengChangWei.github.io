---
layout: post
title:  "简单算法--字符串"
date:   2019-10-22
excerpt: "简单算法--leetCode--字符串" 
algorithm: true
tag:
- leetCode
- 数据结构与算法
comments: true
---

# 字符串（leetCode）

## 目录


* [反转字符串中的单词](#1反转字符串中的单词III2019-10-24)



## 1、反转字符串中的单词 III（2019-10-24）

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
    return str.split(" ").map(item => {
        return item.split('').reverse().join('')
    }).join(" ")
}
```

























<!-- ### 题目描述

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
``` -->


