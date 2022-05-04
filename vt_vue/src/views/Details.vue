<template>
    <div class="main">
        <section>        
            <div class="top">
                <div>
                    <img :src="`${baseUrl}${book.pic}`">
                </div>
                <div class='right'>
                    <span>{{book.title}}</span>
                    <div class="bookinfor">
                        <div>
                            <span class="author">作者：{{book.author}}</span>
                            <span class="genre">类型：{{book.label}}</span>
                            <span class="words">字数：{{book.words}}万</span>
                        </div>
                        <div class="content-ul-watch">
                            <i class="iconfont eye">&#xe8c7;</i>
                            <span>{{book.watch}}</span>
                        </div>
                    </div>
                    <div class="price">价格：<span>{{book.price}}</span>书币</div>
                    <div>
                        <a @click="goRead" href="javascript:;">开始阅读</a>
                        <a @click="goCatalog" href="javascript:;">章节目录</a>
                        <a @click="addBook" href="javascript:;">加入书架</a>
                        <a href="javascript:;">购买本书</a>
                    </div>
                    <div class="intro" :class='{show:isShow||hideSpan}'>{{book.intro}}</div>
                    <a @click='showIntro' href="javascript:;" :class='{hide:hideSpan}'>
                        <span>{{span}}</span><span class='triangle' :class='{more:isShow}'></span>
                    </a>
                </div>
            </div>       
            <div class="content">
                <comment-box :bid="bid"></comment-box> 
                <div class="recommend">
                    <h5>相关推荐</h5>
                    <ul class="list-unstyled">
                        <li v-for='r of recommend' :key="r.bid">
                            <a href="javascript:;">
                                <img @click='change' :data-id="r.bid" :src="`${baseUrl}${r.pic}`">
                            </a>
                            <a href="javascript:;" @click='change' :data-id="r.bid" class="name">{{r.title}}</a>
                            <p class="author">{{r.author}}</p>
                            <div class="content-ul-watch">
                                <i class="iconfont eye">&#xe8c7;</i>
                                <span>{{r.watch}}</span>
                            </div>
                        </li>
                    </ul>        
                </div>
            </div>          
        </section>
        <div @click='close' class="dialog" v-show='isLogin'>
            <div class='mask'>
                <p>您还没有登录哦！</p>
                <router-link class="login" to="/login">立即登陆>></router-link>
                <a class="close" @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
        <div @click='close' class="dialog" v-show='isAdd'>
            <div class='mask add'>
                <p>{{addSpan}}</p>
                <a class="close" @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
//引入评论子组件
import comment from '../sub/Comment.vue'
import {detailsInfo,addBook} from '../api/details'
export default {
    inject:['reload'],
    props:['bid','readed'],
    data() {
        return {
            baseUrl:process.env.VUE_APP_IMGURL,
            book:{pic:'/img/book/default.jpg'},
            uid:1,
            hideSpan:false,
            span:"展开",
            isShow:false,
            isAdd:false,
            isLogin:false,
            recommend:[],
            addSpan:'',
        }
    },
    created() {
        this.loadPage();
        //console.log(this.bid,this.readed);
        this.loadBackTop();
    },
    methods: {
        loadPage(){
            detailsInfo({bid:this.bid}).then(res=>{
                this.book=res.data.book[0];
                var arr=[];
                arr[0]=this.book;
                this.spLabel(arr,1);
                this.book.label=arr[0].label;
                if(this.book.intro.length<340){
                    this.hideSpan=true;
                }
                this.recommend=res.data.recommend;
            })
        },
        showIntro(){
            if(this.isShow){
                this.span="展开";
                this.isShow=false;
            }
            else{
                this.span="收起";
                this.isShow=true; 
            }
        },
        change(e){
            var bid=e.target.dataset.id;
            this.$router.push('/details/'+bid);
            //console.log(bid);
            this.reload();
        },
        goCatalog(){
            this.$router.push("/catalog/"+this.bid);
        },
        goRead(){
            this.$router.push("/read/"+this.bid+"/"+this.readed);
        },
        addBook(){
            if(this.$store.getters.optIsLogin==0){
                this.isLogin=true;
            }else{
                addBook({bid:this.bid}).then(res=>{
                    //console.log(res.data);
                    this.addSpan=res.data.msg;
                    this.isAdd=true;
                })
            }
        },
        close(){
            this.isLogin=false;
            this.isAdd=false;
        },
    },
    //注册子组件
    components:{
        'comment-box':comment
    }
}
</script>

