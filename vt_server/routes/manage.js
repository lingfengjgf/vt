const express=require("express");
const pool=require("../pool.js");
const router=express.Router();

// 查询书籍列表
//isSale  0:所有 1:上架 

router.post('/bookList',(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var pno=parseInt(req.body.pno);
    var pageSize=parseInt(req.body.pageSize);
    var isSale=req.body.isSale;
    var output={};
    if (!pno) pno=0;
    if(!pageSize) pageSize=9;
    var sql='SELECT uname FROM vt_user WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql='SELECT bookId,title,author,pic,price,label,isSale FROM vt_books';
            if(isSale==1){
                sql+=" WHERE isSale=1";
            }
            pool.query(sql,(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    var count=result.length;
                    var pageCount=Math.ceil(count/pageSize);
                    var books=result.slice(pno*pageSize,pno*pageSize+pageSize);
                    output={pno,count,pageCount,books};
                    res.send({code:1,output});
                }else{
                    var pageCount=0;
                    var books=[];
                    output={pno,pageCount,books};
                    res.send({code:1,output})
                }
            })
        }else{
            res.send({code:-1,msg:'无权操作！'})
        }
    })
})

// 修改书籍信息
router.post("/setBook",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var bid=req.body.bid;
    var label=req.body.label;
    var price=req.body.price;
    var isSale=req.body.isSale;
    if(!bid){
        res.send({code:-1,msg:"请提供书籍id"});
        return;
    }
    var sql='SELECT uname FROM vt_user WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql='UPDATE vt_books SET label=? , price=? , isSale=?  WHERE bookId=?';
            pool.query(sql,[label,price,isSale,bid],(err,result)=>{
                if(err) throw err;
                if(result.affectdeRows==0){
                    res.send({code:0,msg:'修改失败，请重试！'});
                }else{
                    res.send({code:1,msg:'修改成功！'});
                }
            });
        }else{
            res.send({code:-1,msg:'无权操作！'})
        }
    })
})

// 首页轮播配置
router.post("/setBook",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var list=req.body.list;
    if(!list){
        res.send({code:-1,msg:"非法操作！"});
        return;
    }
    if(list.length>16){
        res.send({code:-1,msg:"轮播书籍最多可配置16本！"});
        return;
    }
    var sql='SELECT uname FROM vt_user WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql='TRUNCATE TABLE vt_carousel_item';
            pool.query(sql,(err,result)=>{
                if(err) throw err;
                if(result.affectdeRows>0){
                    if(list.length==0){
                        res.send({code:1,msg:"修改成功！"});
                        return;                
                    }
                    var arr=list.map(function(){
                        return ' (NULL,?) '
                    })
                    var str=arr.join(" ");
                    var sql="INSERT INTO vt_carousel_item VALUES "+str;
                    pool.query(sql,list,(err,result)=>{
                        if(err) throw err;
                        if(result.affectdeRows>0){
                            res.send({code:1,msg:"修改成功！"});
                        }else{
                            res.send({code:0,msg:'修改失败，请重试！'});
                        }
                    }); 
                }else{
                    res.send({code:0,msg:'修改失败，请重试！'});
                } 
            });            
        }else{
            res.send({code:-1,msg:'无权操作！'})
        }
    })
})

// 首页推荐书籍配置
router.post("/setIndexPublish",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"未登录"});
        return;
    }
    var uid=req.session.uid;
    var list=req.body.list;
    if(!list){
        res.send({code:-1,msg:"非法操作！"});
        return;
    }
    var sql='SELECT uname FROM vt_user WHERE uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql='TRUNCATE TABLE vt_publish';
            pool.query(sql,(err,result)=>{
                if(err) throw err;
                if(result.affectdeRows>0){
                    if(list.length==0){
                        res.send({code:1,msg:"修改成功！"});
                        return;                
                    }
                    var arr=list.map(function(){
                        return ' (NULL,?) '
                    })
                    var str=arr.join(" ");
                    var sql="INSERT INTO vt_publish VALUES "+str;
                    pool.query(sql,(err,result)=>{
                        if(err) throw err;
                        if(result.affectdeRows>0){
                            res.send({code:1,msg:"修改成功！"});
                        }else{
                            res.send({code:0,msg:'修改失败，请重试！'});
                        }
                    }); 
                }else{
                    res.send({code:0,msg:'修改失败，请重试！'});
                } 
            });            
        }else{
            res.send({code:-1,msg:'无权操作！'})
        }
    })
})

module.exports=router;