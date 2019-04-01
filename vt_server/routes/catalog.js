const express=require("express");
const pool=require('../pool.js');
const router=express.Router();

router.get('/',(req,res)=>{
    var bid=parseInt(req.query.bid);
    if(!bid){
        res.send({code:-1,msg:"请提供书籍id"});
        return;
    }
    var sql='SELECT title,author,label,words,catalogs FROM vt_books ';
    sql+=' WHERE bid=?';
    pool.query(sql,bid,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result})
    })
})

module.exports=router;