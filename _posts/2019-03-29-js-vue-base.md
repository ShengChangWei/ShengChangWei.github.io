---
layout: post
title:  "vue官方文档记录"
date:   2019-03-29
excerpt: "认为有必要记录一下的知识"
javascript: true
tag:
- vue
comments: true
---

# vue

### 1、动态参数

> 2.6.0 新增

```html
<!-- 动态属性 -->
<a v-bind:[attributeName]="url"> ... </a> 
<!-- 动态事件 -->
<a v-on:[eventName]="doSomething"> ... </a>
```

### 2、插值

> 双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令：

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

### 3、计算属性和侦听器

#### 3.1 计算属性

```html
    <div id="example">
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>
```
```javascript

    // 例一
    var vm = new Vue({
        el: '#example',
        data: {
            message: 'Hello'
        },
        computed: {
            // 计算属性的 getter
            reversedMessage: function () {
                // `this` 指向 vm 实例
                return this.message.split('').reverse().join('')
            }
        }
    })

    // 例二
    var vm = new Vue({
        el: '#demo',
        data: {
            firstName: 'Foo',
            lastName: 'Bar'
        },
        computed: {
            fullName: function () {
            return this.firstName + ' ' + this.lastName
            }
        }
    })
```

#### 3.2 计算属性缓存 vs 方法

> 你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：

```html
    <p>Reversed message: "{{ reversedMessage() }}"</p>
```

```javascript
    // 在组件中
    methods: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        }
    }
```
我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。
然而，不同的是计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们
才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性
会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：

```javascript
    computed: {
        now: function () {
            return Date.now()
        }
    }
```

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。

#### 3.3 计算属性的setter

```javascript
    // ...
    computed: {
        fullName: {
            // getter
            get: function () {
            return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
            }
        }
    }
```

#### 3.4 侦听器

```html
    <div id="watch-example">
        <p>
            Ask a yes/no question:
            <input v-model="question">
        </p>
        <p>{{ answer }}</p>
    </div>
```
```javascript
    var watchExampleVM = new Vue({
        el: '#watch-example',
        data: {
            question: '',
            answer: 'I cannot give you an answer until you ask a question!'
        },
        watch: {
            // 如果 `question` 发生改变，这个函数就会运行
            question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
            }
        },
        created: function () {
            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
            // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
            // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
            // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
            // 请参考：https://lodash.com/docs#debounce
            this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        },
        methods: {
            getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-)'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
                })
            }
        }
    })
```

### 4、Class 与 Style 绑定

#### 4.1 class

> v-bind:class 指令也可以与普通的 class 属性共存。当有如下模板:

```html 
    <div
        class="static"
        v-bind:class="{ active: isActive, 'text-danger': hasError }"
    ></div>
```

> 我们也可以在这里绑定一个返回对象的计算属性。这是一个常用且强大的模式：

```html 
    <div v-bind:class="classObject"></div>
```

```javascript
    data: {
        isActive: true,
        error: null
    },
    computed: {
        classObject: function () {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            }
        }
    }
```

> 数组语法

```html
    <div v-bind:class="[activeClass, errorClass]"></div>
```

```javascript
    data: {
        activeClass: 'active',
        errorClass: 'text-danger'
    }
```

### 5、条件渲染

```shell
    v-if
    v-else-if
    v-else
    v-show 不支持 <template> 元素，也不支持 v-else。
```

<p style="color: red">不推荐同时使用 v-if 和 v-for</p>

### 6、列表渲染

```html
    <!-- 渲染对象 -->
    <div v-for="(value, key, index) in object">
        {{ index }}. {{ key }}: {{ value }}
    </div>
```

<p style="color: red">不要使用对象或数组之类的非原始类型值作为 v-for 的 key。
用字符串或数类型的值取而代之。</p>

### 7、修饰符

#### 7.1 事件修饰符

```shell
    .stop
    .prevent
    .capture
    .self
    .once
    .passive
```

```html
    <!-- 阻止单击事件继续传播 -->
    <a v-on:click.stop="doThis"></a>

    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>

    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat"></a>

    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>

    <!-- 添加事件监听器时使用事件捕获模式 -->
    <!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
    <div v-on:click.capture="doThis">...</div>

    <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
    <!-- 即事件不是从内部元素触发的 -->
    <div v-on:click.self="doThat">...</div>

    <!-- 点击事件将只会触发一次 -->
    <a v-on:click.once="doThis"></a>

    <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
    <!-- 而不会等待 `onScroll` 完成  -->
    <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <div v-on:scroll.passive="onScroll">...</div>
```

#### 7.2 按键修饰符

```shell
    .enter
    .tab
    .delete (捕获“删除”和“退格”键)
    .esc
    .space
    .up
    .down
    .left
    .right
```

#### 7.3 双向绑定的修饰符

```html
    <!-- 在“change”时而非“input”时更新 -->
    <input v-model.lazy="msg" >

    <!-- 这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。
    如果这个值无法被 parseFloat() 解析，则会返回原始的值。 -->
    <input v-model.number="age" type="number">
    
    <!-- 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符： -->
    <input v-model.trim="msg">
```


### 7、 Prop

```shell
注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，
在子组件中改变这个对象或数组本身将会影响到父组件的状态。
```

### 8、provide / inject

```javascript
    // provide 选项允许我们指定我们想要提供给后代组件的数据/方法。
    provide: function () {
        return {
            getMap: this.getMap
        }
    }
    inject: ['getMap']
```