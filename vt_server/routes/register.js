const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.post('/',(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var email=req.body.email;
    var phone=req.body.phone;
    if(!uname||!upwd||!email||!phone){
        return;
    }
    var sql='INSERT INTO vt_user(uid,uname,upwd,email,phone,avatar,bg) VALUES'
    sql+=' (NULL,?,md5(?),?,?,"/img/user/icon/default.png","/img/user/bg/bg.jpg")';
    pool.query(sql,[uname,upwd,email,phone],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'注册成功'});
        }else{
            res.send({code:-1,msg:'注册失败'});
        }
    })
})

router.post('/checkUname',(req,res)=>{
    var uname=req.body.uname;
    if(!uname) return;
    var sql='SELECT uid FROM vt_user WHERE uname=?';
    pool.query(sql,uname,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:-1,msg:'该昵称已注册'});
        }else{
            res.send({code:1,msg:'昵称可用'});
        }
    })
})

router.post('/checkEmail',(req,res)=>{
    var email=req.body.email;
    if(!email) return;
    var sql='SELECT uid FROM vt_user WHERE email=?';
    pool.query(sql,email,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:-1,msg:'该邮箱已注册'});
        }else{
            res.send({code:1,msg:'邮箱可用'});
        }
    })
})

router.post('/checkPhone',(req,res)=>{
    var phone=req.body.phone;
    if(!phone) return;
    var sql='SELECT uid FROM vt_user WHERE phone=?';
    pool.query(sql,phone,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:-1,msg:'该手机号码已注册'});
        }else{
            res.send({code:1,msg:'手机号码可用'});
        }
    })
})

module.exports=router;