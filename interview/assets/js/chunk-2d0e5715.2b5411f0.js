(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5715"],{9503:function(s,a,t){"use strict";t.r(a);var r=function(){var s=this,a=s.$createElement;s._self._c;return s._m(0)},n=[function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("section",[t("h1",[s._v("一、原生实现的方法")]),t("blockquote",[t("p",[s._v("call 实现方法")])]),t("p",[s._v("实现思路：")]),t("ul",[t("li",[s._v("不传入第一个参数，那么默认为 window")]),t("li",[s._v("改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？")])]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Function")]),s._v(".prototype.myCall = "),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("context")]),s._v(") ")]),s._v("{\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" context = context || "),t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v("\n  context.fn = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 将 context 后面的参数取出来")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" args = [...arguments].slice("),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" result = context.fn(...args)\n  "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 删除 fn")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("delete")]),s._v(" context.fn\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" result\n}\n"),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 测试")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" x = "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(";\n"),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("f")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("y,z")]),s._v(") ")]),s._v("{\n    "),t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("console")]),s._v(".log("),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".x + y+ z)\n}\n"),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" obj = {\n    "),t("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("x")]),s._v(": "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("\n}\nf.myCall(obj, "),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("2")]),s._v(","),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("3")]),s._v("); "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 1+2+3=6")]),s._v("\n")])]),t("blockquote",[t("p",[s._v("apply 实现方法")])]),t("ul",[t("li",[s._v("apply 实现思路和call差不多，只是在处理传入第二参数不同")])]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Function")]),s._v(".prototype.myApply = "),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("context")]),s._v(") ")]),s._v("{\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" context = context || "),t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("window")]),s._v("\n  context.fn = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" result\n  "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 需要判断是否存储第二个参数")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 如果存在，就将第二个参数展开")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("arguments")]),s._v("["),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("]) {\n    result = context.fn(...arguments["),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("])\n  } "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n    result = context.fn()\n  }\n\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("delete")]),s._v(" context.fn\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" result\n}\n")])]),t("blockquote",[t("p",[s._v("bind 实现方法")])]),t("pre",{pre:!0},[t("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Function")]),s._v(".prototype.myBind = "),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),t("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("context")]),s._v(") ")]),s._v("{\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("typeof")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(" !== "),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'function'")]),s._v(") {\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("throw")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("TypeError")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v("'Error'")]),s._v(")\n  }\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" _this = "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" args = [...arguments].slice("),t("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(")\n  "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 返回一个函数")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-function"}},[t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("F")]),s._v("("),t("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n    "),t("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 因为返回了一个函数，我们可以 new F()，所以需要判断")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("instanceof")]),s._v(" F) {\n      "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" _this(...args, ...arguments)\n    }\n    "),t("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" _this.apply(context, args.concat(...arguments))\n  }\n}\n")])])])}],e=t("2877"),l={},p=Object(e["a"])(l,r,n,!1,null,null,null);a["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0e5715.2b5411f0.js.map