const express=require("express");
const pool=require("../pool.js");
const router=express.Router();

router.get("/",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-888,msg:"登录失效，请重新登录！"});
        return;
    }
    var uid=req.session.uid;
    var sql='SELECT b.bid,b.pic,b.title,b.author,b.label,s.readed,b.isSale '
    sql+=' FROM vt_books b, vt_bookshelf s WHERE ';
    sql+=' s.uid=? AND s.bookId=b.bid  ORDER BY s.sid DESC LIMIT 0,9';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result});
        }else{
            res.send({code:-1,msg:'没有找到'})
        }
    })
})

router.post("/delBook",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-888,msg:"登录失效，请重新登录！"});
        return;
    }
    var uid=req.session.uid;
    var bid=req.body.bid;
    var sql="DELETE FROM vt_bookshelf WHERE uid=? AND bookId=?";
    pool.query(sql,[uid,bid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){ //执行sql语句影响的行数
            res.send({code:1,msg:'删除成功'});
        }else{
            res.send({code:-1,msg:'删除失败'});
        }
    })
})

module.exports=router;