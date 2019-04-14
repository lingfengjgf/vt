const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.get('/index',(req,res)=>{
    var output={};
    var progress=0;
    var sql='SELECT pic FROM vt_wx_casel';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.casel=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })

    var sql='SELECT p.bookId,b.title,b.pic FROM vt_publish p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.pubBooks=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    });
    
    var sql='SELECT p.bookId,b.title,b.watch,b.pic,b.intro,b.author FROM vt_publish_best p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort LIMIT 0,3';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.best=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })
    
    var sql='SELECT p.bookId,b.title,b.watch,b.pic,b.intro,b.author FROM vt_publish_new p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort LIMIT 0,3';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.new=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })

    var sql='SELECT p.bookId,b.title,b.watch,b.pic,b.intro,b.author FROM vt_publish_recommend p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort LIMIT 0,3';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.rec=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })
})

router.get('/classify',(req,res)=>{
    var output={};
    var progress=0; //sql执行进度
    var sql="SELECT label FROM vt_classify WHERE cname='频道' "
    sql+=" AND label!='全部'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.channel=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    });
    var sql="SELECT label FROM vt_classify WHERE cname='类型' "
    sql+=" AND label!='全部'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.genre=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    });
    var sql="SELECT label FROM vt_classify WHERE cname='其它' "
    sql+=" AND label!='全部'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.others=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    });
})

module.exports=router;