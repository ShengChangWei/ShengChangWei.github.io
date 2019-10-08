---
layout: post
title:  "verdaccio"
date:   2017-12-12
excerpt: "基于verdaccio的npm私有仓库搭建"
tools: true
tag:
- markdown 
- npm
- verdaccio
comments: true
---

# 基于verdaccio的npm私有仓库搭建

### 一、使用npm安装

```shell
    npm install --global verdaccio
```

### 二、cmd  启动 verdaccio

```shell
    verdaccio
```

看到下图说明启动成功

<img src="{{site.url}}/assets/img/npm/0.jpg">

页面输入：localhost:4873

此时看到的页面应该如下：

<img src="{{site.url}}/assets/img/npm/1.jpg">

### 三、如何使用这个仓库

* #### 添加镜像

```shell
npm set registry http://localhost:4873
```

* #### 创建用户登陆

```shell
npm adduser --registry http://localhost:4873
```

首次登陆需要注册用户名和密码：

<img src="{{site.url}}/assets/img/npm/2.jpg">

* ##### 注意点：

 第二步启动服务后， 第一行有一个路径 config file 指向 config.yaml 这个文件是verdaccio 的配置项

  这个配置项中有:

  <img src="{{site.url}}/assets/img/npm/3.jpg">

  auth： htpasswd file：账号密码的文件地址，初始化时不存在，可指定需要手工创建。 
  max_users：默认1000，为允许用户注册的数量。 
  为-1时，不允许用户通过npm adduser注册。但是，当为-1时，可以通过直接编写htpasswd file内容的方式添加用户。有且只有一个用户

### 四、常用配置项

* storage： 仓库保存的地址，也是发布组件（npm publish）时仓库保存的地址 。
* auth： htpasswd file：账号密码的文件地址，初始化时不存在，可指定需要手动创建。 
  max_users：默认1000，为允许用户注册的数量。 
  为-1时，不允许用户通过npm adduser注册。但是，当为-1时，可以通过直接编写htpasswd file内容的方式添加用户。有且只有一个用户
* uplinks: 配置上游的npm服务器，主要用于请求的仓库不存在时到上游服务器去拉取。
* packages: 配置模块。access访问下载权限,publish包的发布权限。

### 四、作用

* 创建公司内部的组件库，只用内网可以访问，安全性较高。
* 使用组件时，通过内网下载速度更快
* 有利于技术、知识的沉淀。