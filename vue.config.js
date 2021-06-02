module.exports = {
  devServer: {
    proxy: {
      '/api': { // 访问路径，可以自己设置，
        target: 'http://192.168.1.5/shop/admin', // 代理接口，即后端运行所在的端口
        // target:'http://shoptest.5laoye.com/admin',
        changeOrigin: true, // 设置是否跨域
        ws: true,
        pathRewrite: { // 访问路径重写
          '^/api': ''
        }
      }
    }
  }
}
