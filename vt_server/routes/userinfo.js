const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.get("/",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var sql='SELECT pic FROM vt_avatar';
    var uid=req.session.uid;
    var progress=0;
    var output={};
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        progress++;
        output.avatar=result;
        if(progress==3)
            res.send(output);
    })
    var sql='SELECT pic FROM vt_bg';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        progress++;
        output.bg=result;
        if(progress==3)
            res.send(output);
    })
    var sql='SELECT uname,email FROM vt_user WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        progress++;
        output.info=result;
        if(progress==3)
            res.send(output);
    })
});

//修改用户信息
router.post("/set",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var e=req.body.email;
    var u=req.body.uname;
    var a=req.body.avatar;
    var b=req.body.bg;
    var sql='UPDATE vt_user SET avatar=?,bg=? ';
    if(u){
        sql+=',uname="'+u+'"';
    }
    if(e){
        sql+=',email="'+e+'"';
    }
    sql+=' WHERE uid='+uid;
    pool.query(sql,[a,b],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改成功'})
        }
    })
})

//基本信息
router.get("/info",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var sql='SELECT phone,email FROM vt_user WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })   
})

//用户阅读章节信息
router.get("/readed",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var bid=parseInt(req.query.bid);
    var sql="SELECT readed FROM vt_bookshelf WHERE uid=? AND bookId=?";
    pool.query(sql,[uid,bid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

module.exports=router;