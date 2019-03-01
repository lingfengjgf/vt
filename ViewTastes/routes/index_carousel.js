const express=require('express');
const pool=require('../pool.js');
const router=express.Router();
router.get("/",(req,res)=>{
    var pno=parseInt(req.query.pno);
    var sql="select * from vt_carousel_item limit ?,4";
    pool.query(sql,[pno],(err,result)=>{
        if(err) console.log(err);

        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
          });
          res.write(JSON.stringify(result));
          res.end();
    })
})
module.exports=router;