<template>
    <main id="main">
        <div class="genre">
            <div class="choose">
                <span>频道</span>
                <ul class="list-unstyled choose-ul">
                    <li v-for='(c,i) of channel' :key="i"><a href="javascript:;" @click='change' :data-i='i' data-id='1' class="choose-item" :class='{active:0==i}'>{{c.label}}</a></li>
                </ul>
            </div>
            <div class="choose">
                <span>类型</span>
                <ul class="list-unstyled choose-ul">
                    <li v-for='(g,i) of genre' :key="i"><a href="javascript:;" @click='change' :data-i='i' data-id='2' class="choose-item" :class='{active:0==i}'>{{g.label}}</a></li>
                </ul>
                <a @click='showAll' href="javascript:;">
                    <span>{{span}}</span><span class='triangle' :class='{more:isShow}'></span>
                </a>
            </div>
            <div class="choose">
                <span>其他</span>
                <ul class="list-unstyled choose-ul">
                    <li v-for='(o,i) of others' :key="i"><a href="javascript:;" @click='change' :data-i='i' data-id='3' class="choose-item" :class='{active:0==i}'>{{o.label}}</a></li>
                </ul>
            </div> 
        </div>   
        <div class="show">
            <div class="showTitle">
                <div>
                    <a @click='showHot' :class="{active:order==0}" href="javascript:;">热门</a>
                    <a @click='showNew' :class="{active:order==1}" href="javascript:;">最新</a>
                </div>
                <ul class="list-unstyled page-ul" :class='{hide:pageCount<=1}'>
                    <li><a @click='cyclePrev' href="javascript:;" class="prev">上一页</a></li>
                    <li><p>第{{pno+1}}页</p></li>
                    <li><a @click='cycleNext' href="javascript:;" class="next">下一页</a></li>
                </ul>
            </div>
            <div class="showContent" :class="{firstLoad:progress==0}">
                <ul class="list-unstyled content-ul" :class='{hide:pageCount==0}'>
                    <li v-for='b of books' :key="b.bid">
                        <router-link :to='`/details/${b.bid}`'><img :src="`${baseUrl}${b.pic}`"></router-link>
                        <div>
                            <router-link :to='`/details/${b.bid}`'>{{b.title}}</router-link>
                            <p>
                                <span>{{b.author}}</span>
                                <router-link :to='`/read/${b.bid}/0`'>试读</router-link>
                            </p>
                            <div class="content-ul-watch">
                                <i class="iconfont eye">&#xe8c7;</i>
                                <span>{{b.watch|wordsFormat}}</span>
                            </div>
                            <p class="intro">{{b.intro}}</p>
                        </div>
                    </li>
                </ul>
                <div class="noBook" :class='{showNoBook:pageCount==0&&progress>0}'>
                    <h2>没有找到相关书籍!</h2>
                    <img :src="`${baseUrl}/img/classify/sorry1.gif`">
                </div>
            </div>
            <div class="showBorder" :class='{new:order==1}'></div>
            <ul class="list-unstyled page-ul">
                <li><a @click='goPrev' href="javascript:;" class="prev" :class='{disabled:pno==0,hide:pageCount<=1}'>上一页</a></li>
                <li v-for='(p,i) of page' :key="i"><a @click='changePage' :data-pno='i+minP-1' href="javascript:;" :class="{active:pno==i+minP-1}">{{i+minP}}</a></li>
                <li><a @click='goNext' href="javascript:;" class="next"  :class='{disabled:pno==pageCount-1,hide:pageCount<=1}'>下一页</a></li>
                <div class="jump">
                    <span :class='{hide:pageCount<=0}'>共{{pageCount}}页</span>
                    <span :class='{hide:pageCount<=1}'>跳转到:</span>
                    <input @keyup.13='goPage' :class='{hide:pageCount<=1}' v-model='jumpP' type="text" maxlength="5">
                    <a :class='{hide:pageCount<=1}' @click='jumpPage' href="javascript:;">确定</a>
                </div>
            </ul>
        </div>
        <div @click='close' class="dialog" v-show='showMask'>
            <div class='mask'>
                超出页码范围，请输入符合条件的页码！
                <a @click='close' href="javascript:;">
                    <span>×</span>
                </a>
            </div>
        </div>
    </main>
