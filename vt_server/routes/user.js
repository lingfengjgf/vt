const express=require('express');
//引入连接池对象
const pool=require('../pool.js');

//创建路由器
var router=express.Router();

//添加路由

//用户登录
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var sql='select upwd from vt_user where uname=?';
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length==0){
			res.send('0');
		}else if(result[0].upwd===$upwd){
			res.send('1');
		}else{
			res.send('2');
		};
	});
});

//用户注册
router.post('/register',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var sql='INSERT INTO vt_user(uid,uname,upwd) VALUES(NULL,?,?)';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.affectdeRows==0){
			res.send('0');
		}else{
			res.send('1');
		}
	});
});

//查询用户表
router.get('/list',(req,res)=>{
	var sql="select * from vt_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

//导出路由器
module.exports=router;