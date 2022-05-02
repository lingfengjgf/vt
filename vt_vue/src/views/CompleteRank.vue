<template>
    <section>
        <h3>全部排行榜</h3>
        <div class="content">
            <div class="top">
                <div class="publish">
                    <p>出版图书</p>
                    <div>
                        <a @click='change' data-k='pubRecom' href="javascript:;" :class="{show:kwords=='pubRecom'}">推荐榜</a>
                        <b>|</b>
                        <a @click='change' data-k='pubBest' :class="{show:kwords=='pubBest'}" href="javascript:;">畅销榜</a>
                        <b>|</b>
                        <a @click='change' data-k='pubNew'  :class="{show:kwords=='pubNew'}" href="javascript:;">新书榜</a>
                    </div>
                </div>
                <div class="classics">
                    <p>经典著作</p>
                    <div>
                        <a @click='change' data-k='claRecom' :class="{show:kwords=='claRecom'}" href="javascript:;">推荐榜</a>
                        <b>|</b>
                        <a @click='change' data-k='claBest' :class="{show:kwords=='claBest'}" href="javascript:;">畅销榜</a>
                        <b>|</b>
                        <a @click='change' data-k='claNew' :class="{show:kwords=='claNew'}" href="javascript:;">新书榜</a>
                    </div>
                </div>
                <div class="foreign">
                    <p>国外名著</p>
                    <div>
                        <a @click='change' data-k='forRecom'  :class="{show:kwords=='forRecom'}"href="javascript:;">推荐榜</a>
                        <b>|</b>
                        <a @click='change' data-k='forBest' :class="{show:kwords=='forBest'}" href="javascript:;">畅销榜</a>
                        <b>|</b>
                        <a @click='change' data-k='forNew' :class="{show:kwords=='forNew'}" href="javascript:;">新书榜</a>
                    </div>
                </div>
            </div>
            <ul class="list-unstyled">
                <li>
                    <p class="num">排名</p>
                    <p class="name">书名</p>
                    <p class="author">作者</p>
                    <p class="classify">分类</p>
                    <p class="read">读过</p>
                </li>
                <li v-for='(b,i) of books'>
                    <router-link :to='`/details/${b.bookId}`'>
                        <p class="num">{{i+1}}</p>
                        <p class="name">{{b.title}}</p>
                        <p class="author">{{b.author}}</p>
                        <p class="classify">{{b.label}}</p>
                        <p class="read">{{b.watch}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import {getRankInfo} from '../api/rank'
export default {
    data() {
        return {
            books:[],
            allBooks:{},
            kwords:this.$route.query.k
        }
    },
    created() {
        this.loagPage();
        this.loadBackTop();
    },
    methods: {
        loagPage(){
            getRankInfo().then(res=>{
                this.spLabel(res.data.recommend,1);
                this.spLabel(res.data.best,1);
                this.spLabel(res.data.new,1);
                this.allBooks=res.data;
                //console.log(this.allBooks);
                this.loadBooks();
            })
        },
        loadBooks(){
            if(this.kwords=='pubRecom'){
                this.books=this.allBooks.recommend;
            }else if(this.kwords=='pubBest')
                this.books=this.allBooks.best;
            else if(this.kwords=='pubNew')
                this.books=this.allBooks.new;
            else
                this.books=this.allBooks.best;            
        },
        change(e){
            var k=e.target.dataset.k;
            this.kwords=k;
            this.loadBooks();
        }
    },
}
</script>

<style scoped>
    section>h3{
        font-size: 28px;
        font-weight: normal;
    }
    section>div.content{
        background: #fff;
        margin-top: 30px;
        padding: 30px;
    }
    div.content>div.top{
        display: flex;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 30px;    
    }
    div.content>div.top>div{
        width: 380px;
    }
    div.content>div.top>div>p{
        font-size: 20px;
        margin-bottom: 10px;
    }
    div.content>div.top>div.publish>p{
        color: rgb(248, 88, 88);
    }
    div.content>div.top>div.classics>p{
        color: #fa33fa;
    }
    div.content>div.top>div.foreign>p{
        color: #33fa33;
    }
    div.content>div.top>div>div>b{
        margin: 0 1rem;
    }
    div.content>div.top>div>div>a.show{
        color: #0083ec;
    }
    div.content>ul{
        margin-top: 30px;
    }
    div.content>ul>li{
        display: flex;
        padding: 0 10px;
        height: 40px;
    }
    div.content>ul>li~li:hover{
        background: #0083ec;
    }
    div.content>ul>li~li:hover p{
        color: #fff;
    }
    div.content>ul>li:first-child{
        background: #f0f0f0;
    }
    div.content>ul>li>a{
        display: flex;
    }
    div.content>ul>li p{
        display: block;
        height: 100%;
        margin: 0;
        font-size: 16px;
        line-height: 40px;
        text-align: left;
    }
    div.content>ul>li p.num,div.content>ul>li p.read{
        width: 50px;
    }
    div.content>ul>li p.read{
        text-align: right;
    }
    div.content>ul>li p.name{
        width: 480px;
    }
    div.content>ul>li p.author,div.content>ul>li p.classify{
        width: 240px;
    }
</style>