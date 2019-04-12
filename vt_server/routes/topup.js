const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.get("/",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var output={};
    var progress=0;
    var sql='SELECT pay,bookCoin,give FROM vt_money';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.money=result;
        progress++;
        if(progress==3)
            res.send(output);
    })
    var sql='SELECT pay,buyTime,vipGive FROM vt_vip';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.vip=result;
        progress++;
        if(progress==3)
            res.send(output);
    })
    var sql='SELECT balance FROM vt_user WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        output.bal=result;
        progress++;
        if(progress==3)
            res.send(output);        
    })
})

module.exports=router;