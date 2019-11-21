---
layout: post
title:  "《JavaScript设计模式与开发实践》-- 亨元模式"
date:   2019-10-21
excerpt: "亨元模式" 
model: true
tag:
- 设计模式
comments: true
---

# 亨元模式

## 1、定义（学习模式不是目的，一定要了解其思想）

亨元模式：要求将对象的属性划分为内部状态和外部状态（状态在这里通常指属性）。亨元模式的目标是尽量减少共享对象的数量。

## 2、内部状态与外部状态

### 2.1 如何划分内部状态和外部状态

* 内部状态储存于对象的内部。
* 内部状态可以被一些对象共享
* 内部状态独立于具体的场景，通常不会改变
* 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

剥离了外部状态的对象成为共享对象， 外部状态在必要时被传入共享对象来组装成一个完整的对象。虽然组装外部状态成为一个完整对象的过程需要花费一定的时间，但却可以大大减少系统中的对象数量，相比之下，这点时间或许是微不足道的。因此，享元模式是一种用时间换空间的优化模式。

## 3、文件上传的例子

### 3.1 对象爆炸

在微云上传模块的开发中，我曾经经历过对象爆炸的问题。微云的文件上传功能虽然可以选择依照队列，一个一个地排队上传，但也支持同时选择 2000 个文件。每一个文件都对应着一个
JavaScript上传对象的创建，在第一版开发中，的确往程序里同时 new了 2000个 upload 对象，结果可想而知，Chrome中还勉强能够支撑，IE下直接进入假死状态。

微云支持好几种上传方式，比如浏览器插件、Flash 和表单上传等，为了简化例子，我们先假设只有插件和 Flash 这两种。不论是插件上传，还是 Flash 上传，原理都是一样的，当用户选择了文件之后，插件和 Flash 都会通知调用 Window 下的一个全局 JavaScript 函数，它的名字是startUpload， 用户选择的文件列表被组合成一个数组 files 塞进该函数的参数列表里， 代码如下：

```javascript
var id = 0;
window.startUpload = function(uploadType, files) {
    for(var i = 0, file; file = files[i++];) {
        var uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
        uploadObj.init(id++);
    }
}
```

当用户选择完文件之后， startUpload 函数会遍历 files 数组来创建对应的 upload 对象。 接下来定义 Upload 构造函数，它接受 3个参数，分别是插件类型、文件名和文件大小。这些信息都已经被插件组装在 files 数组里返回，代码如下：

```javascript
var Upload = function( uploadType, fileName, fileSize ){ 
    this.uploadType = uploadType; 
    this.fileName = fileName; 
    this.fileSize = fileSize; 
    this.dom= null;                
}; 
 
Upload.prototype.init = function( id ){ 
    var that = this; 
    this.id = id; 
    this.dom = document.createElement( 'div' ); 
    this.dom.innerHTML =  
               '<span>文件名称:'+ this.fileName +', 文件大小: '+ this.fileSize +'</span>' + 
               '<button class="delFile">删除</button>'; 
 
    this.dom.querySelector( '.delFile' ).onclick = function(){ 
        that.delFile(); 
    } 
    document.body.appendChild( this.dom ); 
};
```

同样为了简化示例，我们暂且去掉了 upload 对象的其他功能，只保留删除文件的功能，对应的方法是 Upload.prototype.delFile。该方法中有一个逻辑：当被删除的文件小于 3000 KB时，该文件将被直接删除。否则页面中会弹出一个提示框，提示用户是否确认要删除该文件，代码如下： 

```javascript
Upload.prototype.delFile = function(){ 
    if ( this.fileSize < 3000 ){ 
        return this.dom.parentNode.removeChild( this.dom ); 
    } 
    if ( window.confirm( '确定要删除该文件吗? ' + this.fileName ) ){ 
        return this.dom.parentNode.removeChild( this.dom ); 
    } 
}; 
```
接下来分别创建 3个插件上传对象和 3个 Flash上传对象： 

```javascript
startUpload( 'plugin', [ 
    { 
        fileName: '1.txt', 
        fileSize: 1000 
    }, 
    { 
        fileName: '2.html', 
        fileSize: 3000 
    }, 
    { 
        fileName: '3.txt', 
        fileSize: 5000 
    } 
]); 
 
startUpload( 'flash', [ 
    { 
        fileName: '4.txt', 
        fileSize: 1000 
    }, 
    { 
        fileName: '5.html', 
        fileSize: 3000 
    }, 
    { 
        fileName: '6.txt', 
        fileSize: 5000 
    } 
]); 
```
当点击删除最后一个文件时，可以看到弹出了是否确认删除的提示。

