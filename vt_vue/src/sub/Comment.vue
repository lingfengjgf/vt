<template>
    <div>
        <div class="comment">
            <ul class="list-unstyled show">
                <li>书评
                    <span>共{{comCount}}条</span>
                </li>
                <li v-for='c of comments'>
                    <div>
                        <img :src="`http://localhost:3000${c.avatar}`">
                    </div>
                    <div>
                        <div>
                            <span class="user">{{c.uname}}</span>
                            <span class="time">{{c.ctime|datetimeFilter}}</span>
                        </div>
                        <p>{{c.content}}</p>
                    </div>
                </li>
                <div class="noCom" :class='{show:showNoCom}'>还没有评论，快来说两句吧！</div>
            </ul>
            <div class="getMore" :class='{hide:comCount<9||pageIndex>=pageCount}'>
                <a @click='getMore' href="javascript:;">查看更多</a>
            </div>
            <div class="addComment">
                <h5>我也要说</h5>
                <textarea v-model='fCount' name="say" ref="count" maxlength="300"></textarea>
                <span :class='{fontRed:fontCount>=300}'>{{fontCount}}/300</span>
                <a @click='addCom' href="javascript:;">发表评论</a>
            </div>
        </div>
        <div @click='close' class="dialog" v-show='isLogin'>
            <div class='mask'>
                <p>您还没有登录哦！</p>
                <router-link class="login" to="/login">立即登陆>></router-link>
                <a class="close" @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {addCom,commentInfo} from '../api/details'
export default {
    inject:['reload'],
    props:["bid"],
    data() {
        return {
            comments:[],
            comCount:0,
            fontCount:0,
            fCount:'',
            showNoCom:false,
            isLogin:false,
            pageIndex:0,
            pageSize:8, //页大小
            pageCount:0 //总页数 
        }
    },
    created() {
        this.getMore();
        //console.log(this.bid);
    },
    watch: {
        fCount(){
            var textLen = this.$refs.count.value.length;
            this.fontCount=textLen;
            //console.log(textVal);
        }
    },
    methods: {
        addCom(){
            if(this.$store.getters.optIsLogin==0){
                this.isLogin=true;
                return;
            }
            var content = this.$refs.count.value;
            var bid=this.bid;
            //去除评论两端空格
            var size=textVal.trim().length;
            //判断评论内容是否为空
            if(size==0){
                return;
            }
            //创建postData保存评论内容
            var postData={
                bid,
                content
            };            
            //发送post请求
            addCom(postData).then(result=>{
                //接收返回数据
                //评论成功/失败后提示信息
                if(result.data.code==1){
                    this.fCount=''; //清空发表内容
                    this.fontCount=0; //清空计数器
                    this.pageIndex=0;  //清空页码
                    this.comments=[];//清空原有数据
                    this.getMore();
                }
            });
        },
        getMore(){
            var bid=this.bid;
            var pno=this.pageIndex;
            var pageSize=this.pageSize;
            var params={bid,pno,pageSize}
            commentInfo(params).then(res=>{
                this.comments=[...this.comments,...res.data.comments];
                if(this.comments.length==0){
                    this.showNoCom=true;
                }
                this.comCount=res.data.count;
                this.pageCount=res.data.pageCount;
                if(this.pageCount>=this.pageIndex){
                    //当前页码自增
                    this.pageIndex++;
                } 
            })
        },
        close(){
            this.isLogin=false;
            this.fCount='';
            this.fontCount=0;
            this.reload();
        },
    },
}
</script>

<style scoped>
    div.comment{
        background: #fff;
    }
    div.comment{
        padding: 20px;
        width: 800px;
        box-sizing: border-box;
    }
    div.comment>ul.show>li{
        font-size: 22px;
        color: #0083ec;
        padding: 10px;
        border-bottom: 1px dotted #ddd;
    }
    div.comment>ul.show>li+li{
        display: flex;
    }
    div.comment>ul.show>li>span{
        font-size: 14px;
        color: #888;
        margin-left: 10px;
    }
    div.comment>ul.show>li>div>p{
        font-size: 16px;
    }
    div.comment>ul.show>li>div+div{
        margin-left: 10px;
        width: 100%;
    }
    div.comment>ul.show>li>div>img{
        width: 60px;
    }
    div.comment>ul.show>li>div>div{
        width: 100%;
        margin-bottom: 5px;
    }
    div.comment>ul.show>li>div>div>span.user{
        color: rgb(248, 88, 88);
    }
    div.comment>ul.show>li>div>div>span.time{
        color: #888;
        font-size: 14px;
        float: right;
    }
    div.comment>ul.show>div.noCom{
        display: none;
        text-align: center;
        width: 100%;
        height: 200px;
        line-height: 200px;
        font-size: 20px;
    }
    div.comment>ul.show>div.noCom.show{
        display: block;
    }
    div.comment>div.getMore{
        text-align: center;
        margin-top: 20px;
    }
    div.comment>div.getMore.hide{
        display: none;
    }
    div.comment>div.addComment{
        position: relative;
    }
    div.comment>div.addComment>span{
        position: absolute;
        bottom: 10px;
        right: 5px;
        font-size: 12px;
        color: #888;
    }
    div.comment>div.addComment>span.fontRed{
        color: red;
    }
    div.comment>div.addComment{
        margin: 40px 0;
    }
    div.comment>div.addComment>h5{
        font-size: 20px;
        margin-bottom: 10px;
    }
    div.comment>div.addComment>textarea{
        width: 100%;
        resize:none;
        height: 155px;
        font-size: 16px;
        padding: 10px;
        box-sizing: border-box;
    }

    div.comment>div.addComment>a{
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
        background: #0083ec;
        color: #fff;
        float: right;
        margin: 0px;
    }
    div.comment>div.addComment>a:hover{
        background: #0366ee;
        color: #fff !important;
    } 
    div>div.dialog{
        position: fixed;
        margin: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
    }
    div>div.dialog>div.mask{
        width: 400px;
        height: 150px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        text-align: center;
        font-size: 18px;
        color: #000;
    }
    div>div.dialog>div.mask>p{
        margin-top: 47px;
        margin-bottom: 10px;
    }
    div>div.dialog>div.mask>a.login{
        color: #0083ec;
    }
    div>div.dialog>div.mask>a.close{
        position: absolute;
        top: 10px;
        right:20px;
        display:block;
        width:20px;
        height:20px;
    }
    div>div.dialog>div.mask>a.close>span{
        font-size: 32px;
    }    
</style>