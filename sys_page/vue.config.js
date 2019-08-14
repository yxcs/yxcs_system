// const path = require('path');
// const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionWebpackPlugin = require('compression-webpack-plugin')  //Gzip

module.exports = {
  publicPath: '/',
  // css: {
  //   // 是否使用css分离插件 ExtractTextPlugin
  //   extract: false,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {},
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },
	productionSourceMap: false,
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
  },
  chainWebpack: (config) => {
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
  }
}