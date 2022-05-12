<template>
    <main id="main">
        <div class="bg">
            <img :src="`${baseUrl}/img/index/bg_index_c2.png`" class="bg-img">
            <div id="c1">
                <article v-for='(c,i) of casels' v-show='ac==i' :key="i">
                    <a href="javascript:;" @click="jumpDal" :data-id="c.bookId" @mouseover='stopc' @mouseout='startc'>{{c.title}}</a>
                    <p @mouseover='stopc' @mouseout='startc' class="content">{{c.intro}}</p>
                </article>        
                <ul class="showImg list-unstyled">
                    <li v-for='(c,i) of casels' :class='{show:i>=p&&i<=n}' :key="c.bookId">
                        <a href="javascript:;"  @mouseover='stopi(i)' @mouseout='starti'><img @click="jumpDal" :data-id="c.bookId" :class='{active:ac==i}' :src="`${baseUrl}${c.pic}`"/></a>
                    </li>
                </ul>             
                <div class="cNav">
                    <i @click='prev' class="iconfont prev">&#xe63f;</i>
                    <i @click='next' class="iconfont next">&#xe63e;</i>
                </div>
                <ul class="list-unstyled cIndicators">
                    <li v-for='(a,i) of 4' :key="i"><a :class='{active:p/4==i}' @click='change(i)'  href="javascpipt:;"></a></li>
                </ul> 
            </div>           
        </div>       
        <section>
            <!-- 1f出版图书-->
            <div class="publish">
                <h2>出版图书</h2>  
                <div class="top">
                    <ul>
                        <li v-for='(t,i) of pubTop' :key="i"><router-link to="/classify">{{t.label}}</router-link><b>|</b></li>
                        <li><router-link to="/classify">更多>></router-link></li>
                    </ul>
                </div>                
                <div class="content">
                    <ul class="list-unstyled">
                        <li v-for='(b,i) of pubBooks' :key="i">
                            <router-link :to='`/details/${b.bookId}`' class='book'>
                                <img :src="`${baseUrl}${b.pic}`"/>
                                <div class='intro'>{{b.intro}}</div>     
                                <div @mouseover='show' @mouseout='hide' class="intro-none"></div> 
                            </router-link>
                            <router-link :to='`/details/${b.bookId}`'>{{b.title}}</router-link>
                            <p>{{b.author}}</p>
                        </li>
                    </ul>
                </div>
                <div class="rank">
                    <a href="javascript:;" class="top">观品热销</a>
                    <ul class="list-unstyled">
                        <li v-for='(r,i) of bestRank' :class='{active:0==i}' @mouseenter='showRank' :key="i">
                            <span class="num">{{i+1}}</span>
                            <div class="book">
                                <router-link  :to='`/details/${r.bookId}`' ><img :src="`${baseUrl}${r.pic}`"></router-link>
                                <div>
                                    <router-link :to='`/details/${r.bookId}`'>{{r.title}}</router-link>
                                    <p>{{r.author}}</p>
                                    <div>
                                        <i class="iconfont eye">&#xe8c7;</i>
                                        <span>{{r.watch}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a @click='goCom' data-k='pubBest' href="javascript:;" class="foot">完整榜单>></a>
                </div>
            </div>
            <!-- 2f经典著作-->
            <div class="classics">
                <h2>经典著作</h2>
                <div class="top">
                    <ul>
                        <li v-for='(t,i) of pubTop' :key="i"><a href="javascript:;">{{t.label}}</a><b>|</b></li>
                        <li><a href="javascript:;">更多>></a></li>
                    </ul>
                </div>
                <div class="content">
                    <ul class="list-unstyled">
                        <li v-for='(b,i) of pubBooks' :key="i">
                            <router-link :to='`/details/${b.bookId}`' class='book'>
                                <img :src="`${baseUrl}${b.pic}`"/>
                                <div class='intro'>{{b.intro}}</div>     
                                <div @mouseover='show' @mouseout='hide' class="intro-none"></div>              
                            </router-link>
                            <router-link :to='`/details/${b.bookId}`'>{{b.title}}</router-link>
                            <p>{{b.author}}</p>
                        </li>
                    </ul>
                </div>
                <div class="rank">
                    <a href="javascript:;" class="top">观品热销</a>
                    <ul class="list-unstyled">
                        <li v-for='(r,i) of bestRank' :key="i" :class='{active:0==i}' @mouseenter='showRank'>
                            <span class="num">{{i+1}}</span>
                            <div class="book">
                                <router-link  :to='`/details/${r.bookId}`'><img :src="`${baseUrl}${r.pic}`"></router-link>
                                <div>
                                    <router-link  :to='`/details/${r.bookId}`'>{{r.title}}</router-link>
                                    <p>{{r.author}}</p>
                                    <div>
                                        <i class="iconfont eye">&#xe8c7;</i>
                                        <span>{{r.watch}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a href="javascript:;" @click='goCom' data-k='pubBest' class="foot">完整榜单>></a>
                </div>
            </div>
            <!-- 3f国外名著-->
            <div class="foreign">
                <h2>国外名著</h2>
                <div class="top">
                    <ul>
                        <li v-for='(t,i) of pubTop' :key="i"><a href="javascript:;">{{t.label}}</a><b>|</b></li>
                        <li><a href="javascript:;">更多>></a></li>
                    </ul>
                </div>
                <div class="content">
                    <ul class="list-unstyled">
                        <li v-for='(b,i) of pubBooks' :key="i">
                            <router-link :to='`/details/${b.bookId}`'  class='book'>
                                <img :src="`${baseUrl}${b.pic}`"/>
                                <div class="intro">{{b.intro}}</div>     
                                <div @mouseover='show' @mouseout='hide' class="intro-none"></div>              
                            </router-link>
                            <router-link :to='`/details/${b.bookId}`'>{{b.title}}</router-link>
                            <p>{{b.author}}</p>
                        </li>
                    </ul>
                </div>
                <div class="rank">
                    <a href="javascript:;" class="top">观品热销</a>
                    <ul class="list-unstyled">
                        <li v-for='(r,i) of bestRank' :key="i" :class='{active:0==i}' @mouseenter='showRank'>
                            <span class="num">{{i+1}}</span>
                            <div class="book">
                                <router-link :to='`/details/${r.bookId}`'><img :src="`${baseUrl}${r.pic}`"></router-link>
                                <div>
                                    <router-link  :to='`/details/${r.bookId}`'>{{r.title}}</router-link>
                                    <p>{{r.author}}</p>
                                    <div>
                                        <i class="iconfont eye">&#xe8c7;</i>
                                        <span>{{r.watch}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a href="javascript:;" @click='goCom' data-k='pubBest' class="foot">完整榜单>></a>
                </div>
            </div>            
        </section>
    </main>
</template>

<script>
    import {
        getCarousel,
        publishTop,
        publishBooks,
        publishBest
    } from '../api/index';
    export default {
        data() {
            return {
                baseUrl:process.env.VUE_APP_IMGURL,
                casels:[],
                p:0,
                n:3,
                ac:0,
                indexList:[],
                currentIndex:0,
                timer:null,
                pubTop:[],
                pubBooks:[],
                bestRank:[]
            }
        },
        created() {
            this.getData();
            clearInterval(this.timer);
            this.currentIndex=0;
            this.indexList=[];
            this.timer=null;
            this.acImg();
        },
        watch:{
            currentIndex(i){
                this.p=this.indexList[i][0];
                this.n=this.indexList[i][1];
                this.ac=this.p;   
                this.acImg();             
            }  
        },
        methods: {
            getData(){
                getCarousel().then(data=>{
                    console.log('getCarousel:',data);
                    if(data.data.code==1){
                        this.casels=data.data.output;
                        this.cutIntro(this.casels,160);
                        var i=0;
                        while(i<this.casels.length-1){
                            if(i+3<this.casels.length-1){
                                this.indexList.push([i,i+=3]);
                                i++;
                            }else{
                                this.indexList.push([i,i=this.casels.length-1]);
                            }
                        }
                    }
                });
                publishTop().then(data=>{
                    if(data.data.code==1){
                        this.pubTop=data.data.output;
                    }
                });
                publishBooks().then(data=>{
                    if(data.data.code==1){
                        this.pubBooks=data.data.output;
                        this.cutIntro(this.pubBooks,110);
                    }
                });
                publishBest().then(data=>{
                    if(data.data.code==1){
                        this.bestRank=data.data.output;
                        this.cutTit(this.bestRank,9);
                    }
                });
            },
            acImg(){
                if(this.timer==null){
                    this.timer=setInterval(()=>{
                        if(this.ac<this.n) this.ac++;
                        else this.ac=this.p;
                    },3000)
                }
            },    
            prev(){
                clearInterval(this.timer);
                this.timer=null;
                this.currentIndex--;
                if(this.currentIndex<0){
                    this.currentIndex=this.indexList.length-1;
                }
            },
            next(){
                clearInterval(this.timer);
                this.timer=null;
                this.currentIndex++;
                if(this.currentIndex>=this.indexList.length){
                    this.currentIndex=0;
                }
            },
            change(i){
                clearInterval(this.timer);
                this.timer=null;
                this.currentIndex=i;
            },
            stopc(){
                clearInterval(this.timer); 
            },
            startc(){
                this.timer=null;
                this.acImg();
            },
            stopi(i){
                clearInterval(this.timer);
                this.ac=i;
            },
            starti(){
                this.timer=null;
                this.acImg();
            },
            show(e){
                e.target.parentNode.className='book show';
            },
            hide(e){
                e.target.parentNode.className='book';
            },
            showRank(e){
                e.target.className='active';
                var lis=e.target.parentNode.childNodes;
                for(var l in lis){
                    if(lis[l]!=e.target&&lis[l].nodeName=='LI'){
                        lis[l].className='';
                        //console.log(lis[l].nodeName);
                    }
                }
            },
            jumpDal(e){
                var bid=e.target.dataset.id;
                this.$router.push("/details/"+bid);
            },
            goCom(e){
                var k=e.target.dataset.k;
                this.$router.push('/CompleteRank?kwords='+k);
            }
        },
    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 480px;
        padding-top: 40px;
        margin-top:20px; 
        position: relative;
    }
    .bg>.bg-img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    #c1{
        width: 1140px;
        margin: 0 auto;
        position: relative;
        z-index: 10;
    }
    #c1>div{
        padding: 30px 0px 0px 50px;
    }
    #c1>ul.showImg{
        width: 950px;
        margin-left: 135px;
        position:absolute;
        top:175px;
        left:0px;
        z-index: 20;         
    }
    #c1>ul.showImg>li{
        margin-right: 50px;
        width: 180px;
        display: none;
        float: left;
    }
    #c1>ul.showImg>li.show{
        display: block;
    }
    #c1>ul.showImg>li>a>img{
        width: 160px;
        transition: all 1s;
    }
    #c1>ul.showImg>li>a>img.active{
        border: 1px solid #0083ec;
        transform: scale(1.1);
    }
    #c1>article{
        width: 1140px;    
        margin: auto;
        text-align: center;
    }
    #c1>article>a{
        font-size: 36px;
        color: #fff;
    }
    #c1>article>a:hover{
        color: #0083ec;
    }
    #c1>article>p{
        color: #ddd;
        width: 960px;
        height: 72px;
        padding-left: 90px;
        overflow: hidden;
        margin-top: 20px;
    }
    #c1>div.cNav{
        width: 1140px;
        margin: 0 auto;
        /* margin-top: -130px; */
        padding: 0;
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 260px;left: 0px;   
    }
    #c1>div.cNav>.iconfont{
        font-size: 30px;
        color: #fff;
        cursor: pointer;
    }
    #c1>div.cNav>.iconfont:hover{
        color: #0083ec;
    }
    #c1>ul.cIndicators{
        display: flex;
        width: 1140px;
        margin: 0 auto;
        justify-content: center;
        position: absolute;
        top: 430px;left: 0px;
    }
    #c1>ul.cIndicators>li{
        width: 10px;
    }
    #c1>ul.cIndicators>li+li{
        margin-left: 10px;
    }
    #c1>ul.cIndicators>li>a{
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ddd;
    }
    #c1>ul.cIndicators>li>a.active{
        background: #0083ec;
    }
    section>div{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }
    section>div>h2{
        width: 100%;
        margin-bottom: 20px;
        font-size: 30px;
        font-weight: 400;
    }
    section>div>div.top{
        width: 1140px;
        margin-bottom: 20px;
    }
    section>div>div>ul>li>b{
        margin: 0 5px;
    }
    section>div>div.content{
        width: 840px;
        background: #fff;
    }
    section>div>div.content>ul{
        display: flex;
        flex-wrap: wrap;
        margin: 0;
    }
    section>div>div.content>ul>li{
        width: 278px;
        padding: 30px 0;
        border: 1px solid #f0f0f0;
    }
    section>div>div.content>ul>li>a:first-child{
        position: relative;
    }
    section>div>div.content>ul>li>a>div{
        position: absolute;
        width: 200px;
        height: 266px;
        top:-249px;left: 0px;
    }
    section>div>div.content>ul>li>a>div.intro{
        background: rgba(0, 0, 0, .7);
        box-sizing: border-box;
        padding: 15px;
        color: #ccc;
        overflow: hidden;
        opacity: 0;
        transform: rotateY(180deg);
        backface-visibility:hidden;
        transition: all 1s; 
    }
    section>div>div.content>ul>li>a.book.show>div.intro{
        overflow: hidden;
        opacity: 1;
        transform: rotateY(0deg);
    }
    section>div>div.content>ul>li>a+a{
        display:block;
        font-size:24px;
        margin: 10px 0;
    }
    section>div>div.content>ul>li>a.book>img{
        width: 200px;
        height: 266px;
        transform: rotateY(0deg);
        backface-visibility:hidden;
        opacity: 1;
        transition: all 1s; 
    }
    section>div>div.content>ul>li>a.book.show>img{
        transform: rotateY(180deg);
        opacity: 0;
    }
    section>div>div.rank{
        width: 300px;
        background: #fff;
        height: 810px;
        padding: 10px;
        border-top: 1px solid #f0f0f0;
        box-sizing: border-box;
    }
    section>div>div.rank>a.top{
        display: block;
        width: 90px;
        font-size: 22px;
        font-weight: 400;
        text-align: left;
        padding-left: 0.5rem;
        margin-bottom: 20px;
    }
    section>div>div.rank>ul{
        margin-top: 1rem;
        margin-bottom: 0;
        text-align: left;
    }
    section>div>div.rank>ul>li{
        display: flex;
        margin-bottom: 20px;
    }
    section>div>div.rank>ul>li>span.num{
        color: #888;
        width: 20px;
        font-size: 18px;
        margin-right: 0.5rem;
        margin-bottom: 15px;
        text-align:center;
    }
    section>div>div.rank>ul>li>div.book{
        width: 100%;
        border-bottom: 1px dashed #ddd;
    }
    section>div>div.rank>ul>li>div.book>a>img{
        display: none;
    }
    section>div>div.rank>ul>li>div.book>div{
        display: flex;
    }
    section>div>div.rank>ul>li>div.book>div>a{
        display: block;
        width: 180px;
        font-size: 17px;
    }
    section>div>div.rank>ul>li>div.book>div>div{
        position: relative;
    }
    section>div>div.rank>ul>li>div.book>div>div>.eye{
        position: relative;
        top:3px;left: 0px;
    }
    section>div>div.rank>ul>li>div.book>div>div>span{
        color: #888;
        font-size: 13px;
    }
    section>div>div.rank>ul>li.active{
        margin-bottom: 10px;
    }
    section>div>div.rank>ul>li.active>span{
        display: block;
        width: 17px;
        height: 20px;
    }
    section>div>div.rank>ul>li.active>div.book{
        display: flex;
        width: 255px;
    }
    section>div>div.rank>ul>li.active>div.book>a{
        margin-bottom: 10px;
    }
    section>div>div.rank>ul>li.active>div.book>a>img{
        display:block !important;
        width: 80px;
        border: 1px solid #0083ec;
    }
    section>div>div.rank>ul>li.active>div.book>div{
        flex-direction: column;
        width: 180px;
        padding:8px 0 0 8px;
        margin-bottom: 20px;
    }
    section>div>div.rank>ul>li.active>div.book>div>a{
        width: 170px;
        margin-bottom: 10px;
        color: #000;
    }
    section>div>div.rank>ul>li>div.book>div>p{
        display: none;
    }
    section>div>div.rank>ul>li.active>div.book>div>p{
        display: block !important;
        margin-bottom: 10px;
        font-size: 13px;
    }
    section>div>div.rank>ul>li.active>div.book>div>div>img{
        margin: 0; 
    }
    section>div>div.rank>a.foot{
        font-size: 16px;
        margin-right: 0px; 
    }
    section>div>div.top{
        text-align: center;
    }
    section>div>div.top>ul{
        list-style: none;
        display: flex;
        justify-content: center;
    }
</style>