### 3.2 亨元模式重构文件上传

上一节的代码是第一版的文件上传，在这段代码里有多少个需要上传的文件，就一共创建了多少个 upload 对象，接下来我们用享元模式重构它。

#### 3.2.1 剥离外部状态

明确 uploadType 作为内部状态，因为 upload 对象初始化的工作被放在了 upload-Manager.add 函数里面，接下来只需要定义 Upload.prototype.del 函数即可：

```javascript
Upload.prototype.delFile = function( id ){ 
    uploadManager.setExternalState( id, this );  // (1) 
    if ( this.fileSize < 3000 ){ 
        return this.dom.parentNode.removeChild( this.dom ); 
    }
    if ( window.confirm( '确定要删除该文件吗? ' + this.fileName ) ){ 
        return this.dom.parentNode.removeChild( this.dom ); 
    } 
};
```

在开始删除文件之前，需要读取文件的实际大小，而文件的实际大小被储存在外部管理器uploadManager 中， 所以在这里需要通过 uploadManager.setExternalState 方法给共享对象设置正确
的 fileSize，上段代码中的(1)处表示把当前 id 对应的对象的外部状态都组装到共享对象中。

#### 3.2.2 工厂进行对象实例化

接下来定义一个工厂来创建 upload 对象，如果某种内部状态对应的共享对象已经被创建过，那么直接返回这个对象，否则创建一个新的对象： 

```javascript
var UploadFactory = (function(){ 
    var createdFlyWeightObjs = {}; 
    return { 
        create: function( uploadType){ 
            if ( createdFlyWeightObjs [ uploadType] ){ 
                return createdFlyWeightObjs [ uploadType]; 
            } 
 
            return createdFlyWeightObjs [ uploadType] = new Upload( uploadType); 
        } 
    } 
})();
```

#### 3.2.3 管理器封装外部状态

现在我们来完善前面提到的 uploadManager 对象，它负责向 UploadFactory 提交创建对象的请求，并用一个 uploadDatabase 对象保存所有 upload 对象的外部状态，以便在程序运行过程中给upload 共享对象设置外部状态，代码如下：

```javascript
var uploadManager = (function(){ 
    var uploadDatabase = {};
    return { 
        add: function( id, uploadType, fileName, fileSize ){ 
            var flyWeightObj = UploadFactory.create( uploadType ); 
 
            var dom = document.createElement( 'div' ); 
            dom.innerHTML =  
                    '<span>文件名称:'+ fileName +', 文件大小: '+ fileSize +'</span>' + 
                    '<button class="delFile">删除</button>'; 
 
            dom.querySelector( '.delFile' ).onclick = function(){ 
                flyWeightObj.delFile( id ); 
            }
            document.body.appendChild( dom ); 
            uploadDatabase[ id ] = { 
                fileName: fileName, 
                fileSize: fileSize, 
                dom: dom         
            }; 
            return flyWeightObj ; 
        }, 
        setExternalState: function( id, flyWeightObj ){ 
            var uploadData = uploadDatabase[ id ]; 
            for ( var i in uploadData ){ 
                flyWeightObj[ i ] = uploadData[ i ]; 
            } 
        } 
    } 
})();
```

然后是开始触发上传动作的 startUpload 函数

```javascript
var id = 0; 
 
window.startUpload = function( uploadType, files ){ 
   for ( var i = 0, file; file = files[ i++ ]; ){ 
        var uploadObj = uploadManager.add( ++id, uploadType, file.fileName, file.fileSize ); 
   } 
}
```
最后是测试时间，运行下面的代码后，可以发现运行结果跟用享元模式重构之前一致

```javascript
startUpload( 'plugin', [ 
    { 
        fileName: '1.txt', 
        fileSize: 1000 
    }, 
    { 
        fileName: '2.html', 
        fileSize: 3000 
    }, 
    { 
        fileName: '3.txt', 
        fileSize: 5000 
    } 
]); 
 
startUpload( 'flash', [ 
    { 
        fileName: '4.txt', 
        fileSize: 1000 
    }, 
    { 
        fileName: '5.html', 
        fileSize: 3000 
    }, 
    { 
        fileName: '6.txt',
        fileSize: 5000 
    } 
]);
```
享元模式重构之前的代码里一共创建了 6个 upload对象，而通过享元模式重构之后，对象的数量减少为 2，更幸运的是， 就算现在同时上传 2000个文件，需要创建的 upload对象数量依然是 2。  

