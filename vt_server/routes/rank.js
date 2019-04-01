const express=require('express');
const pool=require('../pool.js');
const router=express.Router();

router.get('/',(req,res)=>{
    var output={};
    var sql='SELECT t.bookId,b.title,b.author,b.pic,b.watch,b.intro,b.label FROM vt_publish_best t,vt_books b WHERE b.bid=t.bookId ORDER BY t.sort';
    var progress=0;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.best=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    })
    var sql='SELECT n.bookId,b.title,b.author,b.pic,b.watch,b.intro,b.label FROM vt_publish_new n,vt_books b WHERE b.bid=n.bookId ORDER BY n.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.new=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    })
    var sql='SELECT r.bookId,b.title,b.author,b.pic,b.watch,b.intro,b.label FROM vt_publish_recommend r,vt_books b WHERE b.bid=r.bookId ORDER BY r.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.recommend=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    })
})

module.exports=router;