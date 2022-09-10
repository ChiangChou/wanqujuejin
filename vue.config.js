const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    open:false,
    host:'127.0.0.1',
    port:8080,
    hot:true,
    proxy: {
        '/api': {
          target:'http://127.0.0.1:8000', // 你请求的第三方接口
          changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRewrite:{  // 路径重写，
            '^/api': ''  
          }
        }
    },  
},
})
