//引入模块
const express=require("express");
const mysql=require('mysql');
//引入路由器
const userRouter=require('./routes/user.js');
const dataRouter=require('./routes/index_data.js');
const bookRouter=require('./routes/book.js');
const indexCarouselRouter=require('./routes/index_carousel.js');
//引入body-parser中间件
const bodyParser=require('body-parser');

//创建服务器
var app=express();
app.listen(3000);

//托管静态资源
app.use(express.static('vt'));
app.use(express.static('vt/html'));

//使用body-parser中间件来将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
	extended:false   //不使用扩展的模块
}));

//路由器挂载
app.use('/user',userRouter);
app.use('/index_data',dataRouter);
app.use('/book',bookRouter);
app.use('/index',indexCarouselRouter);