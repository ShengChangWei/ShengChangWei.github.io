---
layout: post
title:  "封装vue路由数据格式"
date:   2019-11-22
excerpt: "架构图"
javascript: true
tag:
- javascript
comments: true
---


```javascript
[

    {
      name: 'login',
      path: '/login',
      meta: { title: '登录页面', hidden: true },
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/',
      component: Home,
      redirect: '/operationMonitorin',
      meta: { title: '雨量查询', hidden: false },
      children: [
        {
          path: 'operationMonitorin',
          name: 'operationMonitorin',
          component: () => import('@/views/operation-monitorin/operation-monitorin.vue'),
          meta: { title: '雨量站', hidden: false }
        }
      ]
    },
    {
      path: '/dataReport',
      component: Home,
      redirect: '/dataReport/userWaterData',
      meta: { title: '水量查询', hidden: false },
      children: [
        {
          path: 'userWaterData',
          name: 'userWaterData',
          component: () => import('@/views/data-report/user-water-data.vue'),
          meta: { title: '用水1', hidden: false }
        },
        {
          path: 'userElectricityData',
          name: 'userElectricityData',
          component: () => import('@/views/data-report/use-electricity-data.vue'),
          meta: { title: '用水2', hidden: false }
        }
      ]
    },
    {
      path: '*',
      meta: { title: '测试', hidden: true },
      component: () => import('@/views/errorPage/404')
    }
  ]
```

封装成如下格式

```javascript
[
    {id: '/login,
     resourceName:'登录页面',
     icon:'fa fa-book',
     hidden:true,
     url:'/login,
     children:[]
    },
    {
     id:'/',
     resourceName:'雨量查询',
     icon:'fa fa-book',
     hidden:false,
     url:'/',
     children:[{
         id:'operationMonitorin,
         resourceName:'雨量站',
         icon:'fa fa-book',
         hidden:false,
         url:'/operationMonitorin,
         children:[]
     }]
    },
    {id:'/dataReport',
     resourceName:'水量查询',
     icon:'fa fa-book',
     hidden:false,
     url:'/dataReport',
     children:[{
         id:'userWaterData',
         resourceName:'用水1',
         icon:'fa fa-book',
         hidden:false,
         url:'/dataReport/userWaterData',
         children:[]
     },
     {
       	id:'userElectricityData',
      	resourceName:'用水2',
        icon:'fa fa-book',
         hidden:false,
         url:'/dataReport/userElectricityData',
         children:[]
     }]
    },
    {
     id:'*',
     resourceName:'测试',
     icon:'fa fa-book',
     hidden:true,
     url:'/*',
     children:[]
    }
]
```

> 代码如下：

```javascript
    handleRouter(routerData, basePath = '') {
      const children = [];
      routerData.forEach(item => {
        let path;
        if (basePath === '/') {
          path = basePath + item.path;
        } else {
          path = basePath + '/' + item.path;
        }
        const url = /^\/.*/.test(item.path) ? item.path : path;
        const obj = {
          id: item.path,
          resourceName: item.meta.title,
          icon: 'fa fa-book',
          hidden: item.meta.hidden,
          url: url,
          children: []
        };
        if (item.children) {
          obj.children = this.handleRouter(item.children, item.path);
          return children.push(obj);
        } else {
          children.push(obj);
        }
      });
      return children;
    }
```