<style scoped>
    section>div.top,section>div.content>div.recommend{
        background: #fff;
    }
    section>div.top{
        display: flex;
    }
    section>div.top>div.right{
        width: 900px;
    }
    section>div.top>div>img{
        width: 200px;
        box-shadow: 2px 2px 10px #000;
    }
    section>div.top>div{
        text-align: left;
        padding: 20px;
    }
    section>div.top>div.right>span{
        margin-top:20px;
        color:#000;
        display:inline-block;
        font-size: 18px;
        font-weight: bold;
    }
    section>div.top>div.right>span:hover{
        color: #0083ec;
    }
    section>div.top>div>div.bookinfor{
        display: flex;
        justify-content: space-between;
    }
    section>div.top>div>div.bookinfor span{
        color: #888;
        margin-right: 10px;
    }
    section>div.top>div>div.bookinfor>div>span{
        font-size: 14px;
        width: 50px;
        margin: 0;
    }
    section>div.top>div>div{
        margin-bottom: 10px;
    }
    section>div.top>div>div.price>span{
        color: #0083ec;
    }
    section>div.top>div>div>a{
        display: inline-block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-right: 10px;
        text-align: center;
        border-radius: 2px;
        background: #ddd;
        color: #0083ec;
    }
    section>div.top>div>div>a:hover{
        background: #0083ec;
        color: #fff !important;
    }
    section>div.top>div>div.intro{
        border-top: 1px dotted #888;
        padding-top:5px;
        color: #888;
        overflow: hidden;
        width: 860px;
        height: 105px;
    }
    section>div.top>div>div.intro.show{
        height: auto;
    }
    section>div.top>div.right>a{
        position: relative;
        float: right;
    }
    section>div.top>div.right>a.hide{
        display: none;
    }
    section>div.top>div.right>a>span{
        font-size: 12px;
    }
    section>div.top>div.right>a>span.triangle{
        position: relative;
        top: 3px;
        left: 0px;
        transform-origin: center 25%;
        transition: all .5s;
    }
    section>div.top>div.right>a>span.triangle.more{
        transform: rotate(180deg);
    }
    section>div.content{
        margin-top: 20px;
        text-align: left;
        display: flex;   
    }
    section>div.content>div.recommend{
        width: 320px;
        margin-left: 20px;
        padding: 10px;
    }
    section>div.content>div.recommend>h5{
        font-size: 20px;
        margin-left: 10px;
        font-weight: 400;
    }
    section>div.content>div.recommend>ul{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 300px;
    }
    section>div.content>div.recommend>ul>li{
        width: 130px;
        margin: 5px;
    }
    section>div.content>div.recommend>ul>li>a{
        font-size: 16px;
        color: #000;
    }
    section>div.content>div.recommend>ul>li>a.name{
        display: block;
        max-width: 130px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    section>div.content>div.recommend>ul>li>p{
        font-size: 12px;
        margin: 0;
        max-width: 130px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    section>div.content>div.recommend>ul>li>a>img{
        width: 130px;
    }
    section>div.content>div.recommend>ul>li>div>img{
        width: 20px;
    }
    section>div.content>div.recommend>ul>li>div>span{
        font-size: 12px;
    } 
    div.main>div.dialog{
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
    div.main>div.dialog>div.mask{
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
    div.main>div.dialog>div.mask>p{
        margin-top: 47px;
        margin-bottom: 10px;
    }
    div.main>div.dialog>div.mask>a.login{
        color: #0083ec;
    }
    div.main>div.dialog>div.mask>a.close{
        position: absolute;
        top: 10px;
        right:20px;
        display:block;
        width:20px;
        height:20px;
    }
    div.main>div.dialog>div.mask>a.close>span{
        font-size: 32px;
    }   
    div.main>div.dialog>div.mask.add{
        width: 300px;
        height: 100px;        
    }
    div.main>div.dialog>div.mask.add>p{
        margin-top: 38px;
    }
    div.main>div.dialog>div.mask.add>a.close{
        top:5px;
        right:25px;
    }
</style>