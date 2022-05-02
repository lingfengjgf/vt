module.exports = {
  productionSourceMap: false,
  devServer: {
    host:"127.0.0.1",
    port:8080,
    open:true,
    proxy:{
      '^/api':{
          target:'http://localhost:3000',
          secure:false,
          changeOrigin:true,
          pathRewrite:{
              '^/api':''
          }
      }
    }
  }
}