---
layout: post
title:  "post导出/下载文件"
date:   2019-04-04
excerpt: "post方式实现导出/下载文件"
vue: true
tag:
- vue
comments: true
---


# post方式实现导出/下载文件

```shell
    项目需求： 前端需要传入过多的参数给后端，get地址栏不行，只能接受post方式去导出数据
```

### 1、get的下载方式

> 通常下载方式如下：

```javascript
    let url =  xxxx.action?a=xx&b=yy;
    window.location.href = url;
    // 或者
    window.open(url, '_self')
```
弊端：当请求参数较多时，get的方式无法使用，这时候需要考虑post的方式，但是直接通过ajax的post的方式无法调用浏览器的下载功能


### 2、post的下载方式

原理： 创建一个隐藏form表单，通过form表单的提交刷新功能，实现下载。代码如下：

```javascript
    // vue项目代码
  // 导出excel
   function postExcelFile(params, url) {
      //params是post请求需要的参数，url是请求url地址
      var form = document.createElement("form");
      form.style.display = "none";
      form.action = url;
      form.method = "post";
      document.body.appendChild(form);
    // 动态创建input并给value赋值
      for (var key in params) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      }

      form.submit();
      form.remove();
    }

    //调用
    postExcelFile(
        { currentPage: 2, pageSize: 20 },
        'url/xxxxxxx/' //接口地址
      );
```
注意点：传给后端的参数不是json对象的形式，而是 `currentPage=2&pageSize=20`, 因此需要后端兄弟的配合