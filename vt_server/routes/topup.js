const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.get("/",(req,res)=>{
    var output={};
    var progress=0;
    var sql='SELECT pay,bookCoin,give FROM vt_money';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.money=result;
        progress++;
        if(progress==2)
            res.send(output);
    })
    var sql='SELECT pay,buyTime,vipGive FROM vt_vip';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.vip=result;
        progress++;
        if(progress==2)
            res.send(output);
    })
})

module.exports=router;