</template>

<script>
    import {classifyInfo,classifySearch} from '../api/classify'
    export default {
        data() {
            return {
                baseUrl:process.env.VUE_APP_IMGURL,
                channel:[],
                genre:[],
                allGenre:[],
                others:[],
                span:"更多",
                isShow:false,
                books:[],
                pageCount:0,
                pno:0,
                order:0,
                strC:'',
                strG:'',
                strO:'',
                minP:1,
                page:0,
                showMask:false,
                jumpP:'',
                kwords:this.$route.query.kwords,
                progress:0
            }
        },
        created() {
            this.progress=0;
            this.loadPage();
            this.loadBackTop();               
        },
        mounted() {
            this.search();
        },
        watch: {
            $route(to,from){
                this.kwords=this.$route.query.kwords;
                this.search();
            }
        },
        methods: {
            loadPage(){
                var params={
                    pno:this.pno
                };
                if(this.order==0){
                    var str=this.strC+" "+this.strG+' '+this.strO;
                    str=str.trim();  
                    if(str.length>0){
                        params.label=str;
                    }
                }else{
                    params.order=this.order;
                    var str=this.strC+" "+this.strG+' '+this.strO;
                    str=str.trim();  
                    if(str.length>0){
                        params.label=str;
                    }
                }
                this.load(params);
            },
            changePage(e){
                this.pno=parseInt(e.target.dataset.pno);
                if(this.pno<=3){
                    this.minP=1;
                }else if(this.pno>3){
                    this.minP=this.pno-3;
                }
                this.backTop();
                this.loadPage();
            },
            showHot(){
                if(this.order!=0){
                    this.order=0;
                    this.loadPage();                   
                } 
            },
            showNew(){
                if(this.order==0){
                    this.order=1;
                    this.loadPage();
                } 
            },
            goPrev(){
                if(this.pno!=0){
                    this.pno--;
                    this.backTop();
                } 
                if(this.minP>1){
                    this.minP--;
                }
                this.loadPage();
            },
            goNext(){
                if(this.pno!=this.pageCount-1){
                    this.pno++;
                    this.backTop();
                } 
                if(this.pno>this.minP+3){
                    this.minP++;
                }

                this.loadPage();
            },
            cyclePrev(){
                if(this.pno!=0){
                    this.pno--;
                    if(this.minP>1){
                        this.minP--;
                    }
                } 
                else{
                    this.pno=this.pageCount-1;
                    this.minP=this.pageCount-4;
                } 
                this.loadPage();
            },
            cycleNext(){
                if(this.pno!=this.pageCount-1){
                    this.pno++;
                    if(this.pno>this.minP+3){
                        this.minP++;
                    }
                } 
                else{
                    this.pno=0;
                    this.minP=1;
                } 
                this.loadPage();
            },
            jumpPage(){
                var reg=/^[1-9]\d*$/;
                var isNum=reg.test(this.jumpP);
                if(isNum&&this.jumpP<=this.pageCount){
                    this.pno=this.jumpP-1;
                    if(this.pno<=3){
                    this.minP=1;
                    }else if(this.pno>3){
                        this.minP=this.pno-3;
                    }                
                    this.backTop();
                }else{
                    this.showMask=true;
                    this.jumpP='';
                }
            },
            goPage(){
                this.jumpPage();
            },
            load(params){
                classifyInfo(params).then(res=>{
                    if(this.channel.length==0&&this.genre.length==0&&this.others.length==0){
                        this.channel=[{label: "全部"},...res.data.channel];     
                        this.allGenre=[{label: "全部"},...res.data.genre];     
                        this.genre=[{label: "全部"},...res.data.genre.slice(0,11)];     
                        this.others=[{label: "全部"},...res.data.others];
                    }
                    this.pageCount=res.data.content.pageCount;
                    if(this.pageCount>5)
                        this.page=5;
                    else
                        this.page=this.pageCount; 
                    this.pno=res.data.content.pno;
                    if(this.pageCount>0){
                        this.books=res.data.content.books;
                        this.cutIntro(this.books,69);    
                        this.cutTit(this.books,8);
                    }else{
                        this.books=[];
                    }
                    this.progress++; 
                    //console.log(this.books); 
                })
            },
            change(e){
                e.target.className='active choose-item';
                var lis=e.target.parentNode.parentNode.childNodes;           
                for(var l in lis){
                    if(lis[l]!=e.target.parentNode&&lis[l].nodeName=='LI'){
                        lis[l].firstChild.className='choose-item';
                    }
                }
                var id=e.target.dataset.id;                
                var i=e.target.dataset.i;
                var params={
                    pno:this.pno,
                    order:this.order,
                }
                if(id==1&&i!=0){
                    this.strC=this.channel[i].label;
                }else if(id==1&&i==0){
                    this.strC='';
                }
                if(id==2&&i!=0){
                    this.strG=this.genre[i].label;
                }else if(id==2&&i==0){
                    this.strG='';
                }
                if(id==3&&i!=0){
                    this.strO=this.others[i].label;
                }else if(id==3&&i==0){
                    this.strO='';
                }
                var str=this.strC+" "+this.strG+' '+this.strO;
                str=str.trim();  
                if(str.length>0){
                    params.label=str;
                }            
                this.load(params);
            },
            showAll(){
                if(this.genre.length>12){
                    this.genre=this.genre.slice(0,12);
                    this.span="更多";
                    this.isShow=false;
                }
                else{
                    this.genre=this.allGenre;
                    this.span="收起";
                    this.isShow=true; 
                }
            },
            close(){
                this.showMask=false;
            },
            backTop(){
                document.documentElement.scrollTop-=20;
                if (document.documentElement.scrollTop>=150) {
                    var c=setTimeout(()=>this.backTop(),5);
                }else {
                    clearTimeout(c);
                }
            },
            search(){
                if(this.kwords){
                    classifySearch({kwords:this.kwords}).then(res=>{
                        this.pageCount=res.data.pageCount;
                        // this.pageCount=10;
                        if(this.pageCount>5)
                            this.page=5;
                        else
                            this.page=this.pageCount; 
                        this.pno=res.data.pno;
                        if(this.pageCount>0){
                            this.books=res.data.books;
                            this.cutIntro(this.books,69);    
                            this.cutTit(this.books,8);
                        }else{
                            this.books=[];
                        }
                        console.log(this.pageCount,this.books);
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .genre,.show,.showTitle,.showContent{
        width: 1140px;
        margin: 0 auto;
    }
    .genre{
        margin-top: 50px;
    }
    .genre>div:nth-child(2){
        border-bottom: 1px dashed #f0f0f0;
        border-top: 1px dashed #f0f0f0;
    }
    .choose{
        background: #fff;
        display: flex;
        padding: 0.5rem 1rem 0.5rem 1rem;
    }

    .choose>span{padding-top: 0.5rem}
    .choose>a{
        padding-top: 0.5rem;
        margin-left: 3rem;    
    }
    .choose>a>span.triangle{
        margin-left: 0.5rem;
        transform-origin: center 25%;
        transition: all .5s;
    }
    .choose>a>span.triangle.more{
        transform: rotate(180deg);
    }
    .choose-ul{
        display: flex;
        flex-wrap: wrap;
        width: 900px;
        margin: 0;
    }
    .choose-ul li{
        margin-left:2rem;
        padding-top:0.5rem;
        padding-bottom:0.5rem;   
    }
    .choose-item{
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 14px;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
        border: 1px solid #888;
        border-radius: 10rem;
    }
    .choose-item:hover{
        border-color: #0083ec;
    }
    .choose-item.active,.choose-item.active:hover{
        background: #0083ec;
        color: #fff !important;
    }
    .show{
        position: relative;
    }
    .showTitle{
        display: flex;
        justify-content: space-between;
        margin-top:3rem;
    }
    .showTitle>div{
        display: flex; 
    }
    .showTitle>div>a{
        display: block;
        background: #f5f5f5;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #ddd;
        border-bottom: none;
    }
    .showTitle>div>a+a{
        border-left:none; 
    }
    .showTitle>div>a.active,.showContent{
        background: #fff;
        color: #0083ec;
    }
    .showContent.firstLoad{
        background: #f0f0f0;
    }
    .showBorder{
        width: 120px;
        height: 41px;
        border-bottom: 1px solid #fff;
        position: absolute;
        top: 0px;left: 1px; 
    }
    .showBorder.new{
        left:122px;
    }
    .showContent{
        border: 1px solid #ddd;
    }
    .showContent>div.noBook{
        height: 390px;
        padding: 30px; 
        display: none; 
    }
    .showContent>div.noBook>h2{
        font-size: 38px;
        margin-bottom: 30px;
    }
    .showContent>div.noBook.showNoBook{
        display: block;
    }
    .showContent>.content-ul{
        padding: 30px 15px;
        display: flex;
        flex-wrap: wrap;
        width: 1140px;
        text-align: left; 
        box-sizing: border-box;
    }
    .content-ul>li{
        display: flex;
        width:370px;
        height: 235px;
        padding: 15px;
        box-sizing: border-box;
        border: 1px solid transparent;
    }
    .content-ul>li:hover{
        border: 1px solid #ddd;
        box-shadow: 0px 2px 8px 5px #ddd;
    }
    .content-ul>li>a>img{
        width: 150px;
    }
    .content-ul>li>div{
        margin-left: 10px;
        width: 170px;
        height: 200px;
    }
    .content-ul>li>div>a{
        font-size: 18px;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .content-ul>li>div>p{
        margin: 0;
        font-size: 14px;
    }
    .content-ul>li>div>p>a{
        float: right;
        display: block;
        width: 32px;
        height: 24px;
        font-size: 13px;
        text-align: center;
        line-height: 24px;
        border-radius: 2px;
        background: #0083ec;
        color: #fff;
    }
    .content-ul>li>div>p>a:hover{
        background: #2468fa !important;
        color: #fff !important;
    }
    .content-ul>li>div>div{
        position: relative;
    }
.content-ul-watch{
    margin-top: 5px;
}
    .content-ul>li>div>div>span{
        font-size: 12px;
    }
    .content-ul>li>div>p.intro{
        margin-top: 15px;
        height: 115px;
        overflow: hidden;
    }
    .page-ul{
        display: flex;
        margin: 0;
        margin-top: 5px;
    }
    .page-ul>li{
        margin-left: 10px;
    }
    .page-ul>li>a{
        display: block;
        width: 30px;
        height: 30px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background: #ddd;
        border-radius: 2px;
        color: #0083ec;
    }
    .page-ul>li>a:hover,.page-ul>li>a.active{
        background: #0083ec !important;
        color: #fff !important;
    }
    .page-ul>li>a.prev,.page-ul>li>a.next{
        width: 40px;
    }
    .page-ul>li>a.prev.disabled,.page-ul>li>a.next.disabled{
        color:#bbb;
        cursor: not-allowed;
    }
    .page-ul>li>a.prev.disabled:hover,.page-ul>li>a.next.disabled:hover{
        background: #ddd !important;
        color: #bbb !important;
    }
    .page-ul>li>p{
        font-size: 14px;
        margin: 0;
        line-height: 30px;
    }
    .show>.page-ul{
        justify-content: center;
    }
    .hide{
        display: none !important;
    }
    .page-ul>div.jump{
        height: 30px;
        line-height:30px;
    }
    .page-ul>div.jump>span{
        font-size: 14px;
        color: #888;
        margin-left: 10px;
    }
    .page-ul>div.jump>input{
        width: 30px;
        height: 30px;
        outline-style: none;
        border: 1px solid #ddd;
        border-radius: 2px;
        box-sizing: border-box;
        color: #333;
        font-size: 14px;
        text-align: center;
        margin-left: 10px;
    }
    .page-ul>div.jump>input:focus{
        border-color: #0083ec;
    }
    .page-ul>div.jump>a{
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 13px;
        border-radius: 2px;
        background: #ddd;
        margin-left: 10px;
    }
    .page-ul>div.jump>a:hover{
        background: #0083ec;
        color: #fff !important;
    }
    main>div.dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 100;
    }
    main>div.dialog>div.mask{
        width: 400px;
        height: 120px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        text-align: center;
        line-height: 120px;
        font-size: 18px;
        color: #000;
    }
    main>div.dialog>div.mask>a{
        position: absolute;
        top: 15px;
        left: 365px;
        display:block;
        width:20px;
        height:20px;
        overflow: hidden;
    }
    main>div.dialog>div.mask>a>span{
        position: absolute;
        top: -50px;
        left: 0px;
        font-size: 32px;
    }
</style>