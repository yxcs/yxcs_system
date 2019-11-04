# 学习规划

## webpack

1. webpack 实现原理
2. webpack 简单实现 my-webpack
3. weboack loader 原理和实现
4. webpack使用实例：vue开发搭建  

## babel学习

运行流程：输入字符串 -> @babel/parser parser -> AST -> transformer[s] -> AST -> @babel/generator -> 输出字符串

1. @babel/parser 将源代码解析成 AST。
2. @babel/generator 将AST解码生 js代码。
3. @babel/core 包括了整个babel工作流，也就是说在@babel/core里面我们会使用到@babel/parser、transformer[s]、以及@babel/generator。
4. @babel/code-frame 用于生成错误信息并且打印出错误原因和错误行数。（其实就是个console工具类）
5. @babel/helpers 也是工具类，提供了一些内置的函数实现，主要用于babel插件的开发。
6. @babel/runtime 也是工具类，但是是为了babel编译时提供一些基础工具库。作用于transformer[s]阶段，当然这是一个工具库，如果要使用这个工具库，还需要引入@babel/plugin-transform-runtime，它才是transformer[s]阶段里面的主角。
7. @babel/template 也是工具类，主要用途是为parser提供模板引擎，更加快速的转化成AST
8. @babel/traverse 也是工具类，主要用途是来便利AST树，也就是在@babel/generator过程中生效。
9. @babel/types 也是工具类，主要用途是在创建AST的过程中判断各种语法的类型。

## AST抽象语法树

抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。
和抽象语法树相对的是具体语法树（concrete syntaxtree），通常称作分析树（parse tree）。
一般的，在源代码的翻译和编译过程中，语法分析器创建出分析树。一旦AST被创建出来，在后续的处理过程中，比如语义分析阶段，会添加一些信息。

## PWA

1. vue-cli
2. lavas

## 登录验证

1. OAuth2
2. token

## 性能检测

1. webhintio

## TypeScript

1. 原理和应用
2. flow

## Svelte

## English

## npm插件开发

## 小说
