### 前言

趁着工作闲暇，自己写了一套博客的系统，前端展示页面使用vue写的，用了ElementUI，因为在公司就是用的这一套。而实际上ElementUI在这个博客里并没有什么用，反而让打包出来的文件很大。  
我写好了博客的基本功能，发到了服务器上，浏览器打开博客，然后博客页面就一直在那加载中，过了10几20秒，才显露出页面，图片还在慢慢的加载中。我擦，这也太慢了吧。  
我用的是百度云服务器，在买之前就听人说过，会比其他的服务器慢，但是比较便宜。没想到这么慢，一分钱一分货啊。
但是，即使服务器再慢也不可能十多秒才加载一个那么简单的网页，所以查看了下网页加载的时间线，发现首屏加载的东西太多了，把所有的东西都下载下来的了，而且有的打包后的文件，特别大，有1M、2M吧。
所以要优化vue的加载了。

### 问题分析
- 图片存放在服务器上，加载速度过慢
- 单页面应用在第一次加载的时候，会把所有css和js都下载下来  
- ElementUI组件是全局加载的，大部分功能都没有用到，但是打包的时候也会被打包进来
- vue-cli3中的配置会让页面预加载其他页面的脚本
- 网速过慢，导致加载缓慢
这些都是导致首页加载过慢的原因，接下来就一一解决这些问题

### 图片CDN存储
CDN可以加速图片等资源的上传下载速度，特别是一些比较大的图片，效果特别明显。  
同时，使用CDN可以减少对服务器的请求，减少服务器压力，毕竟服务器同时处理的请求一般在6-10条左右，过多会增加请求时间。  
我买了个七牛云的服务，后台图片直接上传到七牛，上传速度比放在服务器上快，下载也快。  

### 路由懒加载
最开始路由都是同时加载的，打包后的文件并没有按照路由来拆分，都在同一个文件里，这就导致正负文件过大，加载这个文件时，会阻塞其他的加载，同时下载的时间特别长。  
于是，就将原有的路由部分改成懒加载，即用的时候再加载。我们懒加载路由之后vue-cli的配置会自动，根据路由把文件打包出来，本来的一个大文件被拆分成了多个小文件，用到的时候只加载一部分。
大概的代码是这样的:

```javascript
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    }
  ]
})
```

### 取消默认预加载
虽然我们已经打包的时候已经把按照路由拆分了，但是打包之后更新了到服务器，发下，加载时间仍然很长，而且有些当前页面没有用的脚本也会被下载下来。  
原来是vue-cli3默认开启了，预加载功能，把其他页面的脚本也下载下来了。  
为了加快首屏加载速度，我们需要把预加载关闭掉。  
在项目根目录下新建一个vue.config.js文件，这个是vue-cli3的配置文件。  
在里边添加配置：  
```javascript
module.exports = {
  chainWebpack: config => {
    // 关闭提前加载
    config.plugins.delete('prefetch')
  }
}
```
配置好之后，打包，发到服务器上，ctrl+F5刷新之后，发现请求的脚本少了好多。  

### 减少打包无用内容
ElementUI本身比较大，我也没有用到那么多组件，常用有Form，FormItem，Input，Upload，Button，Pagination这几个，还有一个Message。  
所以在打包的时候只打包我用到的组件即可。  
首先将main.js中的ElementUI相关的代码删掉
```javascript
import ElementUI from 'element-ui'
Vue.use(ElementUI)
```
为了让webpack在打包时能够分模块导入，需要配置一下babel.config.js文件。添加plugins相关配置，主题用的是theme-chalk
```javascript
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
```
然后我们这在使用组件的地方，导入组件：
```javascript
import { Form, FormItem, Input, Upload, Button } from 'element-ui'
// ..... 省略多行代码
components: {
  'el-form': Form,
  'el-form-item': FormItem,
  'el-input': Input,
  'el-upload': Upload,
  'el-button': Button
}
// ..... 省略多行代码
<template>
 <el-input></el-input>
</template>
```
也可以全局引入一个组件，例如Message，可能每个页面都要用到，所以可以在全局单独的引用：
```javascript
import { Message } from 'element-ui'
Vue.prototype.$message = Message
// 组件中使用
this.$message.success('|`-_-`|')
```
处除了这种方式，还可以把一些单独的库，使用CDN等直接在index.html中引入，这里不做详细说明了。  

一些已知的无用的文件可以进行优化，那么怎样才能知道一些未知的文件是不是要优化那？ 这个时候就可以使用 webpack-bundle-analyzer 插件，首先安装这个插件，然后在vue.config.js中添加性能分析的插件
```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false, // 关闭sourceMap
  chainWebpack: config => {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end();
            config.plugins.delete('prefetch')
        }
    }
    // 关闭提前加载
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    let plugins = [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$',
        ),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ]
    if (process.env.NODE_ENV !== 'develop') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
```
之后运行 npm run build --report，然后我门可以在自动打开浏览器页面中看到项目打包的情况图，便于直观地比较各个bundle文件的大小，以便进行各种的分析。
另外，在浏览器中，也可以通过converge来查看代码的使用状况。   
![性能分析](http://img.oyxco.com/xingnengfenxitu.png '性能分析')  

### 关闭sourceMap
sourceMap是用来在开发中定位报错位置的，打包文件之后，上传到服务器没有必要将调试相关的东西带上去，所以更改vue.config.js文件
```javascript
module.exports = {
  productionSourceMap: false, // 关闭sourceMap
  chainWebpack: config => {
    // 关闭提前加载
    config.plugins.delete('prefetch')
  }
}
```

### Gzip压缩
通过以上的方法，已经减少了打包代码的大小了，但是上百k的文件，传输仍然需要一些时间，为此，可以开启Gzip打包时压缩。除了前端配置之外，也需要服务器进行配合。
再次更改vue.config.js文件, 记得先安装compression-webpack-plugin
```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false, // 关闭sourceMap
  chainWebpack: config => {
    // 关闭提前加载
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    let plugins = [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$',
        ),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ]
    if (process.env.NODE_ENV !== 'develop') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
```
除此之外还需要服务器开启Gzip压缩，我用的是nginx。  
首先找到nginx的配置文件 nginx.conf，然后打开，找到Gizp，取消注释。
```shell
gzip  on;
gzip_types text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
```
然后重启服务器即可: <pre>nginx -s reload</pre>

打包文件，可以看到打包之后的文件中增加了.gz压缩包  
![Gzip](http://img.oyxco.com/package.gz.png 'Gzip')  
然后将打包后的代码发到服务器，再次请求网址，在响应信息中可以看到，Content-Encoding：Gzip  
![Gzip](http://img.oyxco.com/vue-better-gzip.webp 'Gzip')  

### 好的用户体验
做了以上的优化之后，加载速度从原来的16s，到现在的1.25s左右，大大提升了加载速度，给用户以更好等体验。有兴趣的可以自己去体验一下 [博客](http://blog.oyxco.com)。  
但是，优化即使做的再好，如果网络不行，那么用户的体验也不会好。  
可以在首页加载的时候添加一个loading动画，避免让用户看到空白的页面。当然骨架屏这类的也是可以的。  

### 最后
vue等单页面的应用，还可以使用服务器渲染等，提高加载速度，同时优化SEO，这个并是不这篇文章的重点，之后会专门写一篇文章来讲述SSR等相关内容。