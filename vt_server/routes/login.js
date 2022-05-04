const express=require('express');
const pool=require('../pool');
const router=express.Router();

router.post('/',(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    if(!uname){
        res.send({code:-1,msg:'用户名不能为空'});
    }else if(!upwd){
        res.send({code:-1,msg:'密码不能为空'});
    }else{
        var sql="SELECT uid,uname,avatar,bg FROM vt_user WHERE "
        sql+=" uname=? AND upwd=md5(?)";
        pool.query(sql,[uname,upwd],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                var uid=result[0].uid;
                req.session.uid=uid;               
                //console.log(uid,req.session.uid);
                res.send({code:1,msg:'登录成功',data:result[0]});
            }else{
                var sql="SELECT uid,uname,avatar,bg FROM vt_user WHERE "
                sql+=" phone=? AND upwd=md5(?)";
                pool.query(sql,[uname,upwd],(err,result)=>{
                    if(err) throw err;
                    if(result.length>0){
                        var uid=result[0].uid;
                        req.session.uid=uid;               
                        // console.log("login uid:",req.session.uid);
                        res.send({code:1,msg:'登录成功',data:result[0]});
                    }else{
                        res.send({code:-1,msg:'用户名或密码错误'});            
                    }
                })
            }
        })
    }
})

//注销登陆
router.get("/logout",(req,res)=>{
    delete req.session.uid;
    res.send({code:1,msg:"已注销"});
})

module.exports=router;