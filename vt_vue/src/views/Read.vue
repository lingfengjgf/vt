<template>
    <div class="main" :class="{style1:b==1,style2:b==2,style3:b==3,style4:b==4,style5:b==5}">
        <section :class="{style1:b==1,style2:b==2,style3:b==3,style4:b==4,style5:b==5}">
            <div class="top">
                <span>
                    <a @click="goDal" href="javbascript:;">《{{title}}》</a>  
                </span>
                <span>-&nbsp;&nbsp;</span>
                <span>{{catalogs[pno]}}</span>
                <a href="javascript:;">购买本书</a>     
            </div>
            <div class="content">
                <h3>{{catalogs[pno]}}</h3>
                <p :class="{kai:f==1,xing:f==2}" :style="`fontSize:${parseInt($store.getters.optFontS)}px`" v-for="(t,i) of txt[pno]" :key="i">{{t}}</p>
            </div>
        </section>
        <nav>
            <ul class="list-unstyled" :class="{style1:b==1,style2:b==2,style3:b==3,style4:b==4,style5:b==5}">
                <li>
                    <a @click="goCatalog" href="javascript:;">
                        <b>目录</b>
                        <span class="catalog"></span>
                    </a>
                </li>
                <li>
                    <a @click="goDal" href="javascript:;">                        
                        <b>书页</b>
                        <span class="page"></span>
                    </a>
                </li>
                <li>
                    <a @click="addBook" href="javascript:;">                        
                        <b>加书架</b>
                        <span class="shelf"></span>
                    </a>
                </li>
                <li>
                    <a @click="prev" class="prev" :class="{disabled:pno==0}" href="javascript:;">                        
                        <b>上一章</b>
                        <span class="prev"></span>
                    </a>
                </li>
                <li>
                    <a @click="next" class="next" :class="{disabled:pno==txt.length-1}" href="javascript:;">                        
                        <b>下一章</b>
                        <span class="next"></span>
                    </a>                
                </li>
                <li>
                    <a @click="setup" href="javascript:;">                        
                        <b>设置</b>
                        <span class="setup"></span>
                    </a>               
                </li>
                <li>
                    <a @click="backTop" href="javascript:;">                        
                        <b>回顶部</b>
                        <span class="top"></span>
                    </a>                
                </li>
            </ul>
        </nav>
        <div class="bot">
            <ul class="list-unstyled" :class="{style1:b==1,style2:b==2,style3:b==3,style4:b==4,style5:b==5}" >
                <li><a @click="prev" class="prev" :class="{disabled:pno==0}" href="javascript:;">上一章</a></li>
                <li><a @click="goCatalog" href="javascript:;">章节目录</a></li>
                <li><a @click="next" class="next" :class="{disabled:pno==txt.length-1}" href="javascript:;">下一章</a></li>
            </ul>
        </div>
        <div  class="dialog-read" :class="{hide:showMask}">
            <div class='mask'> 
                <h3>设置</h3>
                <a @click='readClose' href="javascript:;">
                    <span>×</span>
                </a>
                <ul class="list-unstyled">
                    <li class="bg">
                        <span>阅读背景：</span>
                        <a @click="changeBg" :class="{show:b==0}" data-i="0" class="style" href="javascript:;" title="白色"></a>
                        <a @click="changeBg" :class="{show:b==1}" data-i="1" class="style1" href="javascript:;" title="绿色"></a>
                        <a @click="changeBg" :class="{show:b==2}" data-i="2" class="style2" href="javascript:;" title="牛皮纸"></a>
                        <a @click="changeBg" :class="{show:b==3}" data-i="3" class="style3" href="javascript:;" title="蓝色"></a>
                        <a @click="changeBg" :class="{show:b==4}" data-i="4" class="style4" href="javascript:;" title="粉色"></a>
                        <a @click="changeBg" :class="{show:b==5}" data-i="5" class="style5" href="javascript:;" title="夜间"></a>
                    </li>
                    <li class="ff">
                        <span>正文字体：</span>
                        <a @click="changeFf" :class="{show:f==0}" data-i="0" class="ya" href="javascript:;">雅黑</a>
                        <a @click="changeFf" :class="{show:f==1}" data-i="1" class="kai" href="javascript:;">楷书</a>
                        <a @click="changeFf" :class="{show:f==2}" data-i="2" class="xing" href="javascript:;">行书</a>
                    </li>
                    <li class="fs">
                        <span>字体大小：</span>
                        <a @click="changeFs(-1)" class="small" href="javascript:;">A-</a>
                        <a>{{s}}</a>
                        <a @click="changeFs(1)" class="big" href="javascript:;">A+</a>
                    </li>
                </ul>
            </div>
        </div>
        <div @click='close' class="dialog" v-show='isLogin'>
            <div class='mask'>
                <p>您还没有登录哦！</p>
                <router-link class="dialog-text" to="/login">立即登陆>></router-link>
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
    import {getReadBg,getReadFamily,getReadSize,getReadBook} from '../api/read';
    import {addBook} from '../api/details'
    export default {
        props:["bid","p"],
        data() {
            return {
                txt:[],
                catalogs:[],
                title:'',
                pno:0,
                f:0,
                s:parseInt(this.$store.getters.optFontS),
                b:0,
                showMask:false,
                fontSize:{fontSize: "18px"},
                isLogin:false,
                isAdd:false,
                addSpan:''
            }
        },
        created() {
            this.loadpage();
            this.f=this.$store.getters.optFontF;
            //console.log(this.$store.getters.optFontS,this.s);
            this.b=this.$store.getters.optBg;
            this.loadBackTop();
        },
        methods: {
            backTop(){
                document.documentElement.scrollTop-=25;
                if (document.documentElement.scrollTop>=30) {
                    var c=setTimeout(()=>this.backTop(),1);
                }else {
                    clearTimeout(c);
                }
            },
            setup(){
                this.showMask=true;
            },
            changeBg(e){
                var i=e.target.dataset.i;
                this.b=i;
                var bg=this.b;
                this.$store.commit("changeBg",bg);
                var postData={bg};
                getReadBg(postData).then(res=>{
                    console.log(res);
                })
            },
            changeFf(e){
                var i=e.target.dataset.i;
                this.f=i;
                this.$store.commit("changeFontF",i);
                var postData={fontF:this.f};
                getReadFamily(postData).then(res=>{
                    console.log(res);
                })
            },
            changeFs(i){
                this.s+=i*2;
                if(this.s<10){
                    this.s=10;
                }
                if(this.s>30){
                    this.s=30;
                }
                this.fontSize.fontSize=this.s+'px';
                this.$store.commit("changeFontS",this.s);
                console.log(this.$store.getters.optFontS);
                var postData={fontS:this.s};
                getReadSize(postData).then(res=>{
                    console.log(res);
                })
            },
            readClose(){
                this.showMask=false;
            },
            goDal(){
                this.$router.push("/details/"+this.bid); 
            },
            goCatalog(){
                this.$router.push("/catalog/"+this.bid);
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
            prev(){
                if(this.pno>0){
                    this.pno--;
                    this.$router.push("/read/"+this.bid+"/"+this.pno);
                    this.loadBackTop();
                }
            },
            next(){
                if(this.pno<this.txt.length-1){
                    this.pno++;
                    this.$router.push("/read/"+this.bid+"/"+this.pno);
                    this.loadBackTop();
                }
            },
            loadpage(){
                var bid=this.bid;
                getReadBook({bid}).then(res=>{
                    // console.log(res.data.readSet);
                    // if(res.data.readSet){
                    //     var obj=res.data.readSet[0];
                    //     this.fontF=obj.readfontF;
                    //     this.bg=obj.readBg;
                    //     this.fontSize.fontSize=obj.readFontS+'px';
                    // }
                    this.catalogs=res.data.book[0].catalogs.split("@");
                    var arr=res.data.book[0].texts.split("@@");
                    for(var el of arr){
                        this.txt.push(el.split(" "));
                    }
                    this.title=res.data.book[0].title;
                    this.pno=this.p;
                })
            }
        },
    }
</script>

<style scoped>
    div.main{
        background: url('../assets/img/read/bg1.png') repeat !important;
    }
    div.main.style1{
        background: url('../assets/img/read/bg2.png') repeat !important;        
    }
    div.main.style2{
        background: url('../assets/img/read/bg3.png') repeat !important;        
    }
    div.main.style3{
        background: url('../assets/img/read/bg4.png') repeat !important;        
    }
    div.main.style4{
        background:  #ebcece !important;        
    }
    div.main.style5{
        background:  #404040 !important;        
    }
    section{
        background: #f7f2e8;
        width: 800px;
        margin-top: 0;
        padding: 50px;
        position: relative;
    }
    section.style1{
        background: #e2eee2;
    }
    section.style2{
        background: #f3e9c6;
    }
    section.style3{
        background: #e2eff3;
    }
    section.style4{
        background: #f5e4e4;
    }
    section.style5{
        background: #323536;
    }
    section>div.top{
        text-align: left;
        font-size: 14px;
        color: #888;
        padding-bottom: 10px;
        border-bottom: 1px solid #bbb;
    }
    section>div.top>span>a{
        color: #0083ec;
    }
    section.style5>div.top>span>a{
        color: #999;
    }
    section>div.top>a{
        display: block;
        width: 70px;
        height: 26px;
        background: #0083ec;
        color: #fff;
        font-size: 13px;
        text-align: center;
        line-height: 25px;
        border-radius: 3px;
        float: right;
    }
    section.style5>div.top>a{
        background: #d9d9d9;
        color: #444;
    }
    section>div.top>a:hover{
        background: #0366ee;
        color: #fff !important;
    }
    section>div.content{
        margin-top: 50px;
        min-height: 800px;
    }
    section>div.content>h3{
        margin-bottom: 20px;
    }
    section.style5>div.content>h3{
        color: #999;
    }
    section>div.content>p{
        font-size: 18px;
        color: #444;
        text-align: left;
        margin-bottom: 20px;
    }
    section.style5>div.content>p{
        color: #999;
    }
    section>div.content>p{
        font-family: "Microsoft YaHei", sans-serif, Tahoma, Helvetica, Arial, "\5b8b\4f53";
        text-indent:2em;
    }
    section>div.content>p.kai{
        font-family: kaiti;
    }
    section>div.content>p.xing{
        font-family: "华文行楷","方正行楷简体","方正硬笔行书简体";
    }
    nav{
        width: 600px;
        height: 360px;
        position: fixed;
        left: 50%;
        bottom: 0;
    }
    nav>ul{
        width: 50px;
        position: absolute;
        left: 460px;
        bottom: 120px;
    }
    nav>ul>li>a{
        display: block;
        width: 50px;
        height: 50px;
        background: #f7f2e8;
        text-align: center;
        line-height: 50px;
        font-size: 12px;
        position: relative;
    }
    nav>ul.style1>li>a{
        background: #e2eee2;
    }
    nav>ul.style2>li>a{
        background: #f3e9c6;
    }
    nav>ul.style3>li>a{
        background: #e2eff3;
    }
    nav>ul.style4>li>a{
        background: #f5e4e4;
    }
    nav>ul.style5>li>a{
        background: #323536;
    }
    nav>ul>li>a>span{
        display: block;
        width: 45px;
        height: 45px;
        background: url('../assets/img/read/icon_readpage.png') no-repeat;
        position: absolute;
        top: 0px;
        left: 0px;        
    }
    nav>ul.style5>li>a>b{
        color: #999;
    }
    nav>ul>li>a>span.catalog{
        background-position: -65px -6px;
    }
    nav>ul>li>a>span.page{
        background-position: -4px -6px;
    }
    nav>ul>li>a>span.shelf{
        background-position: -186px -6px;
    }
    nav>ul>li>a>span.prev{
        background-position: -188px -66px;
    }
    nav>ul>li>a>span.next{
        background-position: -248px -66px;;
    }
    nav>ul>li>a>span.setup{
        background-position: -128px -6px;;
    }
    nav>ul>li>a>span.top{
        background-position: -308px -66px;
    }
    nav>ul>li>a:hover>span{
        display: none;
    }
    nav>ul>li>a>b{
        display: none;
        font-weight: normal;
    }
    nav>ul>li>a:hover>b{
        display: block;
    }
    nav>ul>li+li{
        border-top: 1px solid #b3afa8;
    }
    nav>ul.style5>li+li{
        border-color: #555;
    }
    div.bot{
        padding-bottom: 50px;
        position: relative;
        bottom: 0;
        left: 0;
    }
    div.bot>ul{
        display: flex;
        margin-top: 20px;
        justify-content: center;
    }
    div.bot>ul>li{
        width: 100px;
    }
    div.bot>ul>li+li{
        margin-left: 20px;
    }
    div.bot>ul>li>a{
        display: block;
        width: 100px;
        height: 40px;
        background: #f7f2e8;
        text-align: center;
        line-height: 40px;
        border-radius: 2px;
        font-size: 18px; 
        border: 1px solid #b3afa8;   
    }
    div.bot>ul.style1>li>a{
        background: #e2eee2;
    }
    div.bot>ul.style2>li>a{
        background: #f3e9c6;
    }
    div.bot>ul.style3>li>a{
        background: #e2eff3;
    }
    div.bot>ul.style4>li>a{
        background: #f5e4e4;
    }
    div.bot>ul.style5>li>a{
        background: #666;
        border-color: #555;
        color: #bbb;
    }
    div.bot>ul>li>a.prev.disabled,div.bot>ul>li>a.next.disabled,nav>ul>li>a.prev.disabled,nav>ul>li>a.next.disabled{
        color:#bbb;
        cursor: not-allowed;
    }
    div.bot>ul.style5>li>a.prev.disabled,div.bot>ul.style5>li>a.next.disabled,nav>ul.style5>li>a.prev.disabled,nav>ul.style5>li>a.next.disabled{
        color: #888;
    }
    div.bot>ul>li>a:hover{
        border-color: #0083ec;
    }
    div.bot>ul.style5>li>a:hover{
        border-color: #555;
    }
    div.bot>ul>li>a.prev.disabled:hover,div.bot>ul>li>a.next.disabled:hover{
        color:#bbb !important;
        border-color: #b3afa8;
    }
    div.bot>ul.style5>li>a.prev.disabled:hover,div.bot>ul.style5>li>a.next.disabled:hover{
        color:#888 !important;
        border-color: #555;
    }
    div.main>div.dialog-read{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 100;
        display: none;
    }
    div.main>div.dialog-read.hide{
        display: block;
    }
    div.main>div.dialog-read>div.mask{
        width: 500px;
        height: 260px;
        padding: 20px;
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
    div.main>div.dialog-read>div.mask>h3{
        width: 50px;
        font-size: 18px;
    }
    div.main>div.dialog-read>div.mask>a{
        position: absolute;
        top: 10px;
        right: 20px;
        display:block;
        width:20px;
        height:20px;
    }
    div.main>div.dialog-read>div.mask>a>span{
        font-size: 32px;
    }
    div.main>div.dialog-read>div.mask>ul{
        width: 400px;
        height: 180px;
        margin: 0 auto;
        margin-top: 30px;
    }
    div.main>div.dialog-read>div.mask>ul>li{
        width: 100%;
        height: 30px;
        padding: 15px 0;
        font-size: 14px;
        text-align: left;
        line-height: 30px;
        position: relative;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>span{
        position: relative;
        top: -10px;
        left: 0px;
    }
    div.main>div.dialog-read>div.mask>ul>li>a{
        display: inline-block;
        height: 30px;
        margin: 0 10px;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>a{
        width: 30px;
        border-radius: 50%;       
        box-shadow: 0 1px 1px #BBB;
        background: #f6f1e7;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>a.style1{
        background: #e2eee2;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>a.style2{
        background: #f3e9c6;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>a.style3{
        background: #e2eff3;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>a.style4{
        background: #f5e4e4;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>a.style5{
        background: #666;
    }
    div.main>div.dialog-read>div.mask>ul>li.bg>a.show,div.main>div.dialog-read>div.mask>ul>li.bg>a:hover{
        box-shadow: 1px 3px 5px #aaa;
    }
    div.main>div.dialog-read>div.mask>ul>li.ff>a{
        width: 55px;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        text-align: center;
        vertical-align: middle;
        box-shadow: 0 1px 1px #ECECEC;
        border-radius: 2px;
        font-family: "Microsoft YaHei", sans-serif, Tahoma, Helvetica, Arial, "\5b8b\4f53";
    }
    div.main>div.dialog-read>div.mask>ul>li.ff>a.kai{
        font-family: kaiti;
    }
    div.main>div.dialog-read>div.mask>ul>li.ff>a.xing{
        font-family: "华文行楷","方正行楷简体","方正硬笔行书简体";
    }
    div.main>div.dialog-read>div.mask>ul>li.ff>a.show,div.main>div.dialog-read>div.mask>ul>li.ff>a:hover{
        color: #0083ec;
    }
    div.main>div.dialog-read>div.mask>ul>li.fs>a{
        width: 80px;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
        border-radius: 2px 0 0 2px;
        box-shadow: 0 1px 0 #ECECEC;
        margin: 0;
        text-align: center;
    }
    div.main>div.dialog-read>div.mask>ul>li.fs>a:nth-child(2){
        margin-left: 10px;
    }
    div.main>div.dialog-read>div.mask>ul>li.fs>a:nth-child(3){
        border-left: 0;
        border-right: 0;
        color: #0083ec;
    }
</style>