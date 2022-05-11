const express=require("express");
const pool=require('../pool.js');
const router=express.Router();

router.post('/',(req,res)=>{
    var bid=parseInt(req.body.bid);
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

router.post('/vip',(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"登录失效，请重新登录！"});
        return;
    }
    var uid=req.session.uid;
    var bid=req.body.bid; 
    var output={};
    var progress=0;
    var sql="SELECT isVIP FROM vt_user WHERE uid=?";
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        output.isVIP=result[0].isVIP;
        progress++;
        if(progress==2)
            res.send(output);
    })
    var sql='SELECT isBuy FROM vt_bookshelf WHERE uid=? AND bookId=?';
    pool.query(sql,[uid,bid],(err,result)=>{
        if(err) throw err;
        output.isBuy=result[0].isBuy;
        progress++;
        if(progress==2)
            res.send(output);
    })
})

module.exports=router;