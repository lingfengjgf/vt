const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.post("/book",(req,res)=>{
    var bid=req.body.bid;
    var output={};
    var progress=0;
    if(!req.session.uid){
        progress++;
    }else{
        var uid=req.session.uid;
        var sql="SELECT readFontF,readFontS,readBg FROM vt_user WHERE uid=?";
        pool.query(sql,uid,(err,result)=>{
            if(err) throw err;
            output.readSet=result;
            progress++;
            if(progress==2){
                res.send(output);
            }
        })
    }
    if(!bid){
        res.send({code:-1,msg:"请提供书籍id"});
        return;
    }
    var sql='SELECT title,catalogs,texts FROM vt_books WHERE bid=?';
    pool.query(sql,bid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            output.book=result;
            progress++;
            if(progress==2){
                res.send(output);
            }
        }else{
            res.send({code:-1,msg:"没有找到相关书籍"});
        }
    })
})

router.post("/pageSet",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var readed=parseInt(req.body.readed);
    var bid=parseInt(req.body.bid);
    var sql="SELECT sid FROM vt_bookshelf WHERE uid=? AND bookId=?";
    pool.query(sql,[uid,bid],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({code:-1,msg:'书架中还没有这本书'})
        }else{
            var sql='UPDATE vt_bookshelf SET readed=? WHERE uid=? AND bookId=?';
            pool.query(sql,[readed,uid,bid],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:'修改成功'})
                }
            })
        }
    })
})

//获取用户阅读设置
router.get('/getReadSet',(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var sql="SELECT readFontF,readFontS,readBg FROM vt_user WHERE uid=?";
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        res.send(result);

    })
})

//修改字体大小
router.post('/size',(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;    
    var fontS=req.body.fontS;
    var sql='UPDATE vt_user SET readFontS=? WHERE uid=?';
    pool.query(sql,[fontS,uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改成功'})
        }else{
            res.send({code:-1,msg:'未修改'})
        }        
    })
})

//修改字体样式
router.post('/family',(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;    
    var fontF=req.body.fontF;
    var sql='UPDATE vt_user SET readFontF=? WHERE uid=?';
    pool.query(sql,[fontF,uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改成功'})
        }else{
            res.send({code:-1,msg:'未修改'})
        }        
    })
})

//修改背景
router.post('/bg',(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;    
    var bg=req.body.bg;
    var sql='UPDATE vt_user SET readBg=? WHERE uid=?';
    pool.query(sql,[bg,uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'修改成功'})
        }else{
            res.send({code:-1,msg:'未修改'})
        }        
    })
})

module.exports=router;