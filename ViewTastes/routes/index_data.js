const express=require('express');
const pool=require('../pool.js');

var router=express.Router();
//主页信息接口
router.get('/index_data',(req,res)=>{
	var sql='SELECT * FROM vt_site_info';
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

//轮播图、主页1#、2#、3#接口
router.get('/',(req,res)=>{
	var output={carls:{},f1:{}};
	var sql1='SELECT * FROM vt_carousel_item';
	var sql2='SELECT * FROM vt_b1f';
	pool.query(sql1,(err,result)=>{
		if(err) throw err;
		output.carls=result;
	});
	pool.query(sql2,(err,result)=>{
		if(err) throw err;
		output.f1=result;
		res.send(output);
	});
});
module.exports=router;