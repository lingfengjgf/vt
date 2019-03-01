const express=require('express');
const pool=require('../pool.js');

var router=express.Router();
router.get('/index_data',(req,res)=>{
	var sql='SELECT * FROM vt_site_info';
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
module.exports=router;