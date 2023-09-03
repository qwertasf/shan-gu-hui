const { defineConfig } = require('@vue/cli-service')
module.exports = {
  // transpileDependencies: true,
  lintOnSave: false, //关闭声明变量后不使用不让写
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api': ''},路径重写
      },
      // http://gmall-h5-api.atguigu.cn
    },
  },
}
