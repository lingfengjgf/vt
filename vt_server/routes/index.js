const express=require('express');
const pool=require('../pool.js');
const router=express.Router();
router.get("/",(req,res)=>{
    //查询轮播图信息
    var output={};
    var progress=0; //sql执行进度
    var sql="SELECT c.bookId,b.title,b.pic,b.intro FROM vt_carousel_item c,vt_books b WHERE c.bookId=b.bid";
    pool.query(sql,(err,result)=>{
        if(err) console.log(err);
        output.casels=result;
        progress+=1;
        if(progress==4)
            res.send(output);
    });
    //查询1楼导航信息
    var sql='SELECT t.label FROM vt_publish_top t';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.pubTop=result;
        progress+=1;
        if(progress==4)
            res.send(output);
    });
    //查询1楼书籍信息
    var sql='SELECT p.bookId,b.title,b.author,b.pic,b.intro FROM vt_publish p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.pubBooks=result;
        progress+=1;
        if(progress==4)
            res.send(output);
    });
    //查询1楼热销排行
    var sql='SELECT p.bookId,b.title,b.author,b.watch,b.pic FROM vt_publish_best p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort LIMIT 0,10';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.bestRank=result;
        progress+=1;
        if(progress==4)
            res.send(output);
    })
})
module.exports=router;