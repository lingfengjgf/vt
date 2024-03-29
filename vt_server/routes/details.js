const express=require('express');

const pool=require('../pool.js');

const router=express.Router();

//查询书籍信息
router.post('/',(req,res)=>{
	var bid=parseInt(req.body.bid);
	var output={};
	var sql='SELECT title,author,label,words,price,watch,pic,intro FROM vt_books WHERE bid=?';
	pool.query(sql,[bid],(err,result)=>{
		if(err) throw err;
		output.book=result;
		var label=output.book[0].label.split('@')[1];
		label='%'+label+'%';
		var sql='SELECT bid,title,author,pic,watch FROM vt_books WHERE ';
		sql+=' label LIKE ? AND bid!=? ORDER BY watch DESC LIMIT 0,4';
		pool.query(sql,[label,bid],(err,result)=>{
			if(err) throw err;
			output.recommend=result;
			var rec=output.recommend;
			if(rec.length<4){
				var bids=[];
				var l=4-rec.length;
				for(var r of rec ){
					bids.push(r.bid);
				}
				bids.push(bid);
				var arr=bids.map(function(){
					return " bid!= ? ";
				})
				var str=arr.join(" and ");
				var sql='SELECT bid,title,author,pic,watch FROM vt_books WHERE '
				sql+=str+' ORDER BY watch DESC LIMIT 0,?';
				pool.query(sql,[...bids,l],(err,result)=>{
					if(err) throw err;
					output.recommend=[...rec,...result];
					res.send(output);
				})				
			}else{
				res.send(output);
			}
		})
	});
});

//查询评论信息
router.post('/comment',(req,res)=>{
	var bid=parseInt(req.body.bid);
	var pno=req.body.pno;
	//console.log(bid);
	var pageSize=req.body.pageSize;
	if(!pno){pno=0};
	if(!pageSize){pageSize=8};
	//正则验证
	var reg=/^\d{1,}$/;
	if(!reg.test(pno)){
		res.send({code:-1,msg:'页码格式不正确'})
	};
	if(!reg.test(pageSize)){
		res.send({code:-1,msg:'页大小格式不正确'})
	};
	var output={};
	var sql='SELECT c.content,c.ctime,u.uname,u.avatar FROM ';
	sql+=' vt_comments c,vt_user u WHERE u.uid=c.uid AND c.bookId=?';
	sql+=' ORDER BY c.ctime DESC'
	pool.query(sql,[bid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			var count=result.length;
            var pageCount=Math.ceil(count/pageSize);
            var comments=result.slice(pno*pageSize,pno*pageSize+pageSize);
            output={pno,count,pageCount,comments};
		}else{
            var pageCount=0;
			var comments=[];
			var count=0;
            output={count,comments,pageCount};
        }
		res.send(output);		
	})
})

//发表评论
router.post('/addCom',(req,res)=>{
    var bid=req.body.bid;
	var content=req.body.content;
	if(!req.session.uid){
        res.send({code:-888,msg:"登录失效，请重新登录！"});
        return;
    }
    var uid=req.session.uid;
    var sql='INSERT INTO vt_comments(cid,content,ctime,bookId,uid) VALUES(NULL,?,now(),?,?)';
    pool.query(sql,[content,bid,uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
            res.send({code:1,msg:'评论发表成功'});
        else
            res.send({code:-1,msg:'评论发表失败'});
    })
});

//加入书架
router.post("/addBook",(req,res)=>{
	if(!req.session.uid){
        res.send({code:-888,msg:"登录失效，请重新登录！"});
        return;
    }
	var uid=req.session.uid;
	var bid=req.body.bid;
	var sql="SELECT sid FROM vt_bookshelf WHERE uid=? AND bookId=?";
	pool.query(sql,[uid,bid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:-1,msg:"书架中已经有这本书啦!"});
		}else{
			var sql="INSERT INTO vt_bookshelf(sid,bookId,uid,readed,isBuy) VALUES(NULL,?,?,0,0)";
			pool.query(sql,[bid,uid],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows>0)
					res.send({code:1,msg:'添加成功'});
				else
					res.send({code:-1,msg:'添加失败'});
			})
		}
	})
})

module.exports=router;