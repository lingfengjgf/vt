module.exports = {
  publicPath :process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: false,
  devServer: {
    host:"127.0.0.1",
    port:8080,
    open:true,
    proxy:{
      '^/api':{
          target:'http://127.0.0.1:3000',
          secure:false,
          changeOrigin:true,
          pathRewrite:{
              '^/api':''
          }
      }
    }
  }
}