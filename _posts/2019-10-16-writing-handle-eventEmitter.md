---
layout: post
title:  "手动实现订阅发布模式（观察者模式）"
date:   2019-10-16
excerpt: "订阅发布模式（观察者模式）"
handWriting: true
tag:
- javascript
comments: true
---


# 手动实现订阅发布模式（观察者模式）

```javascript
var Event = (function(){
    var clientList = [], 
        subscribe, 
        publish, 
        unsubscribe;
    subscribe = function() { //订阅事件
        if ( !this.clientList[ key ] ){ // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
                this.clientList[ key ] = []; 
        } 
        this.clientList[ key ].push( fn ); // 订阅的消息添加进消息缓存列表
    };
    publish = function() {
        var key = Array.prototype.shift.call( arguments ), // 取出消息类型
        fns = this.clientList[ key ]; // 取出该消息对应的回调函数集合
        if ( !fns || fns.length === 0 ){ // 如果没有订阅该消息，则返回
            return false; 
        } 
        for( var i = 0, fn; fn = fns[ i++ ]; ){ 
            fn.apply( this, arguments ); // (2) // arguments 是发布消息时附送的参数
        }
    };
    unsubscribe = function(key, fn) {
        const t = this.clientList[key];
        if (!t) { // 如果 key 对应的消息没有被人订阅，则直接返回
            return false;
        }
        if (!fn) {
            // 如果不指定处理方法，则取消该事件下所有的处理方法
            delete this.clientList[key];
            return true;
        }
        // 找到指定取消的处理方法的位置
        const i = t.indexOf(fn);
        if (i < 0) {
            return false;
        }
        t.splice(i, 1);
        // 如果事件下的处理方法为空则删除该事件
        if (!t.length) {
            delete this.clientList[key];
        }
        return true;
    };
    return { 
        subscribe: listen, 
        publish: trigger, 
        unsubscribe: remove 
    }

})()
```



