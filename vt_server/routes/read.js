const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.get("/",(req,res)=>{
    var bid=req.query.bid;
    if(!bid){
        res.send({code:-1,msg:"请提供书籍id"});
        return;
    }
    var sql='SELECT title,catalogs,texts FROM vt_books WHERE bid=?';
    pool.query(sql,bid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }else{
            res.send({code:-1,msg:"没有找到相关书籍"});
        }
    })
})

module.exports=router;