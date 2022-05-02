const express=require('express');
const pool=require('../pool.js');
const router=express.Router();
router.post("/",(req,res)=>{
    var output={};
    var progress=0; //sql执行进度
    var sql="SELECT c.label FROM vt_classify c WHERE c.cname='频道'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.channel=result;
        progress+=1;
        if(progress==4)
            res.send(output);
    });
    var sql="SELECT c.label FROM vt_classify c WHERE c.cname='类型'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.genre=result;
        progress+=1;
        if(progress==4)
            res.send(output);
    });
    var sql="SELECT c.label FROM vt_classify c WHERE c.cname='其它'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.others=result;
        progress+=1;
        if(progress==4)
            res.send(output);
    });
    var pno=parseInt(req.body.pno);
    var pageSize=parseInt(req.body.pageSize);
    var order=req.body.order;
    var label=req.body.label;
    var sql='SELECT bid,title,author,watch,pic,intro FROM vt_books';
    if(label){
        label=label.split(/\s+/);
        var arr=label.map(function(){
            return " label like ? ";
          })
        var str=arr.join(" and ");
        sql+=' WHERE '+str;
        label.forEach(function(val,i,arr){
            label[i]=`%${val}%`;
          })
    }
    
    if (!pno) pno=0;
    if(!pageSize) pageSize=9;
    if(!order||order==0){
        sql+=' ORDER BY watch DESC' ;
    }else{
        sql+=' ORDER BY bid DESC' ;
    }
    pool.query(sql,label,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var count=result.length;
            var pageCount=Math.ceil(count/pageSize);
            var books=result.slice(pno*pageSize,pno*pageSize+pageSize);
            var content={pno,count,pageCount,books};
        }else{
            var pageCount=0;
            var books=[];
            var content={pno,pageCount,books};
        }
        output.content=content;
        progress+=1;
        if(progress==4)
            res.send(output);
    });   
})

router.post('/search',(req,res)=>{
    var pno=parseInt(req.body.pno);
    var pageSize=parseInt(req.body.pageSize);
    var kwords=req.body.kwords;
    if (!pno) pno=0;
    if(!pageSize) pageSize=9;
    var output={};
    var sql='SELECT bid,title,author,watch,pic,intro FROM vt_books';
    if(kwords){
        kwords=kwords.split(/\s+/);
        var arr1=kwords.map(function(){
            return " title like ? ";
        })
        var arr2=kwords.map(function(){
            return " OR author like ? ";
        })
        var str1=arr1.join(" OR ");
        var str2=arr2.join(" ");
        sql+=' WHERE '+str1+str2;
        var kwordsT=kwords.map(function(val,i,arr){
            return  `%${val}%`;
        })
        var kwordsA=kwords.map(function(val,i,arr){
            return `%${val}%`;
        })
        kwords=[...kwordsA,...kwordsT];
        pool.query(sql,kwords,(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                var count=result.length;
                var pageCount=Math.ceil(count/pageSize);
                var books=result.slice(pno*pageSize,pno*pageSize+pageSize);
                output={pno,count,pageCount,books};
            }else{
                var pageCount=0;
                var books=[];
                output={pno,pageCount,books};
            }
            res.send(output);
        })
    }
})
module.exports=router;