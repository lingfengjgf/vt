<template>
    <div id='main'>
        <section>
                <!--1f出版图书-->
                <h3>出版图书</h3>
                <p>—— 排行榜 ——</p>
                <div class="content">
                    <div class="recommend">
                        <a href="javascript:;" class="top">编辑推荐</a>
                        <ul class="list-unstyled">
                            <li v-for='(r,i) of recommend' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${r.bookId}`'><img class="d-none" :src="`${baseUrl}${r.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${r.bookId}`'>{{r.title}}</router-link>
                                        <p class="d-none">{{r.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{r.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{r.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a @click='goCom' data-k='pubRecom' href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                    <div class="best">
                        <a href="javascript:;" class="top">观品热销</a>
                        <ul class="list-unstyled">
                            <li v-for='(b,i) of best' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${b.bookId}`'><img class="d-none" :src="`${baseUrl}${b.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${b.bookId}`'>{{b.title}}</router-link>
                                        <p class="d-none">{{b.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{b.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{b.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a @click='goCom' data-k='pubBest' href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                    <div class="new">
                        <a href="javascript:;" class="top">新书上榜</a>
                        <ul class="list-unstyled">
                            <li v-for='(n,i) of news' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${n.bookId}`'><img class="d-none" :src="`${baseUrl}${n.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${n.bookId}`'>{{n.title}}</router-link>
                                        <p class="d-none">{{n.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{n.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{n.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a @click='goCom' data-k='pubNew' href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                </div>               
        </section> 
        <section>
                <!--2f经典著作-->
                <h3>经典著作</h3>
                <p>—— 排行榜 ——</p>
                <div class="content">
                    <div class="recommend">
                        <a href="javascript:;" class="top">编辑推荐</a>
                        <ul class="list-unstyled">
                            <li v-for='(r,i) of recommend' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${r.bookId}`'><img class="d-none" :src="`${baseUrl}${r.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${r.bookId}`'>{{r.title}}</router-link>
                                        <p class="d-none">{{r.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{r.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{r.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                    <div class="best">
                        <a href="javascript:;" class="top">观品热销</a>
                        <ul class="list-unstyled">
                            <li v-for='(b,i) of best' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${b.bookId}`'><img class="d-none" :src="`${baseUrl}${b.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${b.bookId}`'>{{b.title}}</router-link>
                                        <p class="d-none">{{b.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{b.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{b.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                    <div class="new">
                        <a href="javascript:;" class="top">新书上榜</a>
                        <ul class="list-unstyled">
                            <li v-for='(n,i) of news' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${n.bookId}`'><img class="d-none" :src="`${baseUrl}${n.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${n.bookId}`'>{{n.title}}</router-link>
                                        <p class="d-none">{{n.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{n.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{n.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                </div>              
        </section> 
        <section>
                <!--3f国外名著-->
                <h3>国外名著</h3>
                <p>—— 排行榜 ——</p>
                <div class="content">
                    <div class="recommend">
                        <a href="javascript:;" class="top">编辑推荐</a>
                        <ul class="list-unstyled">
                            <li v-for='(r,i) of recommend' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${r.bookId}`'><img class="d-none" :src="`${baseUrl}${r.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${r.bookId}`'>{{r.title}}</router-link>
                                        <p class="d-none">{{r.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{r.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{r.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                    <div class="best">
                        <a href="javascript:;" class="top">观品热销</a>
                        <ul class="list-unstyled">
                            <li v-for='(b,i) of best' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${b.bookId}`'><img class="d-none" :src="`${baseUrl}${b.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${b.bookId}`'>{{b.title}}</router-link>
                                        <p class="d-none">{{b.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{b.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{b.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                    <div class="new">
                        <a href="javascript:;" class="top">新书上榜</a>
                        <ul class="list-unstyled">
                            <li v-for='(n,i) of news' @mouseenter='showRank' :class='{active:0==i}' :key="i">
                                <span class="num">{{i+1}}</span>
                                <div class="book">
                                    <router-link :to='`/details/${n.bookId}`'><img class="d-none" :src="`${baseUrl}${n.pic}`"></router-link>
                                    <div>
                                        <router-link :to='`/details/${n.bookId}`'>{{n.title}}</router-link>
                                        <p class="d-none">{{n.author}}</p>
                                        <div class="content-ul-watch">
                                            <i class="iconfont eye">&#xe8c7;</i>
                                            <span>{{n.watch}}</span>
                                        </div>
                                        <p class="intro d-none">{{n.intro}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <a href="javascript:;" class="foot">完整榜单>></a>
                    </div>
                </div> 
        </section>
    </div>
</template>

<script>
import {getRankInfo} from '../api/rank'
export default {
    data() {
        return {
            baseUrl:process.env.VUE_APP_IMGURL,
            recommend:[],
            best:[],
            news:[]
        }
    },
    created(){
        this.loadPage();
    },
    methods:{
        loadPage(){
            getRankInfo().then(res=>{
                if(res.data.code=1){
                    this.recommend=res.data.output.recommend;
                    this.cutIntro(this.recommend,41);
                    this.cutTit(this.recommend,11);
                    if(this.recommend.length>10)
                        this.recommend=this.recommend.slice(0,10);
                    this.best=res.data.output.best;
                    this.cutIntro(this.best,41);
                    this.cutTit(this.best,11);
                    if(this.best.length>10)
                        this.best=this.best.slice(0,10);
                    this.news=res.data.output.new;
                    this.cutIntro(this.news,41);
                    this.cutTit(this.news,11);
                    if(this.news.length>10)
                        this.news=this.news.slice(0,10);
                }
                    //console.log(this.recommend);
            })
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
        goCom(e){
            var k=e.target.dataset.k;
            this.$router.push('/CompleteRank?k='+k);
        }
    }
}
</script>

<style scoped>
    .d-none{
        display: none;
    }
    section{
        margin-bottom:50px;
    }
    section>h3{
        font-size: 26px;
        font-weight: normal;
        margin-top: 30px;
    }
    section>p{
        font-size: 14px;
        margin: 10px 0;
    }
    div.content{
        width: 100%;
        background: #fff;
        display: flex;
    }
    div.content>div{
        width: 380px;
        height: 100%;
        padding: 2rem;
        border: 1px solid #f0f0f0;
        border-bottom-color: transparent;
    }
    div.content>div>a.top{
        display: block;
        width: 90px;
        font-size: 18px;
        font-weight: 400;
        text-align: left;
        padding-left: 0.5rem;
    }
    div.content>div.recommend>a.top{
        border-left: 5px solid rgb(248, 88, 88);
    }
    div.content>div.best>a.top{
        border-left: 5px solid #0083ec;
    }
    div.content>div.new>a.top{
        border-left: 5px solid #fafa00;
    }
    div.content>div>ul{
        margin-top: 1rem;
        margin-bottom: 0;
        text-align: left;
    }
    div.content>div>ul>li{
        display: flex;
        padding-top: 10px;
    }
    div.content>div>ul>li>span.num{
        color: #888;
        font-size: 14px;
        margin-right: 0.5rem;
        display:block;
        width:15px;
        left:20px;
        text-align: center;
    }
    div.content>div>ul>li>div.book{
        width: 290px;
        padding-bottom: 10px;
        border-bottom: 1px dashed #ddd;
    }
    div.content>div>ul>li>div.book>div{
        display: flex;
    }
    div.content>div>ul>li>div.book>div>a{
        display: block;
        width: 190px;
    }
    div.content>div>ul>li>div.book>div>div{
        position: relative;
        margin-left:20px;
    }
    div.content>div>ul>li>div.book>div>div>img{
        width: 25px;
        position: relative;
        top: 3px;
        left: 0px;
    }
    div.content>div>ul>li>div.book>div>div>span{
        color: #888;
        font-size: 13px;
    }
    div.content>div>ul>li.active>div.book{
        display: flex;
    }
    div.content>div>ul>li.active>div.book>a>img{
        display:block !important;
        width: 100px;
    }
    div.content>div>ul>li.active>div.book>div{
        flex-direction: column;
        width: 190px;
        margin-left: 0.5rem;
    }
    div.content>div>ul>li.active>div.book>div>div{
        margin-left:0px;
    }
    div.content>div>ul>li.active>div.book>div>a{
        width: 190px;
    }
    div.content>div>ul>li.active>div.book>div>p{
        display: block !important;
        margin: 5px 0;
        font-size: 13px;
    }
    div.content>div>ul>li.active>div.book>div>p.intro{
        height: 50px;
        width:190px;
        overflow: hidden;
        margin-top: 12px;
        margin-bottom: 8px;
    }
    div.content>div>ul>li.active>div.book>div>div>img{
        margin: 0;
    }
    div.content>div>a.foot{
        font-size: 13px;
        margin-right: 0px; 
    }    
</style>