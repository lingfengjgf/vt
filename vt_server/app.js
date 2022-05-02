//引入模块
const express=require("express");
const session = require("express-session");
const mysql=require('mysql');
const cors=require("cors");
//引入路由器
const userRouter=require('./routes/user.js');
const dataRouter=require('./routes/index_data.js');
const details=require('./routes/details.js');
const index=require('./routes/index.js');
const classify=require('./routes/classify.js');
const rank=require('./routes/rank.js');
const login=require('./routes/login.js');
const register=require('./routes/register.js');
const bookshelf=require('./routes/bookshelf.js');
const catalog=require('./routes/catalog.js');
const read=require('./routes/read.js');
const userinfo=require('./routes/userinfo.js');
const topup=require('./routes/topup.js');
const wx=require('./routes/wx.js');
//引入body-parser中间件
const bodyParser=require('body-parser');

//创建服务器
var app=express();
// app.use(cors({
// 	origin:['http://127.0.0.1:3300','http://localhost:3300'],
// 	credentials:true
//   }))
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); // 可以带cookies
  if(req.method == 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});
app.listen(3000);

//托管静态资源
app.use(express.static('public'));

//使用body-parser中间件来将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
	extended:false   //不使用扩展的模块
}));

app.use(session({
	secret:'随机字符串',
	cookie:{maxAge:60*1000*30},//过期时间ms
	resave:false,
	saveUninitialized:true
  }));//将服务器的session，放在req.session中
  
//路由器挂载
app.use('/user',userRouter);
app.use('/index_data',dataRouter);
app.use('/details',details);
app.use('/index',index);
app.use('/classify',classify);
app.use('/rank',rank);
app.use('/login',login);
app.use('/register',register);
app.use('/bookshelf',bookshelf);
app.use('/catalog',catalog);
app.use('/read',read);
app.use('/userinfo',userinfo);
app.use('/topup',topup);
app.use('/wx',wx);

app.get('/index',(req,res)=>{
	console.log("get /index",res)
})