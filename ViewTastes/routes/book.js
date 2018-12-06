const express=require('express');

const pool=require('../pool.js');

var router=express.Router();

//查询书籍信息
router.get('/book',(req,res)=>{
	var sql='SELECT * FROM vt_book';
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});


module.exports=router;