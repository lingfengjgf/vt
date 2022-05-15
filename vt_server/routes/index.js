const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

//查询轮播图信息
router.get("/carousel",(req,res)=>{
    var sql="SELECT c.bookId,b.title,b.author,b.price,b.pic,b.intro FROM vt_carousel_item c,vt_books b WHERE c.bookId=b.bid AND b.isSale=1 ";
    sql+=" ORDER BY c.sort"
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var output=[];
        if(result.length>0){
            output=result;
        }
        res.send({code:1,output:result});
    });
})

//查询1楼导航信息
router.get("/publishTop",(req,res)=>{
    var sql='SELECT t.label FROM vt_publish_top t';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var output=[];
        if(result.length>0){
            output=result;
        }
        res.send({code:1,output:result});
    });
})

//查询1楼书籍信息
router.get("/publishBooks",(req,res)=>{
    var sql='SELECT p.bookId,b.title,b.author,b.price,b.pic,b.intro FROM vt_publish p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var output=[];
        if(result.length>0){
            output=result;
        }
        res.send({code:1,output:result});
    });
})

//查询1楼热销排行
router.get("/publishBest",(req,res)=>{
    var sql='SELECT p.bookId,b.title,b.author,b.watch,b.price,b.pic FROM vt_publish_best p,vt_books b WHERE p.bookId=b.bid ';
    sql+=' ORDER BY p.sort LIMIT 0,10';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var output=[];
        if(result.length>0){
            output=result;
        }
        res.send({code:1,output:result});
    })
})
module.exports=router;