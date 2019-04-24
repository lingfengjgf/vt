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
        progress++;
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

    var sql='SELECT p.bookId,b.title,b.author,b.watch,b.pic,b.intro FROM ';
    sql+='vt_publish_best p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort LIMIT 0,3';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.best=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })

    var sql='SELECT p.bookId,b.title,b.author,b.watch,b.pic,b.intro FROM ';
    sql+='vt_publish_new p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort LIMIT 0,3';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.new=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })

    var sql='SELECT p.bookId,b.title,b.author,b.watch,b.pic,b.intro FROM ';
    sql+='vt_publish_recommend p,vt_books b WHERE p.bookId=b.bid ORDER BY p.sort LIMIT 0,3';
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
    var progress=0;
    var sql="SELECT c.label FROM vt_classify c WHERE c.cname='频道' ";
    sql+=" AND c.label!='全部'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.channel=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    });
        
    var sql="SELECT c.label FROM vt_classify c WHERE c.cname='类型' ";
    sql+=" AND c.label!='全部'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.genre=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    });

    var sql="SELECT c.label FROM vt_classify c WHERE c.cname='其它' ";
    sql+=" AND c.label!='全部'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.others=result;
        progress+=1;
        if(progress==3)
            res.send(output);
    });

})

router.get('/rank',(req,res)=>{
    var output={};
    var progress=0;
    var sql='SELECT title FROM vt_wx_rankTopNav';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.topNav=result;
        progress++;
        if(progress==5)
            res.send(output);
    })

    var sql='SELECT title FROM vt_wx_rankLeftNav';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.leftNav=result;
        progress++;
        if(progress==5)
            res.send(output);
    })

    var sql='SELECT t.bookId,b.title,b.author,b.pic,b.watch,b.label FROM vt_publish_best t,vt_books b WHERE b.bid=t.bookId ORDER BY t.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.bests=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })
    var sql='SELECT n.bookId,b.title,b.author,b.pic,b.watch,b.label FROM vt_publish_new n,vt_books b WHERE b.bid=n.bookId ORDER BY n.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.news=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })
    var sql='SELECT r.bookId,b.title,b.author,b.pic,b.watch,b.label FROM vt_publish_recommend r,vt_books b WHERE b.bid=r.bookId ORDER BY r.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.recs=result;
        progress+=1;
        if(progress==5)
            res.send(output);
    })
})

router.get('/free',(req,res)=>{
    var sql='SELECT bid,title,author,words,pic,intro,label FROM vt_books ';
    sql+='WHERE label LIKE "%免费%"';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

router.get('/best',(req,res)=>{
    var sql='SELECT b.bid,b.title,b.author,b.words,b.pic,b.intro,b.label ';
    sql+=' FROM vt_publish_best t,vt_books b ';
    sql+=' WHERE b.bid=t.bookId ORDER BY t.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

router.get('/new',(req,res)=>{
    var sql='SELECT b.bid,b.title,b.author,b.words,b.pic,b.intro,b.label ';
    sql+=' FROM vt_publish_new t,vt_books b ';
    sql+=' WHERE b.bid=t.bookId ORDER BY t.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

router.get('/rec',(req,res)=>{
    var sql='SELECT b.bid,b.title,b.author,b.words,b.pic,b.intro,b.label ';
    sql+=' FROM vt_publish_recommend t,vt_books b ';
    sql+=' WHERE b.bid=t.bookId ORDER BY t.sort';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

router.get('/searchTags',(req,res)=>{
    var output={},progress=0;
    var sql='SELECT title FROM vt_books ORDER BY watch  DESC';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.title=result;
        progress++;
        if(progress==3)
            res.send(output)
    })
    var sql='SELECT author FROM vt_books ORDER BY watch  DESC';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.author=result;
        progress++;
        if(progress==3)
            res.send(output)
    })
    var sql='SELECT label FROM vt_books ORDER BY watch  DESC';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.label=result;
        progress++;
        if(progress==3)
            res.send(output)
    })
})
module.exports=router;